"use client";

import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "AI Engineer",
    company: "Freelance / Personal Projects",
    date: "Jan 2025 - Present",
    desc: [
      "Developing AI-powered web applications using Google AI Studio and modern LLM technologies",
      "Building and deploying ML models for practical business applications and process automation",
    ],
    color: "border-blue-500",
  },
  {
    role: "Product Manager",
    company: "PT Indo Fin Tek (Dompet Kilat)",
    date: "Jan 2022 - Dec 2024",
    desc: [
      "Led end-to-end product development, achieving +30% user engagement through data-driven optimization",
      "Defined and executed product roadmap with engineering, design, and business teams",
      "Implemented Agile/Scrum workflows, improving sprint efficiency and reducing backlog by 30%",
      "Managed stakeholder communications and presented product updates to executive leadership",
    ],
    color: "border-amber-500",
  },
  {
    role: "UX Researcher",
    company: "PT Indo Fin Tek (Dompet Kilat)",
    date: "Jan 2021 - Dec 2021",
    desc: [
      "Created high-fidelity designs and prototypes using Figma, reducing dev iteration cycles by 25%",
      "Designed UIs that improved usability scores by 35% while maintaining brand consistency",
      "Conducted user research (interviews, surveys, usability testing) to influence product design",
    ],
    color: "border-cyan-500",
  },
  {
    role: "Product Manager (Project-Based)",
    company: "PT Asia Pelangi Remiten (Action Pay)",
    date: "2022",
    desc: [
      "Led development and launch of remittance app, achieving 10,000+ downloads in first month",
      "Designed and tested prototypes, launching improved UI that reduced user drop-off by 25%",
    ],
    color: "border-emerald-500",
  },
];

export default function Experience({
  experiences: initialExperiences,
}: {
  experiences?: any[];
}) {
  const displayExperiences = initialExperiences || experiences;

  return (
    <section className="py-24 relative z-10 bg-slate-900/50" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Professional <span className="text-blue-400">Experience</span>
          </h2>
        </motion.div>

        <div className="relative border-l border-slate-700 ml-3 md:ml-6 space-y-12">
          {displayExperiences.map((exp, index) => {
            const desc = exp.desc || exp.description || [];
            const date =
              exp.date ||
              (exp.startDate
                ? `${exp.startDate} - ${exp.endDate || "Present"}`
                : "");
            const color = exp.color || "border-blue-500";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900 border-2 ${color}`}
                />

                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700/50 w-fit">
                      <Calendar className="w-4 h-4" />
                      {date}
                    </div>
                  </div>

                  <ul className="space-y-3 mt-6">
                    {desc.map((item: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
