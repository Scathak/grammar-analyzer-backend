import express from "express";
import { analyzeText } from "../services/llmService.js";
import { buildRenderSchema } from "../services/renderSchema.js";
import { storeAnalysis } from "../services/vectorStore.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.length < 2) {
      return res.status(400).json({ error: "Invalid input text" });
    }

    const fullAnalysis = await analyzeText(text);
    const renderSchema = buildRenderSchema(fullAnalysis);

    // async, non-blocking
    storeAnalysis(text, fullAnalysis).catch(() => {});

    res.json(renderSchema);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
});

export default router;

