import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "experiences"));
    const experiences = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return NextResponse.json(experiences);
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

    for (const exp of experiences) {
      const { id, ...rest } = exp;
      const docId = id || doc(collection(db, "experiences")).id;

      const description = Array.isArray(exp.description)
        ? exp.description
        : Array.isArray(exp.desc) // Fallback for old field name
          ? exp.desc
          : typeof exp.desc === "string"
            ? exp.desc.split("\n").map((s: string) => s.trim()).filter(Boolean)
            : [];

      await setDoc(doc(db, "experiences", docId), { ...rest, description });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experiences" },
      { status: 500 },
    );
  }
}
