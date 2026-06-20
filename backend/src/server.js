import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

import { getGeminiResponse } from "./providers/gemini.js";
import { getOpenAIResponse } from "./providers/openaiMock.js";
import { getGrokResponse } from "./providers/grokMock.js";

const app = express();

app.use(cors());
app.use(express.json());

const sharedComparisons = new Map();

app.get("/", (req, res) => {
  res.send("TriAI Backend Running");
});

async function measureLatency(fn, status) {
  const start = Date.now();

  try {
    const text = await fn();

    return {
      text,
      status,
      latency:
  status === "mock"
    ? "0.00"
    : ((Date.now() - start) / 1000).toFixed(2),
    };

  } catch (error) {

    let message =
      "⚠️ Something went wrong. Please try again.";

    if (
      error.message.includes("503") ||
      error.message.includes("UNAVAILABLE") ||
      error.message.includes("high demand")
    ) {
      message =
        "⚠️ Gemini is currently experiencing high traffic.\n\nThe free Gemini API is temporarily busy. Please try again after a few moments.";
    }

    return {
      text: message,
      status: "error",
      latency: ((Date.now() - start) / 1000).toFixed(2),
    };
  }
}

app.post("/api/ask", async (req, res) => {
  const { prompt } = req.body;

  const [openai, gemini, grok] = await Promise.all([
    measureLatency(() => getOpenAIResponse(prompt), "mock"),
    measureLatency(() => getGeminiResponse(prompt), "live"),
    measureLatency(() => getGrokResponse(prompt), "mock"),
  ]);

  res.json({
    openai,
    gemini,
    grok,
  });
});

/* SHARE LINK API */

app.post("/api/share", (req, res) => {
  const { responses } = req.body;

  const id = nanoid(8);

  sharedComparisons.set(id, responses);

  res.json({
    shareId: id,
  });
});

app.get("/api/share/:id", (req, res) => {
  const data = sharedComparisons.get(req.params.id);

  if (!data) {
    return res.status(404).json({
      error: "Comparison not found",
    });
  }

  res.json(data);
});

app.listen(5050, () => {
  console.log("Server running on port 5050");
});