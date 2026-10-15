
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        validate:(value)=>{
            if(value.toLowerCase() === "password"){
                return "password can't contain password word as password "
            } 
            message:"Password cannot contain the word 'password'."
        }
    }
    

},{
    timeseries:true
})

const User = mongoose.model("user model data",UserSchema);

export default User;