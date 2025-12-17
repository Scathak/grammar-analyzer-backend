import axios from "axios";
import { analysisSchema } from "../schemas/analysisSchema.js";

const LLM_API = process.env.LLM_API_URL;
const LLM_KEY = process.env.LLM_API_KEY;

export async function analyzeText(text) {
  const prompt = `
	SYSTEM:
	You are a deterministic Turkish linguistic analysis engine.
	Follow all rules strictly. Output JSON only.

	USER:
	Analyze the following text linguistically.

	Rules:
	- Do not invent information.
	- Do not correct text.
	- Do not guess when uncertain.
	- Mark ambiguity explicitly.

	Turkish suffix constraints:
	[PLURAL, POSSESSIVE, CASE, TENSE, ASPECT, MOOD, PERSON, VOICE, NEGATION, DERIVATION]

	Verification:
	- Every suffix must exist in the surface word.
	- Every token must exist in the input.

	Output schema:
	${analysisSchema}

	Text:
	"""
	${text}
	"""
	`;

s  const response = await axios.post(
    LLM_API,
    {
      model: "free-multilingual-model",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    },
    {
      headers: {
        Authorization: `Bearer ${LLM_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return JSON.parse(response.data.choices[0].message.content);
}

