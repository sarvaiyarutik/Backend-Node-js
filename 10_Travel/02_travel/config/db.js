import mongoose from "mongoose";


async function connectDB() {

    try{

        const connect = await mongoose.connect(process.env)


    }catch(error){
        console.log(error.message);
    }
    
}
