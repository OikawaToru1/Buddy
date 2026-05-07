import { Router } from "express";
import {getFileByName, uploadFile} from '../controllers/fileController.js'
import {upload} from '../middlewares/multer.js'

const fileRouter = Router();

fileRouter.get('/', (req, res) => {
  console.log('Received request for file list');
  res.send('File list');
})

fileRouter.get('/file/:fileName', getFileByName);

fileRouter.post("/",upload.single('file'),uploadFile);



export default fileRouter;