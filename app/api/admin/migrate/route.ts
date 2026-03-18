import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { readData } from "@/app/lib/data";

export async function POST() {
  try {
    const data = readData();
    if (!data) {
      return NextResponse.json({ error: "Failed to read data.json" }, { status: 500 });
    }

    // Migrate Profile
    await setDoc(doc(db, "profile", "current"), data.profile);

    // Migrate Experiences
    for (const exp of data.experiences) {
      await setDoc(doc(db, "experiences", exp.id), exp);
    }

    // Migrate Projects
    for (const proj of data.projects) {
      await setDoc(doc(db, "projects", proj.id), proj);
    }

    // Migrate Stats
    await setDoc(doc(db, "stats", "current"), data.stats);

    // Migrate Skills
    for (const skill of data.skills) {
      // Use category as ID for skills
      await setDoc(doc(db, "skills", skill.category.replace(/\s+/g, '-').toLowerCase()), skill);
    }

    // Migrate Settings
    await setDoc(doc(db, "settings", "current"), data.settings);

    // Migrate Education
    if (data.education) {
      for (const edu of data.education) {
        await setDoc(doc(db, "education", edu.id), edu);
      }
    }

    // Migrate Certifications
    if (data.certifications) {
      for (const cert of data.certifications) {
        await setDoc(doc(db, "certifications", cert.id), cert);
      }
    }

    // Migrate Messages
    for (const msg of data.messages) {
      await setDoc(doc(db, "messages", msg.id), msg);
    }

    return NextResponse.json({ success: true, message: "Migration completed" });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}
