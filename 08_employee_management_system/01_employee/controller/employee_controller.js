
    import httpError from "../middleware/httpError.js"
    import Employee from "../model/studentData.js";

    const add = async (req,res,next)=>{

        try{

             const {
            name,
            email,
            GRID,
            mobile,
            department
        } = req.body;

             const employee = await Employee.create({
            name,
            email,
            GRID,
            mobile,
            department
        });



   
            res.status(201).json({success:true,message:"data added successfully",employee})

        }catch(error){
            return next(new httpError(error.message))
        }

    }


    const employeeDataShow = async(req,res,next)=>{

        try{

            const {id} = req.params

            const employee = await Employee.find({});

            if(employee.length === 0){
                return next(new httpError("Employee not found",404))
            }

            res.status(200).json({success:true,message:"employee data fetched successfully",total:employee.length,employee})

        }catch(error){
            return next(new httpError(error.message,500));
        }

    }

    const employeeGetAllData = async(req,res,next)=>{

        try{

            const {id} = req.params
            
            const employee =await Employee.findById(id);

        if(!employee){

            return next(new httpError("employee not found",404));

        }

        res.status(200).json({success:true,message:"employee found",employee})

            
        }catch(error){
            return next(new httpError(error.message,500));
        }

    }

    const deleteEmployeeId = async(req,res,next)=>{

        try{

            const {id} = req.params

            const employee = await Employee.findByIdAndDelete(id);

            if(!employee){

                return next(new httpError("employee not found within id ",404))
            }

            res.status(200).json({success:true, message:"employee delete successfully"})

        }catch(error){
            return next(new httpError(error.message,500))
        }


    }

    const deleteAll = async(req,res,next)=>{

        try{

            const {id} = req.params

            const deleteEmployee = await Employee.deleteMany(id)

            if(!deleteAll){
                return next(new httpError("failed to delete data",500));
            }

            res.status(200).json({success:true,message:"all data delete successfully"})

        }catch(error){
            return next(new httpError(error.message));
        }
    }

    const employeeDataUpdate = async(req,res,next)=>{

        try{

            const {id} = req.params;

            const update = await Employee.findByIdAndUpdate(id,req.body,{

                new:true,
                runValidators:true

            })

            if(!update){

                return next(new httpError("student data not update",400));
            }

            return res.status(200).json({success:true,message:"employee data update successfully",update})


        }catch(error){
            return next(new httpError(error.message))
        }

    }

    const updateManually = async(req,res,next)=>{

        try{

            const { id } = req.params;

            const update = await Employee.findById(id);

        if(!update){

            return next(new httpError("employee not found",404));
        }

        const updateData = Object.keys(req.body);

        const allFields = ["name","email"];

        const  ValidUpdate = updateData.every((u)=>{

            allFields.includes(u)
        })

        if(!ValidUpdate){

            return next(new httpError("only allow fields can be update",404))
        }

        updateData.forEach((u)=>{
           return allFields.includes(u)
        })

        await updateData.save();
    }catch(error){
      return next(new httpError(error.message))

    }
}
 export default {add,employeeDataShow,employeeGetAllData,deleteEmployeeId,deleteAll,updateManually}