import express from "express";
import multer from "multer";
import { customizeResume } from "../controllers/customizeResumeController.js";
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post('/',  upload.single("resume"), customizeResume);

export default router;