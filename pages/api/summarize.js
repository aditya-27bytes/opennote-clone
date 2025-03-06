import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { text } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "gpt-4",
    prompt: `Summarize the following text:\n\n${text}`,
    max_tokens: 100,
  });

  res.status(200).json({ summary: response.data.choices[0].text.trim() });
}
