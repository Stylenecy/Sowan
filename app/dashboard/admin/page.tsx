"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield, Users, UserCheck, Sparkles, Calendar,
  TrendingUp, Activity, BookOpen, ArrowRight, RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "admin" || user?.name === "Admin";
  const [state, setState] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isAdmin) { router.push("/"); return; }
    fetch("/api/agents/status").then(r => r.json()).then(setState).catch(() => {});
  }, [isAdmin, router, refreshKey]);

  const slots = state?.elder?.available_slots || [];
  const bookings = state?.elder?.bookings || [];

  const stats = [
    { label: t.admin.totalSlot, value: slots.length, icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
    { label: t.admin.activeBooking, value: bookings.filter((b: any) => b.status === "accepted" || b.status === "confirmed").length, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: t.admin.completed, value: bookings.filter((b: any) => b.status === "completed").length, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-100" },
    { label: t.admin.totalSowan, value: bookings.length, icon: BookOpen, color: "text-amber-600", bg: "bg-amber-100" },
  ];

  return (
    <main className="min-h-screen bg-background pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow mb-1"><Shield size={12} className="inline mr-1.5" />{t.admin.badge}</p>
            <h1 className="text-display-sm">{t.admin.title}</h1>
          </div>
          <div className="flex gap-3">
              <button onClick={() => setRefreshKey(k => k + 1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50 transition-colors">
                <RefreshCw size={16} /> {t.admin.refresh}
              </button>
              <Link href="/agents">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-lg">
                  <Sparkles size={16} /> {t.admin.agentsLink} <ArrowRight size={16} />
                </button>
              </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={20} className={s.color} />
              </div>
              <p className="text-3xl font-serif font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Users Overview */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-accent" size={24} />
            <h2 className="text-xl font-serif font-bold">{t.admin.usersTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Dex", role: t.admin.customer, emoji: "🧑‍💻", route: "/dashboard/customer", color: "text-blue-600" },
              { name: "Opa Adriel", role: t.admin.mentor, emoji: "👴", route: "/dashboard/mentor", color: "text-emerald-600" },
              { name: "Admin", role: t.admin.adminPlatform, emoji: "🛡️", route: "/dashboard/admin", color: "text-amber-600" },
            ].map((u, i) => (
              <Link key={i} href={u.route} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 hover:border-accent/30 transition-colors group">
                <span className="text-3xl">{u.emoji}</span>
                <div>
                  <p className="font-semibold text-sm group-hover:text-accent transition-colors">{u.name}</p>
                  <p className={`text-xs font-medium ${u.color}`}>{u.role}</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* All Bookings */}
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-accent" size={24} />
            <h2 className="text-xl font-serif font-bold">{t.admin.allBookings}</h2>
          </div>
          {bookings.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-12">
              {t.admin.noBookings}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">{t.admin.id}</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">{t.admin.learner}</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">{t.admin.topic}</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">{t.admin.date}</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">{t.admin.time}</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">{t.admin.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice().reverse().map((b: any, i: number) => {
                    const statusColors: Record<string, string> = {
                      accepted: "text-emerald-600 bg-emerald-50",
                      countered: "text-amber-600 bg-amber-50",
                      pending: "text-gray-500 bg-gray-50",
                      confirmed: "text-blue-600 bg-blue-50",
                      completed: "text-violet-600 bg-violet-50",
                      cancelled: "text-red-600 bg-red-50",
                    };
                    const sc = statusColors[b.status] || "text-gray-500 bg-gray-50";
                    return (
                      <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{(b.id || "").slice(0, 6)}</td>
                        <td className="py-3 px-2 font-medium">{b.learnerName}</td>
                        <td className="py-3 px-2 text-muted-foreground">{b.topic}</td>
                        <td className="py-3 px-2 text-xs text-muted-foreground">{b.date}</td>
                        <td className="py-3 px-2 text-xs text-muted-foreground">{b.startTime} - {b.endTime}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${sc}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* AI Agents Summary */}
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-accent" size={24} />
            <h2 className="text-xl font-serif font-bold">{t.admin.agentsStatus}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-background/80 border border-accent/10">
              <p className="font-semibold text-accent">{t.admin.elderAgent}</p>
              <p className="text-xs text-muted-foreground mt-1">Mbah Karto — {slots.length} {t.admin.slotAvailable}, {bookings.length} {t.admin.booking}</p>
            </div>
            <div className="p-4 rounded-xl bg-background/80 border border-accent/10">
              <p className="font-semibold text-accent">{t.admin.asiOne}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.admin.dignityGuardDesc}</p>
            </div>
            <div className="p-4 rounded-xl bg-background/80 border border-accent/10">
              <p className="font-semibold text-accent">{t.admin.pendopo}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.admin.pendopoDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
