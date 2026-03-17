import { NextResponse } from "next/server";
import { readData, writeData } from "@/app/lib/data";

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.skills || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const skills = await request.json();

    // Ensure skills is an array of strings
    const formattedSkills = skills.map((skillCat: any) => ({
      ...skillCat,
      skills: Array.isArray(skillCat.skills)
        ? skillCat.skills
        : typeof skillCat.skills === "string"
          ? skillCat.skills
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [],
    }));

    const data = await readData();
    data.skills = formattedSkills;
    await writeData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 },
    );
  }
}
