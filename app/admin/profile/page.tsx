"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save, Loader2 } from "lucide-react";

type ProfileData = {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  photo: string;
  social: {
    linkedin: string;
    github: string;
    telegram: string;
  };
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>();

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to load profile data" });
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: ProfileData) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile" });
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
        <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-400 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Role / Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-400 text-xs">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Bio / Summary
            </label>
            <textarea
              {...register("summary")}
              rows={4}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Profile Photo
            </label>
            <div className="flex items-center gap-4">
              <input
                {...register("photo")}
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                placeholder="https://... or upload a file"
              />
              <label className="cursor-pointer px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                Upload
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();
                      if (data.success) {
                        setValue("photo", data.url);
                        setMessage({
                          type: "success",
                          text: "Photo uploaded successfully!",
                        });
                      } else {
                        setMessage({
                          type: "error",
                          text: "Failed to upload photo",
                        });
                      }
                    } catch (err) {
                      console.error(err);
                      setMessage({
                        type: "error",
                        text: "An error occurred while uploading",
                      });
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Phone
              </label>
              <input
                {...register("phone")}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-300">
                Location
              </label>
              <input
                {...register("location")}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
          <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
            Social Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                LinkedIn URL
              </label>
              <input
                {...register("social.linkedin")}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                GitHub URL
              </label>
              <input
                {...register("social.github")}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Telegram URL
              </label>
              <input
                {...register("social.telegram")}
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
