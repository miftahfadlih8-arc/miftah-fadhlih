"use client";

import { motion } from "motion/react";
import { BrainCircuit, LayoutDashboard, Code, LineChart } from "lucide-react";

const skillCategories = [
  {
    title: "Product Management",
    icon: LayoutDashboard,
    skills: [
      "Product Strategy",
      "Roadmap Development",
      "Backlog Prioritization",
      "A/B Testing",
      "Stakeholder Management",
    ],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Agile & Methodologies",
    icon: LineChart,
    skills: [
      "Scrum",
      "Kanban",
      "Cross-functional Collaboration",
      "Sprint Planning",
    ],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "AI & Technology",
    icon: BrainCircuit,
    skills: [
      "Google AI Studio",
      "Prompt Engineering",
      "LLM Implementation",
      "AI Integration",
    ],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Design & Analytics",
    icon: Code,
    skills: ["Figma", "User Research", "Data Analysis", "Problem-solving"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function Skills({ skills: initialSkills }: { skills?: any[] }) {
  const displaySkills = initialSkills || skillCategories;

  return (
    <section className="py-24 relative z-10 bg-slate-900/50" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Core <span className="text-blue-400">Competencies</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A blend of product vision, technical expertise, and design thinking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displaySkills.map((category, index) => {
            const title = category.title || category.category;
            const skills =
              category.skills ||
              (category.items ? category.items.map((i: any) => i.name) : []);
            const color = category.color || "text-blue-400";
            const bg = category.bg || "bg-blue-500/10";

            // Need to map string icon names back to Lucide components if coming from JSON
            let Icon = BrainCircuit;
            if (
              category.icon === "LayoutDashboard" ||
              category.icon?.name === "LayoutDashboard"
            )
              Icon = LayoutDashboard;
            if (
              category.icon === "LineChart" ||
              category.icon?.name === "LineChart"
            )
              Icon = LineChart;
            if (category.icon === "Code" || category.icon?.name === "Code")
              Icon = Code;
            if (
              typeof category.icon === "function" ||
              typeof category.icon === "object"
            )
              Icon = category.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${bg} ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900/50 rounded-full border border-slate-700/50 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
                    >
                      {skill}
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
