import { readData } from "@/app/lib/data";

export const sendTelegramMessage = async (message: string) => {
  let botToken = process.env.TELEGRAM_BOT_TOKEN;
  let chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    const data = await readData();
    if (data?.settings?.telegramBotToken)
      botToken = data.settings.telegramBotToken;
    if (data?.settings?.telegramChatId) chatId = data.settings.telegramChatId;
  } catch (e) {
    console.error("Failed to read settings for telegram", e);
  }

  if (
    !botToken ||
    !chatId ||
    botToken === "your_telegram_bot_token" ||
    chatId === "your_telegram_chat_id"
  ) {
    console.warn(
      "Telegram credentials not configured or using placeholders. Skipping message.",
    );
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      if (errorText.includes("chat not found")) {
        console.warn(
          "Telegram Warning: Chat not found. Please ensure you have started a conversation with the bot and the TELEGRAM_CHAT_ID is correct.",
        );
      } else {
        console.error("Failed to send Telegram message:", errorText);
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
};
