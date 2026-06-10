import multer from 'multer'

// Code below is for local storage(disk storage), it means the file will be stored in local file system of our server

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/temp");
//   },
//   filename: function (req, file, cb) {
    
//     cb(null, file.originalname);
//   },
// });

//Below is code for memory storage, it means the file will be stored in memory as a buffer and we can directly upload it to cloudinary without storing it in local file system of our server

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage, });