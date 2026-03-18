import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "MasukDashboard234";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
