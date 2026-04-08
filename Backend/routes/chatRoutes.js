import express from "express";
import {
  createChat,
  getUserChats,
  getSingleChat,
  deleteChat
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createChat);
router.get("/", protect, getUserChats);
router.get("/:id", protect, getSingleChat);
router.delete("/:id", protect, deleteChat);

export default router;