"use client";

import { motion } from "motion/react";
import { GraduationCap, Award } from "lucide-react";

interface EducationProps {
  education?: any[];
  certifications?: any[];
}

export default function Education({ education, certifications }: EducationProps) {
  return (
    <section className="py-24 relative z-10" id="education">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">
                Education
              </h2>
            </div>

            <div className="space-y-4">
              {education?.map((edu) => (
                <div key={edu.id} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-400 font-medium mb-4">
                    {edu.institution}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700/50 text-sm text-slate-300">
                    Class of {edu.year}
                  </div>
                </div>
              ))}
              {(!education || education.length === 0) && (
                <p className="text-slate-500 italic">No education records found.</p>
              )}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {certifications?.map((cert) => (
                <div key={cert.id} className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 flex items-start gap-4 group hover:bg-slate-800/50 transition-colors">
                  <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{cert.issuer}</p>
                  </div>
                </div>
              ))}
              {(!certifications || certifications.length === 0) && (
                <p className="text-slate-500 italic">No certifications found.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
