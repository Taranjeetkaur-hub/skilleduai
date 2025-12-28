import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Health check (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

console.log(process.env.OPENAI_API_KEY ? "KEY OK" : "KEY MISSING");

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.json({ reply: "Message missing" });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: userMessage
    });

    // ✅ SAFE way to read reply
    const reply =
      response.output?.[0]?.content?.[0]?.text || "No reply from AI";

    res.json({ reply });

  } catch (err) {
    console.error("OPENAI ERROR:", err);
    res.status(500).json({ reply: "AI failed" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
