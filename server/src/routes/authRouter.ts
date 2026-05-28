import { Router } from "express";
import {registerUser, loginUser} from "../controllers/authController.js";

import {upload} from '../middlewares/multer.js'

const authRouter = Router();

authRouter.get('/', (req, res) => {
  console.log('Received request for auth route');
  res.json({ message: 'Auth route is working' });
});

authRouter.post("/register", upload.single("avatar"), registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
