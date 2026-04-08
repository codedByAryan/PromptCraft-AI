import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      user: req.user._id,
      title: "New Chat",
      messages: [],
    });

    res.status(201).json({
      message: "Chat created successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create chat",
      error: error.message,
    });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt createdAt");

    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch chats",
      error: error.message,
    });
  }
};

export const getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch chat",
      error: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete chat",
      error: error.message,
    });
  }
};