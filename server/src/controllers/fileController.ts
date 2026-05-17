import 'dotenv/config';
import {upload} from '../middlewares/multer.js';
import { uploadToCloudinary } from '../utils/Cloudinary.js';
import LlamaCloud from '@llamaindex/llama-cloud';
import { PDFParse } from 'pdf-parse';
import { Environment, GoogleGenAI } from '@google/genai';
import { Pinecone, type PineconeRecord, type RecordMetadata } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

interface BuddyMetadata extends RecordMetadata {
    document_id : string;
    chunk_number : number;
    chunk_text : string;
    document_type : string;
    created_at : string;
}



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
    console.log('Received file upload request');
    console.log(req.file);
    // res.json({ message: 'File uploaded successfully', file: req.file });
    try {
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


         const upsertResponse = await upsertToPinecone(response.embeddings || [], chunks, `doc_${Date.now()}`, "user_123");
          console.log("Pinecone upsert response is ", upsertResponse);


        
         

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
    const namespace = pc.index("buddy-index").namespace("buddy-namespace");
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
  const {query} = req.body;
  const queryEmbedding = await ai.models.embedContent({
           model: "gemini-embedding-2",
           contents: query,
           config: { outputDimensionality: 1024 },
         });
  console.log("Received query: ", query);
  console.log("Received embedding: ", queryEmbedding.embeddings);
  res.json({message: "Query received successfully"});
}



export {getFileByName, uploadFile, handleQuery}
