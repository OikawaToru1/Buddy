import { Router } from "express";
import {getFileByName, uploadFile, handleQuery} from '../controllers/fileController.js'
import {upload} from '../middlewares/multer.js'
import { verifyJWT } from "../middlewares/auth.js";

const fileRouter = Router();

fileRouter.get('/',verifyJWT, (req: any, res: any) => {
  const user = req.user;
  const fileHistory = user.fileHistory || [];
  console.log("User's file history is ", fileHistory);

  res.json({ message: 'List of files uploaded previously', files: fileHistory });
});

fileRouter.get('/file/:fileName', getFileByName);

fileRouter.post("/",verifyJWT,upload.single('file'),uploadFile);

fileRouter.post("/query", verifyJWT, handleQuery);



export default fileRouter;