import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import {upload} from './middlewares/multer.js'
import cors from 'cors'
import fileRouter from './routes/fileRouter.js'
import conntectMongoDB from './db/db.js'
dotenv.config({
  path : './env'
})

const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/files', fileRouter);



conntectMongoDB();

// app.post('/api/files',upload.single('file'), (req, res) => {
//   console.log('Received file upload request');
//   console.log(req.file);
  
//   res.json({ message: 'File uploaded successfully', file: req.file });
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})