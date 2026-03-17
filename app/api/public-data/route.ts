import { NextResponse } from "next/server";
import { readData } from "@/app/lib/data";

export async function GET() {
  const data = readData();
  if (!data)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });

  // Don't send messages or settings to the public API
  const { messages, settings, ...publicData } = data;
  return NextResponse.json(publicData);
}
