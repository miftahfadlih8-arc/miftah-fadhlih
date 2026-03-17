import { NextResponse } from "next/server";
import { readData, writeData } from "@/app/lib/data";

export async function GET() {
  const data = readData();
  if (!data)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  return NextResponse.json(data.profile);
}

export async function PUT(request: Request) {
  try {
    const profileUpdates = await request.json();
    const data = readData();

    if (!data)
      return NextResponse.json(
        { error: "Failed to load data" },
        { status: 500 },
      );

    data.profile = { ...data.profile, ...profileUpdates };

    if (writeData(data)) {
      return NextResponse.json({ success: true, profile: data.profile });
    } else {
      return NextResponse.json(
        { error: "Failed to save data" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
