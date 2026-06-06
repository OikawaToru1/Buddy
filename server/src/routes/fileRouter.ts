import { Router } from "express";
import {getFileByName, uploadFile, handleQuery} from '../controllers/fileController.js'
import {upload} from '../middlewares/multer.js'
import { verifyJWT } from "../middlewares/auth.js";
import { User } from "../models/users.model.js";
import {File} from "../models/files.models.js";

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

fileRouter.post("/generate-summary", verifyJWT, async(req, res) => {
  const {fileName} = req.body;
  console.log("Generating summary for file: ", fileName);
  // Implement the logic to generate summary for the given file
  res.json({message: `Summary generated for file ${fileName}`});
});

fileRouter.post("/explain-like-im-5", verifyJWT, async(req, res) => {
  const {fileName} = req.body;
  console.log("Generating explanation for file: ", fileName);
  // Implement the logic to generate explanation for the given file
  res.json({message: `Explanation generated for file ${fileName}`});
});

fileRouter.post("/create-quiz", verifyJWT, async(req, res) => {
  const {fileName} = req.body;
  console.log("Creating quiz for file: ", fileName);
  // Implement the logic to create quiz for the given file
  res.json({message: `Quiz created for file ${fileName}`});
});



export default fileRouter;