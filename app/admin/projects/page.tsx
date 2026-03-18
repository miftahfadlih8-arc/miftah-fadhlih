"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";

const projectSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      role: z.string().min(1, "Role is required"),
      desc: z.string().min(1, "Description is required"),
      tech: z.union([z.string(), z.array(z.string())]),
      link: z.string(),
      github: z.string(),
      thumbnail: z.string().optional(),
      color: z.string().min(1, "Color is required"),
    }),
  ),
});

type ProjectData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { projects: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    fetch("/api/public-data")
      .then((res) => res.json())
      .then((data) => {
        reset({ projects: data.projects || [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: ProjectData) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.projects),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Projects updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update projects." });
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
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-400">
            Manage your featured projects portfolio.
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
                  Title
                </label>
                <input
                  {...register(`projects.${index}.title`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
                {errors.projects?.[index]?.title && (
                  <p className="text-red-400 text-sm">
                    {errors.projects[index]?.title?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Role
                </label>
                <input
                  {...register(`projects.${index}.role`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Live Link
                </label>
                <input
                  {...register(`projects.${index}.link`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  GitHub Link
                </label>
                <input
                  {...register(`projects.${index}.github`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">
                  Thumbnail URL
                </label>
                <input
                  {...register(`projects.${index}.thumbnail`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  {...register(`projects.${index}.desc`)}
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Tech Stack (comma separated)
                </label>
                <input
                  {...register(`projects.${index}.tech`)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Node.js, Tailwind CSS"
                  defaultValue={
                    Array.isArray(field.tech)
                      ? field.tech.join(", ")
                      : field.tech
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Color Gradient (e.g., from-blue-500/10 to-transparent)
                </label>
                <input
                  {...register(`projects.${index}.color`)}
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
              role: "",
              desc: "",
              tech: [],
              link: "#",
              github: "#",
              thumbnail: "",
              color: "from-blue-500/10 to-transparent",
            })
          }
          className="w-full py-4 border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-slate-400 hover:text-slate-300 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>
    </div>
  );
}
