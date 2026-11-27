import Student from "../model/studentData.js"
import httpError from "../middleware/httpError.js"

const add = async(req,res,next)=>{

    try {
        const {name, email, grId, course, isActive} = req.body;

    const student = {
        name,
      email,
      grId,
      course,
      isActive,
    }

    const newStudent = new Student(student)

    await newStudent.save();

        if (!newStudent) {
      next(new httpError("failed to add student", 400));
    }

    res
      .status(201)
      .json({ success: true, message: "student added", newStudent });
        
    } catch (error) {
        return(new httpError(error.message,500))
    }


}

// const add = async(req,res,next)=>{

//   try {
    
//       const {name, email, grId, course, isActive} = req.body;

//       const student = {
//       name,
//       email,
//       grId,
//       course,
//       isActive,
//     }

//    const newStudent = new Student.create(student);

//   if(!newStudent){
//     return next(new httpError("failed to add student",400))
//   }
 
//    res
//       .status(201)
//       .json({ success: true, message: "student added", newStudent });


//   } catch (error) {
//             return(new httpError(error.message,500))

//   }

// }

const getAll = async(req,res,next)=>{

  try {

    const student1 = await Student.find({});

    if(student1.length === 0){
      return res.status(200).json({success:true,message:"no student data found"})
    }

    res.student(200).json({success:true,message:"student list fetched successfully"})
    
  } catch (error) {
     return(new httpError(error.message,500))

  }

}

const getById  = async(req,res,next)=>{

  try {

    const {id} = req.params

    const student1 = await Student.findById(id)

    if(!student1){
      return next(new httpError("no student found with this id",404))
    }

    res.status(200).json({success:true,message:"student found with this id",student1})
    
  } catch (error) {
     return(new httpError(error.message,500))

  }

}

const deleteById = async(req,res,next)=>{

  try {

    const {id} = req.params;

    const student1 = await Student.findByIdAndDelete(id);


    
    if (!student1) {
      return next(new httpError("failed to delete student with this id", 400));
    }

    res.status(200).json({
      success: true,
      message: "student with this id deleted successfully",
    });
    
  } catch (error) {
         return(new httpError(error.message,500))

  }

}

const deleteAll = async(req,res,next)=>{

  try {

    const {id} = req.params;

    const student1 = await Student.deleteMany(id);

    if(student1.deletedCount === 0){
      return next(new httpError("failed to delete all data", 500));

    }
    
     res
      .status(200)
      .json({ success: true, message: "student list deleted successfully" });

  } catch (error) {
             return(new httpError(error.message,500))

  }

}

const updateManually = async(req,res,next)=>{

  try {

    const {id} = req.params;

    const StudentUpdate = await Student.findById(id);

      if(!StudentUpdate){
      return next(new httpError("student not found with this id",404))
    }

    const updates = Object.keys(req.body);

    const allowField = ["name","email"];

    const isValidUpdate = updates.every((f)=>{
      allowField.includes(f)
    })

     if (!isValidUpdate) {
      return next(new httpError("only allowed field can be update", 400));
    }


    updates.forEach((u) => {
      StudentUpdate[u] = req.body[u];
    });

    await StudentUpdate.save();

      res
      .status(200)
      .json({ success: true, message: "student data updated successfully" ,studentUpdate});
    
  } catch (error) {
    return(new httpError(error.message,500))
  }

}

export default {add,getAll,getById,deleteById,deleteAll,updateManually};