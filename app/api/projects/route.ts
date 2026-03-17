import { NextResponse } from "next/server";
import { readData, writeData } from "@/app/lib/data";

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.projects || []);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const projects = await request.json();

    // Ensure tech is an array of strings
    const formattedProjects = projects.map((proj: any) => ({
      ...proj,
      tech: Array.isArray(proj.tech)
        ? proj.tech
        : typeof proj.tech === "string"
          ? proj.tech
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [],
    }));

    const data = await readData();
    data.projects = formattedProjects;
    await writeData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update projects" },
      { status: 500 },
    );
  }
}
