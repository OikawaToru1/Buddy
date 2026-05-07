import {upload} from '../middlewares/multer.js';

async function getFileByName(req : any, res : any){
    const {fileName} = req.params;

    // Logic to retrieve the file based on the fileName
    // From the db or fs
    res.json({message: `File with name ${fileName} retrieved successfully`});
}

async function uploadFile(req : any, res : any){
    console.log('Received file upload request');
    console.log(req.file);
    res.json({ message: 'File uploaded successfully', file: req.file });
}

export {getFileByName, uploadFile}
