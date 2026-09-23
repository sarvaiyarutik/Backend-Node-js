
import mongoose from "mongoose";
import httpError from "../middleware/httpError.js"

async function connectDB() {

    try{


        const connect = await mongoose.connect(
            "mongodb://127.0.0.1:27017/studentManagementSystem"
        );
            console.log("connect db");

            return connect;
            

    }catch(error){

        (new httpError("request not found"))

        throw error;
    }
    
}

export default connectDB;
