"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Mail, Clock } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageStatus, setMessageStatus] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        setMessageStatus({
          type: "success",
          text: "Message deleted successfully.",
        });
      } else {
        setMessageStatus({ type: "error", text: "Failed to delete message." });
      }
    } catch (error) {
      setMessageStatus({ type: "error", text: "An error occurred." });
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-slate-400">
          View and manage contact form submissions.
        </p>
      </div>

      {messageStatus.text && (
        <div
          className={`p-4 rounded-lg mb-8 ${messageStatus.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
        >
          {messageStatus.text}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <Mail className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            No messages yet
          </h3>
          <p className="text-slate-400">
            When someone contacts you, their message will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {msg.subject || "No Subject"}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                    <span className="font-medium text-slate-300">
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {msg.email}
                    </a>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.date).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-slate-300 whitespace-pre-wrap">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
