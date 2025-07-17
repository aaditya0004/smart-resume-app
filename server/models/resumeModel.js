import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  originalFileName: {
    type: String,
    required: true,
  },
  originalText: {
    type: String, 
  },
  customizedText: {
    type: String, 
  },
  aiFeedback: {
    type: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;