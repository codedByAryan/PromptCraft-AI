import dotenv from "dotenv";
dotenv.config();

const response = await fetch("https://openrouter.ai/api/v1/models", {
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
  },
});

const data = await response.json();

// Show only free models
const freeModels = data.data?.filter(m => 
  m.pricing?.prompt === "0" || m.pricing?.prompt === 0
);

console.log("Free models available:");
freeModels?.forEach(m => console.log(m.id));