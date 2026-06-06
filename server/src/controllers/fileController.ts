import 'dotenv/config';
import {upload} from '../middlewares/multer.js';
import { uploadToCloudinary } from '../utils/Cloudinary.js';
import LlamaCloud from '@llamaindex/llama-cloud';
import { PDFParse } from 'pdf-parse';
import { Environment, GoogleGenAI } from '@google/genai';
import { Pinecone, type PineconeRecord, type RecordMetadata } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import Groq from 'groq-sdk';
import { response } from 'express';
import {File} from '../models/files.models.js'
import { User } from '../models/users.model.js';
import {classifyIntent} from '../utils/IntentClassifier.js';

interface BuddyMetadata extends RecordMetadata {
    document_id : string;
    chunk_number : number;
    chunk_text : string;
    document_type : string;
    created_at : string;
}


const groq = new Groq({apiKey : process.env.GROQ_API_KEY || ""});
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});



// Checking if pinecone index instance exists or not.
const pineconeIndex = await pc.index("buddy-index");
if (pineconeIndex) {
  console.log("Pinecone index instance exists");
} else {
  try {
    const createIndex = await pc.createIndex({
      name: "buddy-index",
      vectorType: "dense",
      dimension: 1024,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
      deletionProtection: "disabled",
      tags: { environment: "development" },
    });

    console.log("Pinecone index created and ready to use", createIndex);
  } catch (error) {
    console.log("Error in creating Pinecone index", error);
  }
}

const denseSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
})


const ai = new GoogleGenAI({});

const client = new LlamaCloud();

async function getFileByName(req : any, res : any){
    const {fileName} = req.params;

    // Logic to retrieve the file based on the fileName
    // From the db or fs
    res.json({message: `File with name ${fileName} retrieved successfully`});
}

async function parsePDF(filePath : string){
    try {
        const parser = new PDFParse({url : filePath});
        const result = await parser.getText();

        // const response = await ai.models.embedContent({
        //     model : "gemini-embedding-2",
        //     contents : [result.text],
        //     config : {outputDimensionality : 1536},
        // })

        // console.log("Embeddings for the PDF content", response.embeddings);

        return result.text;
    } catch (error) {
        console.log("Error in parsing PDF file", error);
        return null;
    }
}

async function uploadFile(req : any, res : any){
  console.log(req)
  const user = req.user;

    try {
        const fileName = req.file.originalname;
        const uploadResponse = await uploadToCloudinary(req.file.path);
        console.log(uploadResponse?.secure_url);
        if(!uploadResponse?.secure_url) {
            res.status(500).json({success: false, message: "Failed to upload file to cloudinary"});
            return;
        }
        const fileResponse = await fetch(uploadResponse.secure_url);
        if(!fileResponse.ok) {
            res.status(500).json({success: false, message: "Failed to fetch the uploaded file from cloudinary"});
            return;
        }

        const parsedContent = await parsePDF(uploadResponse.secure_url);
        if(!parsedContent) {
            res.status(500).json({success: false, message: "Failed to parse the uploaded PDF file"});
            return;
        }

        const chunks = await denseSplitter.splitText(parsedContent);
        // console.log("Parsed content of the PDF file", parsedContent);
        // console.log("Split chunks", chunks);

         const response = await ai.models.embedContent({
           model: "gemini-embedding-2",
           contents: {
            parts : chunks.map(text=> ({text}))
          },
           config: { outputDimensionality: 1024 },
         });

         console.log("Response of individual chunking embeeding is. as below ", response.embeddings)


         const upsertResponse = await upsertToPinecone(response.embeddings || [], chunks, `${fileName}_${Date.now()}`, user._id);

         const fileRecord = await File.create({
            fileId : `${fileName}_${Date.now()}`,
            fileName,
            path : uploadResponse.secure_url,
            owner : user._id, 
         });

        await User.findByIdAndUpdate(user._id, {
          $push: { fileHistory: fileRecord._id },
        });

        const userWithFiles = await User.findById(user._id).populate("fileHistory").select("-password -refreshToken");
        console.log("File record created in the database and populated in user ", fileRecord, userWithFiles);

        res.json({message: "done", data: userWithFiles});
          

        
        
         

        // const file = await client.files.create({
        //     file : fileResponse.body as any,
        //     purpose : "parse",
        // });

        // const parseResult = await client.parsing.parse({
        //     file_id : file.id,
        //     tier : "cost_effective",
        //     version : "latest",
        //     expand : ["markdown"],

        // });
        // console.log("Parsed markdown content of the first page", parseResult.markdown?.pages[0] );

        // res.json({success: true, message: "File uploaded successfully", url: uploadResponse?.secure_url});
        
    } catch (error) {
        console.log("Error has occured", error)
    }
   
}


