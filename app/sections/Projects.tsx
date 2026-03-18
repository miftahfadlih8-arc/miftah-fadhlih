"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, Code2 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "QB POS - Enterprise Merchant System",
    role: "AI Engineer & Full-Stack Developer",
    desc: "Comprehensive POS system with sales tracking, inventory management, and multi-outlet support.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "#",
    github: "#",
    thumbnail: "https://picsum.photos/seed/qbpos/800/600",
    color: "from-blue-500/10 to-transparent",
  },
  {
    title: "AI-Powered Web Applications",
    role: "AI Engineer",
    desc: "Intelligent applications using Google AI Studio for enhanced UX and business automation.",
    tech: ["Google AI Studio", "LLM", "Next.js", "TypeScript"],
    link: "#",
    github: "#",
    thumbnail: "https://picsum.photos/seed/aiweb/800/600",
    color: "from-cyan-500/10 to-transparent",
  },
  {
    title: "SPARC.HR / Muscle First",
    role: "Full Stack Developer",
    desc: "10-module HR system (Dashboard, Absensi, Payroll, Recruitment, KPI, AI Agent, etc).",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    link: "#",
    github: "#",
    thumbnail: "https://picsum.photos/seed/hr/800/600",
    color: "from-amber-500/10 to-transparent",
  },
];

export default function Projects({
  projects: initialProjects,
}: {
  projects?: any[];
}) {
  const displayProjects = initialProjects || projects;

  return (
    <section className="py-24 relative z-10" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, index) => {
            const title = project.title || project.name;
            const desc = project.desc || project.description;
            const tech = project.tech || project.techStack || [];
            const link = project.link || project.liveUrl || "#";
            const github = project.github || project.githubUrl || "#";
            const thumbnail = project.thumbnail;
            const color = project.color || "from-blue-500/10 to-transparent";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/80 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {thumbnail && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                )}

                <div className="relative z-10 p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-700/50 text-blue-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={github}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={link}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm font-medium text-amber-400/80 mb-4">
                    {project.role}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div className="relative z-10 p-6 flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                  {tech.map((techItem: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-900/50 rounded-md border border-slate-700/50"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
