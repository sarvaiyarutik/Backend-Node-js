import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
            if(value.toLowercase() === "password"){
                return "password can't contain password word as password"
            }
      }
    },
    tokens:[
        {
            token:{
                type:true,
           required:true

            }
        }
    ]

},{
    timeseries:true
})



userSchema.pre("save",async function () {

    try {

        const user = this;

        if(user.isModified("password")){
            user.password = await bcrypt.hash(this.password,10 )
        }
        
    } catch (error) {
            throw new Error(error.message)
    }
    
})

userSchema.statics.findByCredential = async function(email,password){

try {

    const user = await this.findOne({email})

    if(!user){
        throw new Error("email not found")
    }

    console.log("Stored password hash ",user.password);

    const isMatch = await bcrypt.compare(password,user.password);

            console.log("Password matched:", isMatch);


    
        if (!isMatch) {
            throw new Error("Password does not match");
        }

        return user;
 
    
} catch (error) {
    throw new Error(error.message)

}
    
}

userSchema.methods.generateAuthToken = async function (params) {
    

    try {

        const user = this;

        const token = jwt.sign({_id:user._id.toString()},
    process.env.JWT_SECRET,{
        expiresIn:"10d"
    }
    )

    console.log("token",token);

    if(!token){
        throw new Error("failed to generate auth token")
    }

    user.tokens = user.tokens.concat({ token })

    await user.save();

    return token;

        
    } catch (error) {
       throw new Error(error.message)

    }

}

const User = mongoose.model("user model",userSchema);

export default User;     