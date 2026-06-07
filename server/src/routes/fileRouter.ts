import { Router } from "express";
import {getFileByName, uploadFile, handleQuery} from '../controllers/fileController.js'
import {upload} from '../middlewares/multer.js'
import { verifyJWT } from "../middlewares/auth.js";
import { User } from "../models/users.model.js";
import {File} from "../models/files.models.js";
import { generateSummary, explainLikeIm5, createQuiz } from "../controllers/queryController.js";

const fileRouter = Router();

fileRouter.get('/',verifyJWT, async(req: any, res: any) => {
  const user = req.user;
  const fileHistory = await File.find({_id : {$in : user.fileHistory}});
  console.log("User's file history is ", fileHistory);
  const userWithFiles = await User.findById(user._id).populate("fileHistory").select("-password -refreshToken");

  res.json({ message: 'List of files uploaded previously', fileHistory: fileHistory || [] });
});

fileRouter.get('/file/:fileName', getFileByName);

fileRouter.post("/",verifyJWT,upload.single('file'),uploadFile);

fileRouter.post("/query", verifyJWT, handleQuery);

fileRouter.post("/generate-summary", verifyJWT, generateSummary);


fileRouter.post("/explain-like-im-5", verifyJWT, explainLikeIm5);

fileRouter.post("/create-quiz", verifyJWT, createQuiz);

  



export default fileRouter;