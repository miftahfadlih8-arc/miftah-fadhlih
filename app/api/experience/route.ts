import { NextResponse } from "next/server";
import { readData, writeData } from "@/app/lib/data";

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.experiences || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const experiences = await request.json();

    // Ensure desc is an array of strings
    const formattedExperiences = experiences.map((exp: any) => ({
      ...exp,
      desc: Array.isArray(exp.desc)
        ? exp.desc
        : typeof exp.desc === "string"
          ? exp.desc.split("\n").filter((s: string) => s.trim())
          : [],
    }));

    const data = await readData();
    data.experiences = formattedExperiences;
    await writeData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experiences" },
      { status: 500 },
    );
  }
}
