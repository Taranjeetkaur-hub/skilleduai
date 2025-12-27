import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log(process.env.OPENAI_API_KEY ? "KEY OK" : "KEY MISSING");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Message missing" });
  }

  let reply = "AI failed";

  // Retry logic in case of temporary issues
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await openai.responses.create({
        model: "gpt-3.5-turbo",   // Lightweight model
        input: userMessage,
        max_output_tokens: 500     // Limit response size
      });

      reply = response.output?.[0]?.content?.[0]?.text || "No reply";
      break; // Successful, exit loop
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed:`, err);
      if (attempt === 2) return res.status(500).json({ reply });
    }
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
