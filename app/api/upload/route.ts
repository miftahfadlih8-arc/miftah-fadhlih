import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.name.replace(/\.[^/.]+$/, "") +
      "-" +
      uniqueSuffix +
      path.extname(file.name);

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), "public");
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }
    const filepath = path.join(publicDir, filename);

    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      url: `/${filename}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
