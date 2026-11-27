
import mongoose from "mongoose"


const StudentSchema = new mongoose.Schema({

    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  grId: {
    type: Number,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    enum: ["fsd", "ui/ux", "video editing", "graphic design"],
    default: "fsd",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});


const Student = mongoose.model("Student Data",StudentSchema);

export default Student;