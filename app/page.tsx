"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Achievements from "./sections/Achievements";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import ChatWidget from "./components/ChatWidget";
import { useVisitorTracker } from "./hooks/useVisitorTracker";

import data from "../data.json";

export default function Home() {
  useVisitorTracker();
  const [siteData, setSiteData] = useState<any>(data);

  useEffect(() => {
    fetch("/api/public-data")
      .then((res) => res.json())
      .then(setSiteData)
      .catch(console.error);
  }, []);

  if (!siteData) return null; // Should not happen now with initial state

  return (
    <main className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />

      <div className="relative">
        {/* Global Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
        </div>

        <Hero profile={siteData.profile} />
        <Achievements stats={siteData.stats} />
        <Experience experiences={siteData.experiences} />
        <Projects projects={siteData.projects} />
        <Skills skills={siteData.skills} />
        <Education />
        <Contact profile={siteData.profile} />
      </div>

      <ChatWidget />

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800 relative z-10 bg-slate-900">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="/admin/login"
            className="hover:text-slate-400 transition-colors"
          >
            {siteData.profile?.name || "Miftah Fadhlih"}
          </a>
        </p>
      </footer>
    </main>
  );
}
