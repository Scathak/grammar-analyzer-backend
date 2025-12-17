import axios from "axios";

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_KEY = process.env.QDRANT_API_KEY;

export async function storeAnalysis(text, analysis) {
  await axios.post(
    `${QDRANT_URL}/collections/grammar/points`,
    {
      points: [
        {
          id: crypto.randomUUID(),
          vector: await embed(text),
          payload: analysis
        }
      ]
    },
    {
      headers: {
        "api-key": QDRANT_KEY
      }
    }
  );
}

async function embed(text) {
  return new Array(384).fill(0); // placeholder embedding
}

