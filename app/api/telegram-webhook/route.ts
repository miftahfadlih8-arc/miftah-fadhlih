import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/app/lib/telegram";

export async function POST(req: Request) {
  try {
    const update = await req.json();

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Only respond to the configured chat ID
      if (chatId.toString() !== process.env.TELEGRAM_CHAT_ID) {
        return NextResponse.json({ success: true });
      }

      if (text === "/start") {
        await sendTelegramMessage(
          `Hello Miftah! I'm your portfolio assistant bot. I'll notify you of visitors and messages.`,
        );
      } else if (text === "/stats") {
        await sendTelegramMessage(
          `Stats command received. (Feature coming soon)`,
        );
      } else if (text === "/summary") {
        await sendTelegramMessage(
          `Summary command received. (Feature coming soon)`,
        );
      } else {
        // Echo back or handle other commands
        // await sendTelegramMessage(`Received: ${text}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in Telegram webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}
