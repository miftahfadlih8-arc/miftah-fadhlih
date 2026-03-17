"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save, Loader2 } from "lucide-react";

type StatsData = {
  activeUsers: number;
  revenueGrowth: number;
  userEngagement: number;
  backlogReduction: number;
  usabilityScore: number;
};

export default function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StatsData>();

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to load stats data" });
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: StatsData) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    // Convert strings to numbers
    const formattedData = {
      activeUsers: Number(data.activeUsers),
      revenueGrowth: Number(data.revenueGrowth),
      userEngagement: Number(data.userEngagement),
      backlogReduction: Number(data.backlogReduction),
      usabilityScore: Number(data.usabilityScore),
    };

    try {
      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Stats updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update stats" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while saving" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Edit Achievements & Stats
        </h1>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
            Hero Section Metrics (%)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Active Users Increase (%)
              </label>
              <input
                {...register("activeUsers", { required: "Required", min: 0 })}
                type="number"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Revenue Growth (%)
              </label>
              <input
                {...register("revenueGrowth", { required: "Required", min: 0 })}
                type="number"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                User Engagement Increase (%)
              </label>
              <input
                {...register("userEngagement", {
                  required: "Required",
                  min: 0,
                })}
                type="number"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Backlog Reduction (%)
              </label>
              <input
                {...register("backlogReduction", {
                  required: "Required",
                  min: 0,
                })}
                type="number"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Usability Score Increase (%)
              </label>
              <input
                {...register("usabilityScore", {
                  required: "Required",
                  min: 0,
                })}
                type="number"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
