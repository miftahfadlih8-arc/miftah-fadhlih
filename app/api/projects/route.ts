import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, setDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    return NextResponse.json(projects);
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

    // In Firestore, we usually update individual documents, but for simplicity
    // we can overwrite the collection if needed, or just update the ones provided.
    // Here we'll assume the request sends the full list of projects to sync.
    
    for (const proj of projects) {
      const { id, ...rest } = proj;
      const docId = id || doc(collection(db, "projects")).id;
      
      const techStack = Array.isArray(proj.techStack)
        ? proj.techStack
        : typeof proj.techStack === "string"
          ? proj.techStack
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : Array.isArray(proj.tech) // Fallback for old field name
            ? proj.tech
            : typeof proj.tech === "string"
              ? proj.tech.split(",").map((s: string) => s.trim()).filter(Boolean)
              : [];

      await setDoc(doc(db, "projects", docId), { ...rest, techStack });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update projects" },
      { status: 500 },
    );
  }
}
