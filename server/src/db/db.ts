import mongoose from 'mongoose'
import { DB_NAME } from './constant.js';

const conntectMongoDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log(`\n MongoDB connected !!!  :
        //     \n ${connectionInstance.connection.host}
        //     `);
        
    } catch (error) {
        console.log("Error connecting to your MongoDB database", error);
    }
}
export default conntectMongoDB