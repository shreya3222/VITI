import express from "express";
import { aiParseTask } from "../utils/aiParser.js";
import {
  extractTitle,
  extractPriority,
  extractStatus,
  extractDueDate,
} from "../utils/voiceFallback.js";

const router = express.Router();

router.post("/parse", async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript || !transcript.trim()) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const ai = await aiParseTask(transcript);
    if (ai) return res.json({ source: "groq", parsed: ai });

    return res.json({
      source: "rule-based",
      parsed: {
        title: extractTitle(transcript),
        priority: extractPriority(transcript),
        status: extractStatus(transcript),
        dueDate: extractDueDate(transcript),
      },
    });

  } catch (error) {
    res.status(500).json({ error: "Voice parsing failed", details: error.message });
  }
});

export default router;
