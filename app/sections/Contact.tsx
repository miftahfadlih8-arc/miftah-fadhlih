"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, MapPin, Phone, CheckCircle2, Loader2, Linkedin, Github } from "lucide-react";

export default function Contact({ profile }: { profile?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const email = profile?.email || "miftahfadlih8@gmail.com";
  const phone = profile?.phone || "+6287778088578";
  const location = profile?.location || "Rawalumbu, Bekasi, Indonesia";
  const linkedin = profile?.social?.linkedin || "https://linkedin.com/in/miftahfadhlih";
  const github = profile?.social?.github || "https://github.com/miftahfadhlih";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-24 relative z-10 bg-slate-900/50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free
            to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-lg font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Phone</p>
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="text-lg font-medium text-white hover:text-cyan-400 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Location</p>
                    <p className="text-lg font-medium text-white">{location}</p>
                  </div>
                </div>

                {linkedin && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-600/10 text-blue-500 shrink-0">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">LinkedIn</p>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-white hover:text-blue-500 transition-colors"
                      >
                        Miftah Fadhlih
                      </a>
                    </div>
                  </div>
                )}

                {github && (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-slate-400/10 text-slate-300 shrink-0">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">GitHub</p>
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-white hover:text-slate-300 transition-colors"
                      >
                        miftahfadhlih
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-slate-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  placeholder="Project Discussion"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center mt-4">
                  Failed to send message. Please try again or email directly.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
