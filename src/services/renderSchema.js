import { POS_COLORS } from "../config/posColors.js";

export function buildRenderSchema(full) {
  return {
    lang: full.language,
    confidence: full.confidence,
    text: full.original_text,
    v: "1.1",
    tokens: full.tokens.map((t, i) => ({
      i,
      t: t.surface,
      p: t.pos,
      c: POS_COLORS[t.pos] || "#444",
      h: buildTooltip(t),
      s: t.start_char ?? 0,
      e: t.end_char ?? 0
    }))
  };
}

function buildTooltip(token) {
  let tooltip = `${token.pos}\n`;

  if (token.suffixes?.length) {
    tooltip += "Ekler:\n";
    token.suffixes.forEach(s => {
      tooltip += `- ${s.suffix} → ${s.function}\n`;
    });
  }

  return tooltip.trim();
}

