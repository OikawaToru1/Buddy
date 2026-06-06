import "dotenv/config";
import { upload } from "../middlewares/multer.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
import LlamaCloud from "@llamaindex/llama-cloud";
import { PDFParse } from "pdf-parse";
import { Environment, GoogleGenAI } from "@google/genai";
import {
  Pinecone,
  type PineconeRecord,
  type RecordMetadata,
} from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import Groq from "groq-sdk";
import { response } from "express";
import { File } from "../models/files.models.js";
import { User } from "../models/users.model.js";

const groq = new Groq({apiKey : process.env.GROQ_API_KEY || ""});
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

const ai = new GoogleGenAI({});


async function handleQuery(req: any, res: any) {
  const { query: userQuery } = req.body;
  const queryEmbedding = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: userQuery,
    config: { outputDimensionality: 1024 },
  });
  console.log("Received query: ", userQuery);
  console.log("Received embedding: ", queryEmbedding.embeddings);
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
}


async function generateSummary(req: any, res: any){
    const {fileName} = req.body;
   
    const queryEmbedding = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: `Generate a concise summary for the content of the file named ${fileName}`,
      config: { outputDimensionality: 1024 },
    });
    

    res.json({message : "Summary generated successfully for file " + fileName});
}

async function explainLikeIm5(req: any, res: any){
  const {fileName} = req.body;
  // Logic to generate explanation like I'm 5 for the file with name fileName
  res.json({message : "Explanation generated successfully for file " + fileName});
}

async function createQuiz(req: any, res: any){
  const {fileName} = req.body;
  // Logic to create quiz for the file with name fileName
  res.json({message : "Quiz created successfully for file " + fileName});   
}