import dotenv from 'dotenv'
dotenv.config({
  path: "./.env",
});
import mongoose from 'mongoose'
import express from 'express'
import {upload} from './middlewares/multer.js'
import cors from 'cors'
import fileRouter from './routes/fileRouter.js'
import authRouter from './routes/authRouter.js'
import conntectMongoDB from './db/db.js'
import cookieParser from 'cookie-parser'


const app = express();
const port = 3000;



app.use(
  cors({
    origin: "https://buddy-oikawa.vercel.app/",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/files', fileRouter);
app.use('/api/users', authRouter);


conntectMongoDB();


app.listen(3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})