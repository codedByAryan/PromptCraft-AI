import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const askOpenRouter = async (messages) => {
  const completion = await client.chat.completions.create({
    model: "openrouter/free",
    messages,
  });

  return completion.choices[0].message.content;
};