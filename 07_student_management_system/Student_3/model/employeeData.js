
import mongoose from "mongoose";


const EmployeeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{

        type:String,
        required:true,
        unique:true,

    },

    GRID:{

        type:Number,
        required:true,
        unique:true

    },
    Work:{
      type:String,
      enum:["farmer","mason","plumber"],
      default:"farmer"
    }

})

const employee = mongoose.model("Employee data",EmployeeSchema);

export default employee;