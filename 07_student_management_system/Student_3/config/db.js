import mongoose from "mongoose";

async function connectDB() {

    try{

        const connect = await mongoose.connect("mongodb://localhost/EmployeeManagementSystem")

        console.log("DB Connected");
        

        return connect;

    }catch(err){
        console.log(err)

        throw err;
    }
    
}

export default connectDB;