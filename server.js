import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.1",
        messages: [
          { role: "system", content: "You are GP BOTS, a romantic love-themed AI assistant." },
          { role: "user", content: userMessage }
        ]
      })
    });
    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "No reply" });
  } catch (err) {
    res.json({ reply: "Error: " + err.message });
  }
});

app.listen(3000, () => console.log("💖 GP BOTS backend running on port 3000"));
