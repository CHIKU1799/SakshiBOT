
import { GoogleGenAI, Chat as GeminiChat } from "@google/genai";

// Ensure the API key is available, but do not expose it in UI or request it.
if (!import.meta.env.VITE_API_KEY) {
  // In a real app, you'd have better error handling.
  // For this context, we'll alert and disable the service.
  alert("Gemini API key is not configured. The AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY! });
const chatInstances = new Map<string, GeminiChat>();

function getChatInstance(chatId: string, systemInstruction: string): GeminiChat {
  if (!chatInstances.has(chatId)) {
    const newChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
    chatInstances.set(chatId, newChat);
  }
  return chatInstances.get(chatId)!;
}

export const streamChatResponse = async (
  chatId: string,
  systemInstruction: string,
  message: string,
  onChunk: (chunk: string) => void,
  onError: (errorMsg: string) => void
) => {
  if (!import.meta.env.VITE_API_KEY) {
    onError("AI service is not configured.");
    return;
  }

  try {
    const chat = getChatInstance(chatId, systemInstruction);
    const responseStream = await chat.sendMessageStream({ message });

    for await (const chunk of responseStream) {
      onChunk(chunk.text);
    }
  } catch (error) {
    console.error("Error streaming response:", error);
    onError("Oops, I've hit a snag. My circuits are a bit frazzled. Could you try that again?");
  }
};
