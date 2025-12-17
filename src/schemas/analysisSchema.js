export const analysisSchema = `
{
  "language": "tr",
  "confidence": number,
  "original_text": string,
  "tokens": [
    {
      "id": number,
      "surface": string,
      "pos": string,
      "suffixes": [
        {
          "suffix": string,
          "function": string
        }
      ]
    }
  ]
}
`;

