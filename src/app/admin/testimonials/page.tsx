"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import type { Testimonial } from "@prisma/client";

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setTestimonials(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleApproval(id: string, currentlyApproved: boolean) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !currentlyApproved }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved: !currentlyApproved } : t))
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  }

  async function deleteTestimonial(id: string) {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="bg-red-950/30 border border-red-900/50 text-red-400 p-6 rounded-xl max-w-md w-full">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/admin" className="text-neutral-500 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
            </div>
            <p className="text-neutral-400">Review and approve recommendations from clients and peers.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
              {testimonials.filter((t: any) => !t.approved).length} Pending
            </span>
            <span className="text-sm text-emerald-500 bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-900/50">
              {testimonials.filter((t: any) => t.approved).length} Approved
            </span>
          </div>
        </header>

        {testimonials.length === 0 ? (
          <div className="text-center py-12 border border-neutral-800 border-dashed rounded-xl">
            <p className="text-neutral-500">No testimonials received yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`bg-neutral-900/40 border rounded-2xl p-6 transition-all duration-200 flex flex-col ${
                  testimonial.approved ? "border-neutral-800" : "border-yellow-900/30 bg-yellow-950/10"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-neutral-400">
                      {testimonial.role} {testimonial.company && `at ${testimonial.company}`}
                    </p>
                  </div>
                  {testimonial.approved ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-900/50">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-950/30 px-2.5 py-1 rounded-full border border-yellow-900/50">
                      Pending
                    </span>
                  )}
                </div>

                <div className="text-neutral-300 text-sm italic mb-6 flex-1">
                  "{testimonial.message}"
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-neutral-800/50">
                  <button
                    onClick={() => toggleApproval(testimonial.id, testimonial.approved)}
                    disabled={updating === testimonial.id}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                      testimonial.approved
                        ? "bg-neutral-800 hover:bg-neutral-700 text-white"
                        : "bg-white text-black hover:bg-neutral-200"
                    }`}
                  >
                    {updating === testimonial.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : testimonial.approved ? (
                      <>
                        <XCircle className="w-4 h-4" /> Unapprove
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" /> Approve
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    disabled={updating === testimonial.id}
                    className="flex items-center justify-center p-2 rounded-lg bg-red-950/20 text-red-400 hover:bg-red-950/50 border border-red-900/20 transition-colors disabled:opacity-50"
                  >
                    {updating === testimonial.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
