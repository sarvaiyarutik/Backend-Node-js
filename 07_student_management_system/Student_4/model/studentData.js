import mongoose from "mongoose";

const StudentSchema = await mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  GRID: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Student = mongoose.model("StudentData", StudentSchema);

export default Student;
