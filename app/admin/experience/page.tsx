"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Plus, Trash2, Loader2, GripVertical } from "lucide-react";

const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      role: z.string().min(1, "Role is required"),
      company: z.string().min(1, "Company is required"),
      date: z.string().min(1, "Date is required"),
      desc: z.union([z.string(), z.array(z.string())]),
      color: z.string().min(1, "Color is required"),
    }),
  ),
});

type ExperienceData = z.infer<typeof experienceSchema>;

export default function ExperiencePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { experiences: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    fetch("/api/public-data")
      .then((res) => res.json())
      .then((data) => {
        reset({ experiences: data.experiences || [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: ExperienceData) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // In a real app, we would have a specific endpoint for this
      // For now, we'll update the whole data.json via a new endpoint or existing one
      const res = await fetch("/api/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.experiences),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Experience updated successfully!",
        });
      } else {
        setMessage({ type: "error", text: "Failed to update experience." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setSaving(false);
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
          <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
          <p className="text-slate-400">
            Manage your professional experience timeline.
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

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl relative group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Role
                </label>
                <input
                  {...register(`experiences.${index}.role`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
                {errors.experiences?.[index]?.role && (
                  <p className="text-red-400 text-sm">
                    {errors.experiences[index]?.role?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Company
                </label>
                <input
                  {...register(`experiences.${index}.company`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Date (e.g., Jan 2025 - Present)
                </label>
                <input
                  {...register(`experiences.${index}.date`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Color Class (e.g., border-blue-500)
                </label>
                <input
                  {...register(`experiences.${index}.color`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Description Points (one per line)
              </label>
              <textarea
                {...register(`experiences.${index}.desc`)}
                rows={4}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Led end-to-end product development...&#10;Defined and executed product roadmap..."
                defaultValue={
                  Array.isArray(field.desc) ? field.desc.join("\n") : field.desc
                }
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              role: "",
              company: "",
              date: "",
              desc: [],
              color: "border-blue-500",
            })
          }
          className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-slate-400 hover:text-slate-300 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>
    </div>
  );
}
