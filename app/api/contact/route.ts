import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { readData, writeData } from "@/app/lib/data";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // Save to data.json
    const dbData = await readData();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
    };
    dbData.messages = [newMessage, ...(dbData.messages || [])];
    await writeData(dbData);

    const telegramMessage = `
📩 <b>New Message from Portfolio!</b>
<b>From:</b> ${name}
<b>Email:</b> ${email}
<b>Subject:</b> ${subject || "No Subject"}

<b>Message:</b>
${message}
    `;

    await sendTelegramMessage(telegramMessage);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
