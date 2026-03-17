"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderGit2,
  MessageSquare,
  ArrowRight,
  User,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Total Visitors</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {stats?.visitors || 0}
          </div>
          <p className="text-sm text-emerald-400">+12% from last month</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Active Projects</h3>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <FolderGit2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {stats?.projects || 0}
          </div>
          <Link
            href="/admin/projects"
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-auto"
          >
            Manage projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Unread Messages</h3>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {stats?.messages || 0}
          </div>
          <Link
            href="/admin/messages"
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-auto"
          >
            View inbox <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/profile"
            className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <span className="font-medium text-slate-200">Edit Profile</span>
          </Link>

          <Link
            href="/admin/projects"
            className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="font-medium text-slate-200">Add Project</span>
          </Link>

          <Link
            href="/admin/experience"
            className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="font-medium text-slate-200">
              Update Experience
            </span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="font-medium text-slate-200">View Live Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
