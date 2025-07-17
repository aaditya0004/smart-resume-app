import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/resumeController.js";

const router = express.Router();

// Set up multer to store files in /uploads
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/resume/upload
router.post("/upload", upload.single("resume"), analyzeResume);

export default router;
