"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail, MapPin, Phone, Github, Linkedin, Download } from "lucide-react";
import Image from "next/image";

export default function Hero({ profile }: { profile?: any }) {
  const name = profile?.name || "Miftah Fadhlih";
  const title =
    profile?.title || "Product Manager | Project Manager | AI Engineer";
  const location = profile?.location || "Rawalumbu, Bekasi, Indonesia";
  const email = profile?.email || "miftahfadlih8@gmail.com";
  const phone = profile?.phone || "(+62)877-7808-8578";
  const photo = profile?.photo || "https://picsum.photos/seed/miftah/800/800";
  const linkedin = profile?.social?.linkedin || "https://linkedin.com/in/miftahfadhlih";
  const github = profile?.social?.github || "https://github.com/miftahfadhlih";
  const pitch = profile?.pitch || "Bridging the gap between business strategy and AI technology to build scalable, user-centric products that drive measurable impact.";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-blue-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new opportunities
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {name}
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-slate-300 font-medium mb-4">
            {title}
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mb-8 leading-relaxed">
            {pitch}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              {location}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              {email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              {phone}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors border border-slate-700"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Decorative circles */}
            <div className="absolute inset-0 rounded-full border border-slate-700/50 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-blue-500/20 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Profile Image Placeholder */}
            <div className="absolute inset-8 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700">
              <Image
                src={photo}
                alt={name}
                fill
                className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