async function upsertToPinecone(embeddings : any[], chunks : string[], documentId : string, userId : string){
  if(!embeddings || embeddings.length === 0) return null;

  const records  : PineconeRecord<BuddyMetadata>[] = embeddings.map((emb, i) => ({
    id: `Buddy_doc_${Date.now()}#chunk${i}`,
    values: emb.values,
    metadata: {
      document_id : documentId,
      chunk_number : i+1,
      chunk_text : chunks[i] || "",
      document_type : "pdf_upload",
      created_at : new Date().toISOString().split("T")[0] || "",
    }
  }));
  
  console.log("New pinecone records sample to upsert are below", records);

  try {
    const namespace = pc.index("buddy-index").namespace(`buddy-namespace-${userId}`);
    const upsertResponse = await namespace.upsert({
      records,
    });
   
    return upsertResponse;

  } catch (error) {
    console.log("Error in upserting records to pinecone", error);
    return null;
  }
}

async function handleQuery(req : any, res : any){
  const {query : userQuery} = req.body;
  const {fileName, fileId, path} = req.body;
  const queryWithContext = userQuery.concat(`\n\n---\n\n Use the ${fileName} \n  FileId ${fileId} `);
  console.log("Received user query: ", queryWithContext);

  const intent = classifyIntent(userQuery);
  console.log("Classified intent: ", intent);

  if(intent === "Document_Summary") {
    const summaryQuery = `Summarize the content of the document ${fileName} with fileId ${fileId} in a concise manner.`
    const parsedContent = await parsePDF(path);
    if (!parsedContent) {
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to parse the uploaded PDF file",
        });
      return;
    }

    const chunks = await denseSplitter.splitText(parsedContent);

    try {
      const queryResponse = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: ` You are a helpful assistant called Buddy , you have to summarize the content of the document uploaded by the user based on the user query. Use only the information from the retrieved relevant chunks to answer the question. If you don't know the answer, say you don't know and don't try to make up an answer.
           Despite any format the query or context is provided in, make sure you deliver it in a good format with proper punctuation and structure. Always try to use all the relevant information from the retrieved chunks to answer the question in a concise manner.
           
           ---
           Context for creating summary is in form of Chunks below :
           ${chunks.map((match) => match).join("\n\n")}
           ----
           `,
          },
          {
            role: "user",
            content: summaryQuery,
          },
        ],
        model: "openai/gpt-oss-20b",
      });

      console.log(
        "Response from groq for the query is ",
        queryResponse.choices[0]?.message,
      );
      res.json({
        message: "Success ",
        query: userQuery,
        response: queryResponse.choices[0]?.message.content || "",
      });
    } catch (error) {
      console.log("Error in handling user query", error);
      res
        .status(500)
        .json({ success: false, message: "Error in handling user query" });
    }

  } else if(intent === "IntentToQuery") {

    const queryEmbedding = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: userQuery,
      config: { outputDimensionality: 1024 },
    });

    const namespace = pc
      .index("buddy-index")
      .namespace(`buddy-namespace-${req.user._id}`);

    if (!queryEmbedding.embeddings || queryEmbedding.embeddings.length === 0) {
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to generate embedding for the user query",
        });
      return;
    }
    const result = await namespace.query({
      vector: queryEmbedding.embeddings[0]?.values || [],
      topK: 3,
      filter: {
        document_id: fileId,
      },
      includeMetadata: true,
    });

    try {
      const queryResponse = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: ` You are a helpful assistant called Buddy for answering questions related to the documents uploaded by the user. Use only the information from the retrieved relevant chunks to answer the question. If you don't know the answer, say you don't know and don't try to make up an answer. If the query is normal conversation without any relation to the uploaded documents, answer in a helpful and concise manner.
           Despite any format the query or context is provided in, make sure you deliver it in a good format with proper punctuation and structure. Always try to use all the relevant information from the retrieved chunks to answer the question in a concise manner. If the query is conversational and not related to the documents, answer it in a helpful and concise manner.
           
           ---
           Context from the relevant chunks retrieved from the vector database is below:
           ${result.matches.map((match) => match.metadata?.chunk_text).join("\n\n")}
           ----
           `,
          },
          {
            role: "user",
            content: userQuery,
          },
        ],
        model: "openai/gpt-oss-20b",
      });

      console.log(
        "Response from groq for the query is ",
        queryResponse.choices[0]?.message,
      );
      res.json({
        message: "Success ",
        query: userQuery,
        response: queryResponse.choices[0]?.message.content || "",
      });
    } catch (error) {
      console.log("Error in handling user query", error);
      res
        .status(500)
        .json({ success: false, message: "Error in handling user query" });
    }
    

  } else {

    try {
      const queryResponse = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: ` You are a helpful assistant called Buddy , the user wants to talk in general irrespective of any document context. Answer the question in a helpful and concise manner. If the query is conversational and not related to the documents, answer it in a helpful and concise manner.
           
           ---
           ----
           `,
          },
          {
            role: "user",
            content: userQuery,
          },
        ],
        model: "openai/gpt-oss-20b",
      });

      console.log(
        "Response from groq for the query is ",
        queryResponse.choices[0]?.message,
      );
      res.json({
        message: "Success ",
        query: userQuery,
        response: queryResponse.choices[0]?.message.content || "",
      });
    } catch (error) {
      console.log("Error in handling user query", error);
      res
        .status(500)
        .json({ success: false, message: "Error in handling user query" });
    }
    
  }

  
}



export {getFileByName, uploadFile, handleQuery}
