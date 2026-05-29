import 'dotenv/config'
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'




cloudinary.config({
    secure: true,
});


export const uploadToCloudinary = async (localFilePath : string)=>{
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "raw",
            use_filename: true,
            unique_filename : false,
            overwrite : true,
        });

        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error in uploading file to cloud",error);
        return null;
    }
}
