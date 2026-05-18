import mongoose from 'mongoose'
import express from 'express'
import {upload} from './middlewares/multer.js'
import cors from 'cors'
import fileRouter from './routes/fileRouter.js'

const app = express();
const port = 3000;

// ;(async()=>{
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}`);
//   } catch (error) {
//     console.log("Error", error );
//     throw error;
//   }
// })()

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/files', fileRouter);




// app.post('/api/files',upload.single('file'), (req, res) => {
//   console.log('Received file upload request');
//   console.log(req.file);
  
//   res.json({ message: 'File uploaded successfully', file: req.file });
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})