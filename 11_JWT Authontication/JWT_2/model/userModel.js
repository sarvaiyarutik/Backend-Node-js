import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({

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
            if(value === "password"){
                return "password can't contain password word as password"
            }
        }

    }

},{
    timestamps:true
});

userSchema.pre("save",async function (email,password) {

    try{
        const user = this;

        if(this.isModified("password")){
            user.password = await bcrypt.hash(this.password, 10)
        }
    }catch(error){
        throw new Error(error.message)
    }
    
})

userSchema.static.findByCredential = async function (email,password) {


    try{

        const user = await this.findOne({email});

        if(!user){
            throw new Error("email not found is database",404)
        }

        console.log("storage password hash",user.password);

        const isMatched = await bcrypt.compare(password,user.password);

        console.log("password matched",isMatched);

        if(!isMatched){
            throw new Error("password does not matched")
        }

        return user;

    }catch(error){
       throw new Error(error.message)

    }
}


const user = mongoose.model("model path",userSchema);

export default user;