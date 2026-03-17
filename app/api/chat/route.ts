import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { MIFTAH_CV_PROMPT } from "@/app/lib/ai-agent";
import { sendTelegramMessage } from "@/app/lib/telegram";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }

    // Format history for Gemini
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const currentMessage = messages[messages.length - 1].content;

    // Initialize chat
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: MIFTAH_CV_PROMPT,
        temperature: 0.7,
      },
    });

    // We can't easily set history with the current SDK's chat.create,
    // so we'll just send the whole conversation as a single prompt if needed,
    // or use generateContent. Let's use generateContent for simplicity and full control.

    const formattedContents = [
      {
        role: "user",
        parts: [{ text: "System Instruction: " + MIFTAH_CV_PROMPT }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I will act as Miftah's AI Assistant." }],
      },
      ...messages.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: formattedContents,
    });

    const reply =
      response.text || "I'm sorry, I couldn't process that request.";

    // Optionally notify Miftah via Telegram about the chat
    // We can debounce this or only send if it's a specific intent (like scheduling)
    // For now, let's just send a summary if the user asks to contact Miftah
    if (
      currentMessage.toLowerCase().includes("contact") ||
      currentMessage.toLowerCase().includes("meeting") ||
      currentMessage.toLowerCase().includes("schedule")
    ) {
      await sendTelegramMessage(
        `🤖 <b>AI Agent Alert</b>\nUser is asking about contacting/scheduling.\nUser: "${currentMessage}"\nAI: "${reply}"`,
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat" },
      { status: 500 },
    );
  }
}
