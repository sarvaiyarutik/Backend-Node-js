import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

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
                if(value.toLowerCase()=== "password"){
                    return "password can't contain the word password"
                }
                message:"Password cannot contain the word 'password'."
            }

        },
        tokens:[
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]

},{
    timestamps:true
})


UserSchema.pre("save",async function () {

    try {

        const user = this

        if(user.isModified("password")){
            user.password = await bcrypt.hash(this.password,10)
        }
        
    } catch (error) {
        throw new Error(error.message)

    }
    
})

UserSchema.statics.findByCredential = async function (email,password) {

    console.log("Email received",email)
    
    const user = this.findOne({email});

    console.log("User found:",!!user)

    if(!user){
        throw new Error("email not found in database")
    }

    console.log("Stored password hash:", user.password);

    const isMatched = await bcrypt.compare(password,user.password);


    console.log("password is matched",isMatched)

    if(!isMatched){
        throw new Error("password dose not match")
    }

    return user;
}

UserSchema.methods.generateAuthToken = async function () {

    try {
        
        const user = this;

        const token = jwt.sign({

            _id:user._id.toString()
        },
    process.env.JWT_SECRET,{
        expiresIn:"10d"
    })


    console.log("token",token)


    if(!token){
        throw new Error("failed to generate token")
    }

    user.tokens = user.tokens.concat({token})

    await user.save();

    return token;

    } catch (error) {

        throw new Error(error.message)

    }
    
}

const User = mongoose.model("user model data",UserSchema);


export default User;