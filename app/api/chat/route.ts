import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { MIFTAH_CV_PROMPT } from "@/app/lib/ai-agent";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { readData } from "@/app/lib/data";

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }

    // Get API Key from data.json or environment
    const data = await readData();
    const geminiKey = data.settings?.geminiApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!geminiKey) {
      console.error("Gemini API Key not configured.");
      return NextResponse.json(
        { error: "AI Assistant is currently unavailable. Please configure the API Key." },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey: geminiKey });

    const currentMessage = messages[messages.length - 1].content;

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
