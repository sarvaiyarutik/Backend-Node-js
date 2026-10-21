
import userModel from "../model/userModel.js";
import httpError from "../middleware/httpError.js";

const add = async(req,res,next)=>{

    try{

        const {name,email,password} = req.body;

        const newUSer = await userModel.create({

           name,email,password 
        })

        res.status(201).json({success:true,message:"user data added successful",newUSer})

    }catch(error){
        return next(new httpError(error.message))
    }

}

const getAll = async(req,res,next)=>{

    try {

        const {id} = req.params;

        const user = await userModel.find({});

        if(!user){

            return next(new httpError("user data not found",404));

        }

        res.status(201).json({success:true,message:"all data found successfully",total:user.length,user})

        
    } catch (error) {
        return next(new httpError(error.message,500))
    }

}

const login = async(req,res,next)=>{

    try{

        const {email,password} = req.body


        const user = await userModel.findByCredential({email,password});


        const token = await userModel.generateAuthToken();

        return res.status(200).json({success:true,message:"user login successfully",user,token})
    }catch(error){
        return next(new httpError(error.message,500))
    }

}



export default {add,getAll,login};