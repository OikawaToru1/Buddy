import {Router} from "express";
import { handleQuery } from "../controllers/fileController.js";

const userQueryRouter = Router();

userQueryRouter.post("/query", (req, res) => {
  const { query } = req.body;
  console.log("Received user query:", query);
  // Here you would typically process the query and generate a response
  const response = `You asked: ${query}`;
  res.json({ response });
});

export default userQueryRouter;