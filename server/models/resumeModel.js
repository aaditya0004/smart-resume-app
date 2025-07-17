// In models/resumeModel.js
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
    type: String, // To store the text from an analyzed resume
  },
  customizedText: {
    type: String, // To store the text from a customized resume
  },
  aiFeedback: {
    type: mongoose.Schema.Types.Mixed, // To store the JSON feedback from analysis
  },
}, {
  timestamps: true,
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;