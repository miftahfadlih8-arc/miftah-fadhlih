"use client";

import { motion } from "motion/react";
import {
  Users,
  TrendingUp,
  Bell,
  ListTodo,
  MousePointerClick,
} from "lucide-react";
import { useEffect, useState } from "react";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl font-display font-bold text-white">
      +{count}
      {suffix}
    </span>
  );
}

export default function Achievements({ stats }: { stats?: any }) {
  const activeUsers = stats?.activeUsers || 40;
  const revenueGrowth = stats?.revenueGrowth || 25;
  const userEngagement = stats?.userEngagement || 20;
  const backlogReduction = stats?.backlogReduction || 30;
  const usabilityScore = stats?.usabilityScore || 35;

  const achievements = [
    {
      icon: Users,
      metric: activeUsers,
      suffix: "%",
      title: "Active Users",
      desc: `Launched mobile wallet feature achieving ${activeUsers}% increase in active users within 3 months`,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      icon: TrendingUp,
      metric: revenueGrowth,
      suffix: "%",
      title: "Revenue Growth",
      desc: `Led new loan product development resulting in ${revenueGrowth}% revenue increase in Q1`,
      color: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-400",
    },
    {
      icon: Bell,
      metric: userEngagement,
      suffix: "%",
      title: "User Engagement",
      desc: `Optimized push notification strategy increasing user engagement by ${userEngagement}%`,
      color: "from-cyan-500/20 to-cyan-500/5",
      iconColor: "text-cyan-400",
    },
    {
      icon: ListTodo,
      metric: backlogReduction,
      suffix: "%",
      title: "Backlog Reduction",
      desc: `Implemented Agile best practices improving sprint efficiency and reducing backlog by ${backlogReduction}%`,
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
    },
    {
      icon: MousePointerClick,
      metric: usabilityScore,
      suffix: "%",
      title: "Usability Score",
      desc: `Designed UI improvements that increased usability scores by ${usabilityScore}%`,
      color: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <section className="py-24 relative z-10" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Summary & <span className="text-blue-400">Impact</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            Product Manager with 4+ years Fintech experience (1 year UX Research
            + 3 years leading product development). Track record: +30% user
            engagement, +25% revenue, 10,000+ app downloads in first month.
            Currently expanding as AI Engineer, developing AI-powered solutions
            using Google AI Studio and modern web technologies. Expert in Agile
            methodologies, cross-functional leadership, and data-driven decision
            making.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 hover:border-slate-600 transition-colors group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 ${item.iconColor}`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <Counter value={item.metric} suffix={item.suffix} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
