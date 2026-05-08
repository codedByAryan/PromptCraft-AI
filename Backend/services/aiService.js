import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "My AI Chatbot",
  },
});

const MODELS = [
  "qwen/qwen3-coder:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
];

export const askOpenRouter = async (messages) => {
  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      const completion = await client.chat.completions.create({
        model,
        messages,
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error(`Model ${model} failed:`, error?.status, error?.message);
      if (error?.status !== 429 && error?.status !== 404) {
        throw error; // only retry on rate limit or not found
      }
    }
  }
  throw new Error("All models are rate limited. Please try again in a minute.");
};