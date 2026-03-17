import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/app/lib/telegram";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { timestamp, ip, location, device, browser, referrer, page } = data;

    const message = `
👤 <b>Portfolio Visited</b>
📍 Location: ${location || "Unknown"}
💻 Device: ${device || "Unknown"} - ${browser || "Unknown"}
⏰ Time: ${new Date(timestamp).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB
🔗 Page: ${page || "Unknown"}
🌐 IP: ${ip || "Unknown"}
${referrer ? `🔙 Referrer: ${referrer}` : ""}
    `;

    await sendTelegramMessage(message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json(
      { error: "Failed to track visitor" },
      { status: 500 },
    );
  }
}
