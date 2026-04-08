import { askOpenRouter } from "../services/aiService.js";
import Chat from "../models/Chat.js";

export const generateText = async (req, res) => {
  try {
    const { prompt, chatId } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    let chat = null;
    let messagesForAI = [{ role: "user", content: prompt }];

    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          message: "Chat not found",
        });
      }

      messagesForAI = [
        ...chat.messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: prompt },
      ];
    } else {
      chat = await Chat.create({
        user: req.user._id,
        title: prompt.slice(0, 30) || "New Chat",
        messages: [],
      });
    }

    const result = await askOpenRouter(messagesForAI);

    chat.messages.push(
      { role: "user", content: prompt },
      { role: "assistant", content: result }
    );

    if (chat.title === "New Chat" || !chat.title) {
      chat.title = prompt.slice(0, 30);
    }

    await chat.save();

    res.status(200).json({
      message: "Response generated successfully",
      result,
      chat,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    res.status(500).json({
      message: "Something went wrong",
      error: error?.message || "Unknown error",
    });
  }
};

export const enhancePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const messagesForAI = [
      {
        role: "system",
        content: `
You are a prompt rewriter.

Your only job is to rewrite the user's input into a better AI prompt.

Strict rules:
1. Do NOT answer the user's request.
2. Do NOT explain anything.
3. Do NOT give examples.
4. Do NOT add phrases like "Here is an enhanced version", "Certainly", or "Creating...".
5. If the input is in Hindi or Hinglish, convert it into clear natural English.
6. Rewrite it as a clean, direct, detailed prompt that can be sent to an AI assistant.
7. Preserve the original meaning.
8. Return only the rewritten prompt text.
9. Do not use quotation marks.

Bad example:
User: meri linkedin summary likho
Wrong output: Here is a professional LinkedIn summary...
Wrong output: Creating a professional LinkedIn summary...

Good example:
Write a professional LinkedIn summary for a software developer. Make it concise, impactful, and highlight skills, projects, strengths, and career goals.
        `.trim(),
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const enhancedPrompt = await askOpenRouter(messagesForAI);

    let cleanedPrompt = enhancedPrompt.trim();

cleanedPrompt = cleanedPrompt
  .replace(/^here('?| i)s an enhanced version:?\s*/i, "")
  .replace(/^enhanced prompt:?\s*/i, "")
  .replace(/^certainly[,!]?\s*/i, "")
  .replace(/^creating .*?:\s*/i, "")
  .trim();

  res.status(200).json({
  message: "Prompt enhanced successfully",
  enhancedPrompt: cleanedPrompt,
});

    res.status(200).json({
      message: "Prompt enhanced successfully",
      enhancedPrompt: enhancedPrompt.trim(),
    });
  } catch (error) {
    console.error("Enhance Prompt Error:", error);

    res.status(500).json({
      message: "Failed to enhance prompt",
      error: error?.message || "Unknown error",
    });
  }
};