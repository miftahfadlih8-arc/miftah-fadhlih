import { NextResponse } from "next/server";
import { readData } from "@/app/lib/data";

export async function GET() {
  const data = readData();

  if (!data) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }

  return NextResponse.json({
    visitors: 1234, // Mock for now, could integrate with real analytics
    projects: data.projects?.length || 0,
    messages: data.messages?.length || 0,
    profile: data.profile,
  });
}
