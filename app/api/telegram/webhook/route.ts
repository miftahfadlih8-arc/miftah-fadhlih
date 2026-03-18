import { NextResponse } from "next/server";
import { readData } from "@/app/lib/data";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || !message.text) {
      return NextResponse.json({ ok: true });
    }

    const data = await readData();
    const settings = data.settings || {};
    const botToken = settings.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN;
    const geminiKey = settings.geminiApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!botToken || !geminiKey || botToken === "your_telegram_bot_token") {
      console.error("Telegram Bot Token or Gemini API Key not configured.");
      return NextResponse.json({ ok: true });
    }

    // Initialize Gemini
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    // Prepare context from portfolio data
    const portfolioContext = `
      You are a highly capable AI Assistant for Miftah Fadhlih.
      You have access to his portfolio data:
      Name: ${data.profile?.name}
      Title: ${data.profile?.title}
      Summary: ${data.profile?.summary}
      Stats: ${JSON.stringify(data.stats)}
      Skills: ${JSON.stringify(data.skills)}
      
      You can answer ANY general question (coding, science, history, etc.) but also specific questions about Miftah.
      If asked about "data pengunjung" or stats, refer to the Stats provided above.
      Be helpful, witty, and professional.
    `;

    // Generate response
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message.text,
      config: {
        systemInstruction: portfolioContext,
      }
    });

    const responseText = result.text || "Sorry, I couldn't generate a response.";

    // Send back to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: responseText,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}
