import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export async function GET() {
  try {
    const [profileSnap, statsSnap, experiencesSnap, projectsSnap, skillsSnap, educationSnap, certificationsSnap] = await Promise.all([
      getDoc(doc(db, "profile", "current")),
      getDoc(doc(db, "stats", "current")),
      getDocs(collection(db, "experiences")),
      getDocs(collection(db, "projects")),
      getDocs(collection(db, "skills")),
      getDocs(collection(db, "education")),
      getDocs(collection(db, "certifications"))
    ]);

    const publicData = {
      profile: profileSnap.exists() ? profileSnap.data() : {},
      stats: statsSnap.exists() ? statsSnap.data() : {},
      experiences: experiencesSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })),
      projects: projectsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })),
      skills: skillsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })),
      education: educationSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })),
      certifications: certificationsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    };

    return NextResponse.json(publicData);
  } catch (error) {
    console.error("Error fetching public data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
