import fs from "fs";
import { getAIReview } from "../utils/openai.js";
import { extractTextFromPDF } from "../utils/pdfUtils.js";
import Resume from "../models/resumeModel.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filepath = req.file.path;
    const resumeText = await extractTextFromPDF(filepath);
    const aiFeedback = await getAIReview(resumeText);
    const resumeUrl = `${req.protocol}://${req.get("host")}/${filepath.replace(
      /\\/g,
      "/"
    )}`;

    const newResumeEntry = new Resume({
      originalText: resumeText,
      aiFeedback: aiFeedback, 
      originalFileName: req.file.originalname,
      user: req.user._id, 
    });
    await newResumeEntry.save();

    res.status(200).json({
      resumeText,
      aiFeedback,
      resumeUrl,
    });
  } catch (error) {
    console.error("Resume analysis failed:", error);
    res.status(500).json({ message: "Failed to analyze resume" });
  }
};
