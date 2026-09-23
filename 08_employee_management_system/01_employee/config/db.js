import mongoose from "mongoose";


async function connectDB() {

    try{

        const connect = await mongoose.connect(process.env.MONGO_URL);

        console.log("env path",process.env.MONGO_URL);
        console.log("DB connected");

        return connect;

    }catch(error){
        throw new Error(error.message)
    }
    
}

export default connectDB;