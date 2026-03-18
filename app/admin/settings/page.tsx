"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Loader2, Settings, Globe, Bell, Send } from "lucide-react";

const settingsSchema = z.object({
  seoTitle: z.string().min(1, "SEO Title is required"),
  seoDescription: z.string().min(1, "SEO Description is required"),
  gaId: z.string().optional(),
  telegramBotToken: z.string().optional(),
  telegramChatId: z.string().optional(),
  geminiApiKey: z.string().optional(),
});

type SettingsData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingWebhook, setSettingWebhook] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        reset(
          data || {
            seoTitle: "Miftah Fadhlih | Portfolio",
            seoDescription:
              "Portfolio of Miftah Fadhlih, AI Engineer & Product Manager.",
            gaId: "",
            telegramBotToken: "",
            telegramChatId: "",
            geminiApiKey: "",
          },
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: SettingsData) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Settings updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update settings." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const setWebhook = async () => {
    setSettingWebhook(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch("/api/telegram/setup", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Telegram Webhook set successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to set webhook." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while setting webhook." });
    } finally {
      setSettingWebhook(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
          <p className="text-slate-400">
            Configure SEO, analytics, and integrations.
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-8 ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* SEO Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/80 flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">
              SEO & Meta Tags
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Site Title
              </label>
              <input
                {...register("seoTitle")}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              {errors.seoTitle && (
                <p className="text-red-400 text-sm">
                  {errors.seoTitle.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Meta Description
              </label>
              <textarea
                {...register("seoDescription")}
                rows={3}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              {errors.seoDescription && (
                <p className="text-red-400 text-sm">
                  {errors.seoDescription.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/80 flex items-center gap-3">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-white">Integrations</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Google Analytics ID (Optional)
              </label>
              <input
                {...register("gaId")}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Telegram Bot Token (Optional)
              </label>
              <input
                {...register("telegramBotToken")}
                type="password"
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Telegram Chat ID (Optional)
              </label>
              <input
                {...register("telegramChatId")}
                placeholder="-1001234567890"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Gemini API Key (Optional)
              </label>
              <input
                {...register("geminiApiKey")}
                type="password"
                placeholder="AIzaSy..."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={setWebhook}
                disabled={settingWebhook}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {settingWebhook ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Set Telegram Webhook
              </button>
              <p className="mt-2 text-xs text-slate-500">
                Click this after saving your Bot Token to connect the bot to
                this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
