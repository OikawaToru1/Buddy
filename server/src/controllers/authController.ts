import  {User} from '../models/users.model.js';
import {uploadToCloudinary} from '../utils/Cloudinary.js'

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



export {registerUser, loginUser, logoutUser};