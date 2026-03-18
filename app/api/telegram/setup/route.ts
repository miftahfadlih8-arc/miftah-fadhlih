import { NextResponse } from "next/server";
import { readData } from "@/app/lib/data";

export async function POST() {
  try {
    const data = await readData();
    const botToken = data.settings?.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken || botToken === "your_telegram_bot_token") {
      return NextResponse.json(
        { success: false, error: "Telegram Bot Token not found in settings or environment." },
        { status: 400 },
      );
    }

    // Use the App URL from environment
    const appUrl = process.env.APP_URL;
    if (!appUrl) {
      return NextResponse.json(
        { success: false, error: "App URL not configured in environment." },
        { status: 500 },
      );
    }

    const webhookUrl = `${appUrl}/api/telegram/webhook`;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/setWebhook?url=${webhookUrl}`;

    const response = await fetch(telegramUrl);
    const result = await response.json();

    if (result.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: result.description || "Failed to set webhook." },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Telegram Setup Error:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred." },
      { status: 500 },
    );
  }
}
