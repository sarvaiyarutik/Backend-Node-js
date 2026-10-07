import mongoose from "mongoose";

async function connectDB() {

    try {

        console.log("Mongo URI:", process.env.MONGO_URI);

        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log("db connected");

        return connect;

    } catch (error) {

        console.log(error.message);
        throw error;
    }
}

export default connectDB;