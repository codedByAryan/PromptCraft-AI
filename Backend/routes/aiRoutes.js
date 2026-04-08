import express from "express";
import { generateText, enhancePrompt } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateText);
router.post("/enhance-prompt", protect, enhancePrompt);


export default router;