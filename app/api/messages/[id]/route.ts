import { NextResponse } from "next/server";
import { readData, writeData } from "@/app/lib/data";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    const data = await readData();

    if (!data.messages) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }

    const newMessages = data.messages.filter((m: any) => m.id !== id);
    data.messages = newMessages;
    await writeData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
