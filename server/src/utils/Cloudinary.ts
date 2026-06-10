import 'dotenv/config'
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import {Readable} from "stream";




cloudinary.config({
    secure: true,
});

// Below function is for uploading file to cloudinary using local storage(disk storage) method, it means the file will be stored in local file system of our server and then we will upload it to cloudinary and after uploading we will delete the file from local file system of our server

// export const uploadToCloudinary = async (localFilePath : string)=>{
//     try {
//         if(!localFilePath) return null;

//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type: "raw",
//             use_filename: true,
//             unique_filename : false,
//             overwrite : true,
//         });

//         fs.unlinkSync(localFilePath);
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         console.log("Error in uploading file to cloud",error);
//         return null;
//     }
// }

export const uploadToCloudinary = async (fileBuffer: Buffer, fileName: string)=>{
    try {
        console.log("Uploading file to cloudinary with file name: ", fileName);
        if(!fileBuffer || !fileName) return null;

       return await new Promise<UploadApiResponse>((resolve, reject)=>{
        const stream = cloudinary.uploader.upload_stream({
            resource_type : "raw",
            use_filename: true,
            unique_filename: false,
            overwrite : true,
            public_id : fileName,
        },
        (error,result)=>{
            if(error) {
                console.log("Error in uploading to cloudinary...", error);
               return reject(error);
            }
            else {
                console.log("File uploaded to cloudinary successfully...", result);
                return resolve(result!);
            }
        }
    );

    Readable.from(fileBuffer).pipe(stream);
       });
        
    } catch (error) {
        console.log("Error in uploading to cloudinary...", error)
        return null;
    }
}