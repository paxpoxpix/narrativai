import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { withProxyServerless } from "@vercel/edge";

const handler = async (req, res) => {
  const { API_KEY } = process.env;
  const { message, character } = await req.json();

const safetySettings = [

    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    }
];

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.9,
    },
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: `Personality: ${character.prompt}` }],
      },
      {
        role: "model",
        parts: [{ text: `Okay. From now on, I shall play the role of ${character.name}.` }],
      },
    ],
  });

  const result = await chat.sendMessage(message);
  res.status(200).json({ message: result.text() });
};

export default withProxyServerless(handler, {
  proxyTo: "https://us-central1-gemini-ai.cloudfunctions.net",
});