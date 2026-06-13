import  {User} from '../models/users.model.js';
import {uploadToCloudinary} from '../utils/Cloudinary.js'
import jwt from 'jsonwebtoken';

async function registerUser(req : any, res : any){
    console.log('Received user registration request');
    console.log(req.body);
    console.log(req.file);
    try {
        const {fullName, email, password} = req.body;
        const existingUser = await User.findOne({email});

        if([fullName, email, password].some(feild => feild.trim() === "")){
            return res.status(400).json({message : "All fields are required"});
        }

         const profilePicture = req.file;
         if (!profilePicture)
           return res
             .status(400)
             .json({ message: "Profile image is required" });

        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }

        const avtarURI = await uploadToCloudinary(profilePicture.buffer, profilePicture.originalname);
        if(!avtarURI) {
            return res.status(500).json({message : "Failed to upload profile image"});
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            avatar : avtarURI.secure_url,
        });

        const createdUser = await User.findOne({_id : newUser._id}).select("-password -refreshToken");
        if(!createdUser) return res.status(500).json({message : "Failed to create user"});

        return res.status(201).json({message : "User registered successfully", user : createdUser});

       
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({message : "Internal server error"});
    }
}

const generateAccessAndRefreshTokens = async (userId : string)=>{
    try{
        const user = await User.findById(userId);
        if(!user) throw new Error("User not found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken, refreshToken};
    }
    catch(error){
        console.error("Error generating tokens:", error);
        throw new Error("Failed to generate tokens");
    }
}

async function loginUser(req : any, res : any){

    const {email,  password} = req.body;
    console.log("Received login request with data:", req.body);
    if(! ( email))
    {
        return res.status(400).json({message : " and email are required"});
    }

    if(!password){
        return res.status(400).json({message : "Password is required"});
    }

    try{
        const userExists = await User.findOne({
            $or : [
                {email},
                
            ]
        });
        if(!userExists){
            return res.status(404).json({message : "User does not exist"});
        }

       const isPasswordCorrect = await userExists.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.status(401).json({message : "Invalid password"});
        }

        const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(userExists._id); 
        const loggedInUser = await User.findById(userExists._id).select("-password -refreshToken");
        if(!loggedInUser) return res.status(500).json({message : "Failed to retrieve user data after login"});

        const options = {
            httpOnly : true,
            secure : true,
            sameSite : "none" as const,
        }

        return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({message : "User logged in successfully", user : loggedInUser, accessToken : accessToken, refreshToken :  refreshToken});

    }
    catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({message : "Internal server error"});
    }
}

const logoutUser = async (req : any, res : any) => {
 
    await User.findByIdAndUpdate(req.user._id,
        {$set : {refreshToken : null}},
        {new : true}
    );

    const options = {
        httpOnly : true,
        secure : true,
        sameSite : "none" as const,
    }

    return res.status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json({message : "User logged out successfully"});
}

const refreshAccessToken = async(req : any, res : any) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    console.log("Received request to refresh access token with refresh token:", refreshToken, "Req.body for more details and req.header", req.body, req.headers);

    if(!refreshToken){
        return res.status(400).json({message : "Refresh token is required"});
    }

    try{
        const decoded: any = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!,
        );
        console.log("Decoded refresh token:", decoded);
        
        const user = await User.findById(decoded._id);
        if(!user || user.refreshToken !== refreshToken){
            console.log("Invalid refresh token: User not found or token mismatch");
            return res.status(401).json({message : "Invalid refresh token"});
        }

        if(user.refreshToken !== refreshToken){
            console.log("Refresh token mismatch for user:", user._id);
            return res.status(401).json({message : "Invalid refresh token"});
        }

        const {accessToken : newAccessToken , refreshToken : newRefreshToken} = await generateAccessAndRefreshTokens(user._id);
        const options = {
            httpOnly : true,
            secure : true,
            sameSite : "none" as const,
        }

        return res.status(200)
        .cookie("accessToken", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json({message : "Access token refreshed successfully", accessToken : newAccessToken, refreshToken : newRefreshToken});

    }
    catch(error){
        console.error("Error refreshing access token:", error);
        return res.status(403).json({message : "Forbidden access"});
    }
}



export {registerUser, loginUser, logoutUser, refreshAccessToken};