"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";

const skillSchema = z.object({
  skills: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      icon: z.string().min(1, "Icon is required"),
      skills: z.union([z.string(), z.array(z.string())]),
      color: z.string().min(1, "Color is required"),
      bg: z.string().min(1, "Background is required"),
    }),
  ),
});

type SkillData = z.infer<typeof skillSchema>;

export default function SkillsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillData>({
    resolver: zodResolver(skillSchema),
    defaultValues: { skills: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    fetch("/api/public-data")
      .then((res) => res.json())
      .then((data) => {
        reset({ skills: data.skills || [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: SkillData) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.skills),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Skills updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update skills." });
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
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-slate-400">
            Manage your core competencies and skills.
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
                  Category Title
                </label>
                <input
                  {...register(`skills.${index}.title`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
                {errors.skills?.[index]?.title && (
                  <p className="text-red-400 text-sm">
                    {errors.skills[index]?.title?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Icon Name (e.g., LayoutDashboard, Code)
                </label>
                <input
                  {...register(`skills.${index}.icon`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  defaultValue={
                    typeof field.icon === "string"
                      ? field.icon
                      : (field.icon as any)?.name || "BrainCircuit"
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">
                  Skills (comma separated)
                </label>
                <input
                  {...register(`skills.${index}.skills`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, Tailwind CSS"
                  defaultValue={
                    Array.isArray(field.skills)
                      ? field.skills.join(", ")
                      : field.skills
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Text Color Class (e.g., text-blue-400)
                </label>
                <input
                  {...register(`skills.${index}.color`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Background Class (e.g., bg-blue-500/10)
                </label>
                <input
                  {...register(`skills.${index}.bg`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              icon: "BrainCircuit",
              skills: [],
              color: "text-blue-400",
              bg: "bg-blue-500/10",
            })
          }
          className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-slate-400 hover:text-slate-300 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Skill Category
        </button>
      </div>
    </div>
  );
}
