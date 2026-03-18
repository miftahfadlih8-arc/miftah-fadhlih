import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const skills = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return NextResponse.json(skills);
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

    for (const skillCat of skills) {
      const id = skillCat.category.replace(/\s+/g, '-').toLowerCase();
      const items = Array.isArray(skillCat.items)
        ? skillCat.items
        : Array.isArray(skillCat.skills) // Fallback for old field name
          ? skillCat.skills
          : [];

      await setDoc(doc(db, "skills", id), { 
        category: skillCat.category,
        items 
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 },
    );
  }
}
