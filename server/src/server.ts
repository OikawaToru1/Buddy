import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import {upload} from './middlewares/multer.js'
import cors from 'cors'
import fileRouter from './routes/fileRouter.js'
import authRouter from './routes/authRouter.js'
import conntectMongoDB from './db/db.js'
import cookieParser from 'cookie-parser'
dotenv.config({
  path : './.env'
})

const app = express();
const port = process.env.PORT || 3000;



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/files', fileRouter);
app.use('/api/users', authRouter);


conntectMongoDB();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})