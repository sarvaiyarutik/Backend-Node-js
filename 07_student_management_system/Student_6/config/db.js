
import mongoose from "mongoose";


async function connectDB() {

    try {

        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/student")

        console.log("DB Connected")

        return connect
        ;
        
    } catch (error) {
        console.log(error.message)
    }
    
}

export default connectDB;