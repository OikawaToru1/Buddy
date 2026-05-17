import { Router } from "express";
import {getFileByName, uploadFile, handleQuery} from '../controllers/fileController.js'
import {upload} from '../middlewares/multer.js'

const fileRouter = Router();

fileRouter.get('/', (req, res) => {
  console.log('Received request for file list');
  res.json({ message: 'List of files uploaded previously' });
});

fileRouter.get('/file/:fileName', getFileByName);

fileRouter.post("/",upload.single('file'),uploadFile);

fileRouter.post("/query", handleQuery);



export default fileRouter;