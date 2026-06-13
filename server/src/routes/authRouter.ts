import { Router } from "express";
import {verifyJWT} from '../middlewares/auth.js'
import {registerUser, loginUser, logoutUser, refreshAccessToken} from "../controllers/authController.js";

import {upload} from '../middlewares/multer.js'

const authRouter = Router();

authRouter.get('/', (req, res) => {
  console.log('Received request for auth route');
  res.json({ message: 'Auth route is working' });
});

authRouter.get('/test',(req, res) => {
  res.send("Auth test route is working");
});
authRouter.post("/register", upload.single("avatar"), registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;