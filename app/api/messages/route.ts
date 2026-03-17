import { NextResponse } from "next/server";
import { readData } from "@/app/lib/data";

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.messages || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
