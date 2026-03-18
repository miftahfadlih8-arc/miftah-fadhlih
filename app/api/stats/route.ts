import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function GET() {
  try {
    const docRef = doc(db, "stats", "current");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({ error: "Stats not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const statsUpdates = await request.json();
    const docRef = doc(db, "stats", "current");
    await setDoc(docRef, statsUpdates, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
