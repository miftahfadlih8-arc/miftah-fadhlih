import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/app/lib/telegram";
import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // Save to Firestore
    const newMessage = {
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
    };
    await addDoc(collection(db, "messages"), newMessage);

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
