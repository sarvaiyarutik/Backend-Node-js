import httpError from "../middleware/httpError.js";
import userModel from "../model/userData.js";

const add  = async (req,res,next)=>{

    try{

        const {name,email,password} = req.body;

        const newUser = await userModel.create({

            name,
            email,
            password

        })

        res.status(201).json({success:true,message:"user data added successfully",newUser})

    }catch(error){
        return next(new httpError(error.message))
    }

}

const getAll = async(req,res,next)=>{

    try {
        
        const {id}  =req.params;

        const all = await userModel.find({});

        if(all.length === 0){
            return next(new httpError("user data not found"))
        }

        res.status(200).json({success:true,message:"all user found successfully",total:all.length,all})

    } catch (error) {
        return next(new httpError(error.message,500))
    }
    
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findByCredential(email, password);


        return res.status(200).json({
            success: true,
            message: "User login successfully",
            user
        });

    } catch (error) {
        return next(new httpError(error.message, 400));
    }
};  


export default {add,getAll,login};