import jwt from "jsonwebtoken";
import {User} from "../models/users.model.js";


export const verifyJWT = async(req : any, res : any, next : any) => {
    const token = req.cookies?.accessToken || req.headers("Authorization")
    ?.replace("Bearer", "");

    if(!token) return res.status(401).json({message : "Unauthorized access"});

    try{
        const decoded : any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET !);

        // const user = await User.findById(decoded._id).select("-password -refreshToken");

        const user = await User.findById(decoded.id).select("-password -refreshToken");


        if(!user) {
            console.log("User not found for decoded token:", decoded);
            return res.status(401).json({ message: "Invalid access token" });
        }

        req.user = user;
        next();

    }catch(err){console.log("Error verifying JWT:", err);
        return res.status(403).json({message : "Forbidden access"});
    }
}