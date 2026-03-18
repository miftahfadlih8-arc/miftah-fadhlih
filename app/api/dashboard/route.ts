import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, getDocs, collection, query, limit } from "firebase/firestore";

export async function GET() {
  try {
    const [profileSnap, projectsSnap, messagesSnap] = await Promise.all([
      getDoc(doc(db, "profile", "current")),
      getDocs(collection(db, "projects")),
      getDocs(collection(db, "messages"))
    ]);

    return NextResponse.json({
      visitors: 1234, // Mock for now
      projects: projectsSnap.size,
      messages: messagesSnap.size,
      profile: profileSnap.exists() ? profileSnap.data() : {},
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
