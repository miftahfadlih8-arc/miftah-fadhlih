import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const q = query(collection(db, "messages"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
