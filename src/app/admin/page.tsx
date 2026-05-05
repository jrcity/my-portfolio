"use client";

import { useEffect, useState } from "react";
import { AdminConversationsResponse, ConversationWithMessages } from "@/types/admin";

export default function AdminDashboard() {
  const [data, setData] = useState<AdminConversationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/conversations");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-neutral-600 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-neutral-400">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="bg-red-950/30 border border-red-900/50 text-red-400 p-6 rounded-xl max-w-md w-full">
          <h2 className="text-lg font-semibold mb-2">Error Loading Data</h2>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-neutral-400 mt-1">Internal view of visitor AI conversations.</p>
          </div>
          <div className="text-sm text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
            Protected Area
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Conversations" value={data.stats.totalConversations} />
          <StatCard title="Total Messages" value={data.stats.totalMessages} />
          <StatCard title="Conversations Today" value={data.stats.conversationsToday} />
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Recent Conversations</h2>
            <span className="text-xs font-mono text-neutral-500">{data.conversations.length} records</span>
          </div>

          {data.conversations.length === 0 ? (
            <div className="text-center py-12 border border-neutral-800 border-dashed rounded-xl">
              <p className="text-neutral-500">No conversations found yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.conversations.map((conv) => (
                <ConversationItem 
                  key={conv.id} 
                  conv={conv} 
                  isExpanded={expandedId === conv.id}
                  onToggle={() => setExpandedId(expandedId === conv.id ? null : conv.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl hover:bg-neutral-900 transition-colors">
      <h3 className="text-neutral-400 text-sm font-medium">{title}</h3>
      <p className="text-4xl font-bold mt-2 tracking-tight">{value}</p>
    </div>
  );
}

function ConversationItem({ conv, isExpanded, onToggle }: { conv: ConversationWithMessages; isExpanded: boolean; onToggle: () => void }) {
  const firstUserMessage = conv.messages.find(m => m.role === 'user')?.content || "No user messages";
  const dateStr = new Date(conv.createdAt).toLocaleString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-200">
      {/* Header (Clickable) */}
      <button 
        onClick={onToggle}
        className="w-full text-left p-4 hover:bg-neutral-800/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-md border border-neutral-700">
              {conv.sessionId.slice(0, 8)}...
            </span>
            <span className="text-xs text-neutral-400 font-medium">{dateStr}</span>
            <span className="text-xs text-emerald-400/90 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded-full font-medium">
              {conv.messages.length} msgs
            </span>
          </div>
          <p className="text-sm text-neutral-300 truncate pr-4">
            {firstUserMessage}
          </p>
        </div>
        <div className="text-xs font-medium text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800 flex-shrink-0">
          {isExpanded ? "Close Thread" : "View Thread"}
        </div>
      </button>

      {/* Expanded Thread */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950 space-y-6 max-h-[600px] overflow-y-auto">
          {conv.messages.length === 0 ? (
            <p className="text-neutral-500 text-sm text-center">No messages in this thread.</p>
          ) : (
            conv.messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 mb-1.5 px-1 font-semibold">
                  {msg.role}
                </span>
                <div 
                  className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600/90 text-white rounded-tr-sm' 
                      : 'bg-neutral-800 text-neutral-200 rounded-tl-sm border border-neutral-700/50'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
