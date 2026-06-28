"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Handshake, History, School, UserCircle, Calendar, Clock,
  ArrowRight, RotateCcw, Loader2, Plus, X, Check, UserCog,
  BookOpen, Sparkles, MessageSquare, Eye,
} from "lucide-react";

type Tab = "sowan" | "elder";

interface Slot { date: string; start_time: string; end_time: string; label?: string }
interface Booking {
  id: string; learnerName: string; topic: string;
  date: string; startTime: string; endTime: string;
  status: "pending" | "accepted" | "countered" | "confirmed" | "completed" | "cancelled";
  elderReply: string; timestamp: string;
}
interface AgentState {
  elder: {
    name: string; bio: string;
    available_slots: Slot[]; booked_slots: Slot[];
    bookings: Booking[];
    pending_count: number; history_count: number;
  };
  negotiationLog: any[];
}

export default function AgentsPage() {
  const [tab, setTab] = useState<Tab>("sowan");
  const [state, setState] = useState<AgentState | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; color: string } | null>(null);

  // Elder form
  const [elderName, setElderName] = useState("Mbah Karto");
  const [elderBio, setElderBio] = useState("Sesepuh Karawitan — 30 tahun pengajar gamelan");
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotLabel, setNewSlotLabel] = useState("Pagi");

  // Booking form
  const [learnerName, setLearnerName] = useState("Dex");
  const [topic, setTopic] = useState("Belajar Gamelan");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");

  const showToast = useCallback((msg: string, color = "#1a1c1a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const LS_KEY = "sowan_agents_state";

  const saveLocal = useCallback((s: AgentState) => {
    setState(s);
    try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
  }, []);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch("/api/agents/status");
      const data = await res.json();
      saveLocal(data);
    } catch {
      try {
        const cached = localStorage.getItem(LS_KEY);
        if (cached) setState(JSON.parse(cached));
      } catch {}
    }
  }, [saveLocal]);

  useEffect(() => { fetchState(); const i = setInterval(fetchState, 8000); return () => clearInterval(i); }, [fetchState]);
  useEffect(() => { const d = new Date(); setNewSlotDate(d.toISOString().split("T")[0]); setBookDate(d.toISOString().split("T")[0]); }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDate || !bookTime) { showToast("Pilih tanggal dan jam dulu", "#dc2626"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/agents/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learner_name: learnerName, topic, date: bookDate, start_time: bookTime }),
      });
      const result = await res.json();
      if (result.state) saveLocal(result.state);
      const msg = result.status === "accepted" ? "Pintu dibuka! Sesi diterima!" : result.status === "countered" ? "Alternatif ditawarkan" : "Belum ada kecocokan";
      showToast(msg, result.status === "accepted" ? "#16a34a" : result.status === "countered" ? "#b8863c" : "#dc2626");
    } catch { showToast("Gagal, coba lagi", "#dc2626"); }
    setLoading(false);
  };

  const handleAddSlot = async () => {
    if (!newSlotDate || !newSlotTime) { showToast("Pilih tanggal dan jam", "#dc2626"); return; }
    try {
      const res = await fetch("/api/agents/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", date: newSlotDate, start_time: newSlotTime, label: newSlotLabel }),
      });
      const result = await res.json();
      if (result.state) saveLocal(result.state);
      showToast("Slot ditambahkan", "#16a34a");
    } catch { showToast("Gagal", "#dc2626"); }
  };

  const handleRemoveSlot = async (date: string, time: string) => {
    try {
      const res = await fetch("/api/agents/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", date, start_time: time }),
      });
      const result = await res.json();
      if (result.state) saveLocal(result.state);
      showToast("Slot dihapus", "#1a1c1a");
    } catch { showToast("Gagal", "#dc2626"); }
  };

  const handleBookingAction = async (bookingId: string, action: "complete" | "cancel") => {
    try {
      const res = await fetch("/api/agents/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, booking_id: bookingId }),
      });
      const result = await res.json();
      if (result.state) saveLocal(result.state);
      showToast(action === "complete" ? "Sesi selesai" : "Booking dibatalkan", action === "complete" ? "#16a34a" : "#dc2626");
    } catch { showToast("Gagal", "#dc2626"); }
  };

  const handleReset = async () => {
    await fetch("/api/agents/reset", { method: "POST" });
    try { localStorage.removeItem(LS_KEY); } catch {}
    await fetchState();
    showToast("Pendopo direset", "#504538");
  };

  const slots = state?.elder?.available_slots || [];
  const bookings = state?.elder?.bookings || [];
  const logs = state?.negotiationLog || [];

  const formatDate = (d: string) => {
    try { return new Date(d + "T00:00:00").toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }); }
    catch { return d; }
  };

  const badgeStyles: Record<string, { label: string; color: string }> = {
    accepted: { label: "Diterima", color: "#16a34a" },
    countered: { label: "Alternatif", color: "#b8863c" },
    pending: { label: "Pending", color: "#636363" },
    confirmed: { label: "Dikonfirmasi", color: "#2563eb" },
    completed: { label: "Selesai", color: "#6b7280" },
    cancelled: { label: "Batal", color: "#dc2626" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-medium text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2" style={{ background: toast.color }}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2"><Sparkles size={12} className="inline mr-1.5 -mt-0.5" />AI DIGNITY GUARD</p>
            <h1 className="text-display-sm text-balance">
              Pendopo<span className="text-accent italic"> Digital</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs md:text-right leading-relaxed">
            Dua sisi pendopo — pembelajar dan sesepuh, dijembatani oleh ElderAgent.
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-1 p-1 rounded-2xl bg-muted/60 border border-border/30 w-fit">
          <button onClick={() => setTab("sowan")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "sowan" ? "bg-background text-foreground shadow-sm border border-border/30" : "text-muted-foreground hover:text-foreground"}`}>
            <BookOpen size={16} /> Sowan — Saya Tamu
          </button>
          <button onClick={() => setTab("elder")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "elder" ? "bg-background text-foreground shadow-sm border border-border/30" : "text-muted-foreground hover:text-foreground"}`}>
            <UserCog size={16} /> Kelola — Saya Sesepuh
          </button>
        </div>

        {/* =========================== TAB: SOWAN (CUSTOMER) =========================== */}
        {tab === "sowan" && (
          <div className="space-y-8">
            {/* Available slots */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <Calendar className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Slot Tersedia</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-11">
                  Pilih waktu yang cocok untuk sowan ke {state?.elder?.name || "Mbah Karto"}.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {slots.length === 0 ? (
                    <p className="text-sm text-muted-foreground col-span-full py-4">Belum ada slot tersedia saat ini.</p>
                  ) : (
                    slots.map((s, i) => {
                      const isActive = bookDate === s.date && bookTime === s.start_time;
                      return (
                        <button
                          key={i}
                          onClick={() => { setBookDate(s.date); setBookTime(s.start_time); }}
                          className={`text-left p-3 rounded-xl border transition-all text-sm ${
                            isActive
                              ? "border-accent bg-accent/10 ring-1 ring-accent"
                              : "border-border/40 bg-muted/30 hover:border-accent/30 hover:bg-accent/5"
                          }`}
                        >
                          <p className="text-xs text-muted-foreground">{formatDate(s.date)}</p>
                          <p className="font-semibold mt-0.5">{s.start_time} - {s.end_time}</p>
                          <p className="text-[10px] text-accent uppercase tracking-wider mt-1">{s.label}</p>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Booking form */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <Handshake className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Sampaikan Niat Sowan</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-11">
                  ElderAgent akan cek energi {state?.elder?.name || "Mbah Karto"} dan merespon hangat.
                </p>
                <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Namamu</label>
                    <input type="text" value={learnerName} onChange={e => setLearnerName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Ingin belajar</label>
                    <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tanggal</label>
                    <input type="date" value={bookDate} onChange={e => setBookDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Jam</label>
                    <input type="time" value={bookTime} onChange={e => setBookTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                  </div>
                  <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 shadow-lg"
                      style={{ background: "linear-gradient(135deg, #c79a55 0%, #b8863c 100%)", boxShadow: "0 4px 12px rgba(184,134,60,0.3), inset 0 1px 0 rgba(255,255,255,0.3)" }}>
                      {loading ? <><Loader2 className="animate-spin" size={16} />Mengirim niat...</> : <><Sparkles size={16} />Sowan — Kirim Niat <ArrowRight size={16} /></>}
                    </button>
                    <button type="button" onClick={handleReset} className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
                      <RotateCcw size={16} />Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Customer bookings */}
            {bookings.length > 0 && (
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Sowan Saya</h2>
                </div>
                <div className="space-y-4">
                  {bookings.slice().reverse().map((b) => {
                    const badge = badgeStyles[b.status] || { label: b.status, color: "#636363" };
                    return (
                      <div key={b.id} className="rounded-xl border border-border/30 bg-muted/20 p-5 space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                              <UserCircle className="text-accent" size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{b.learnerName}</p>
                              <p className="text-xs text-muted-foreground">{b.topic}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/30 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: badge.color }} />
                            {badge.label}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(b.date)}</span>
                          <span className="flex items-center gap-1.5"><Clock size={14} />{b.startTime} - {b.endTime}</span>
                        </div>
                        {b.elderReply && (
                          <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                              <MessageSquare size={16} className="text-accent mt-0.5 shrink-0" />
                              <p className="text-xs text-muted-foreground leading-relaxed italic">&ldquo;{b.elderReply}&rdquo;</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Negotiation log */}
            {logs.length > 0 && (
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <History className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Riwayat Sowan</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">ID</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Waktu</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Dari</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Pesan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((h: any, i: number) => {
                        const st = h.status || "-";
                        const badge = badgeStyles[st] || { label: st, color: "#636363" };
                        return (
                          <tr key={i} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{(h.request_id || "").slice(0, 6)}</td>
                            <td className="py-3 px-2 text-xs text-muted-foreground">
                              {h.timestamp ? new Date(h.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "-"}
                            </td>
                            <td className="py-3 px-2 font-medium">{h.from || "-"}</td>
                            <td className="py-3 px-2">
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: badge.color }} />
                                {badge.label}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              {h.asi_reply ? (
                                <div className="bg-muted/50 backdrop-blur-sm rounded-xl px-3 py-2 mt-1 text-xs text-muted-foreground leading-relaxed max-w-md border border-border/30">
                                  {h.asi_reply.slice(0, 200)}
                                </div>
                              ) : <span className="text-xs text-muted-foreground">{h.detail || "-"}</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================== TAB: ELDER (SESEPUH) =========================== */}
        {tab === "elder" && (
          <div className="space-y-8">
            {/* Profile */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <UserCog className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Profil Sesepuh</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-11">Identitas yang muncul di Pendopo Digital.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Nama</label>
                    <input type="text" value={elderName} onChange={e => setElderName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
                    <input type="text" value={elderBio} onChange={e => setElderBio(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Manage Slots */}
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <Calendar className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Atur Jadwal</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-11">Tambahkan atau hapus slot kapan Anda bisa menerima tamu.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mb-8">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tanggal</label>
                    <input type="date" value={newSlotDate} onChange={e => setNewSlotDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Jam Mulai</label>
                    <input type="time" value={newSlotTime} onChange={e => setNewSlotTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Label</label>
                    <select value={newSlotLabel} onChange={e => setNewSlotLabel(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm">
                      <option>Pagi</option>
                      <option>Siang</option>
                      <option>Sore</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button onClick={handleAddSlot} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-lg">
                      <Plus size={16} />Tambah Slot
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {slots.length === 0 ? (
                    <p className="text-sm text-muted-foreground col-span-full py-2">Belum ada slot. Tambahkan di atas.</p>
                  ) : (
                    slots.map((s, i) => (
                      <div key={i} className="relative group p-3 rounded-xl border border-border/40 bg-muted/30">
                        <button onClick={() => handleRemoveSlot(s.date, s.start_time)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md" title="Hapus slot">
                          <X size={12} />
                        </button>
                        <p className="text-xs text-muted-foreground">{formatDate(s.date)}</p>
                        <p className="font-semibold text-sm mt-0.5">{s.start_time} - {s.end_time}</p>
                        <p className="text-[10px] text-accent uppercase mt-1">{s.label}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* All bookings */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-accent" size={24} />
                <h2 className="text-xl font-serif font-bold">Semua Booking</h2>
              </div>
              {bookings.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-12">Belum ada yang sowan. Tunggu tamu datang melalui Pendopo Digital.</div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice().reverse().map((b) => {
                    const badge = badgeStyles[b.status] || { label: b.status, color: "#636363" };
                    const canComplete = b.status === "accepted" || b.status === "confirmed";
                    const canCancel = b.status !== "completed" && b.status !== "cancelled";
                    return (
                      <div key={b.id} className="rounded-xl border border-border/30 bg-muted/20 p-5 space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                              <UserCircle className="text-accent" size={20} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{b.learnerName}</p>
                              <p className="text-xs text-muted-foreground">{b.topic}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/60 border border-border/30 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: badge.color }} />
                            {badge.label}
                          </span>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(b.date)}</span>
                          <span className="flex items-center gap-1.5"><Clock size={14} />{b.startTime} - {b.endTime}</span>
                        </div>
                        {b.elderReply && (
                          <div className="bg-accent/5 border border-accent/10 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground leading-relaxed italic">&ldquo;{b.elderReply.slice(0, 200)}&rdquo;</p>
                          </div>
                        )}
                        <div className="flex gap-2 pt-1">
                          {canComplete && (
                            <button onClick={() => handleBookingAction(b.id, "complete")} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-700 text-xs font-medium hover:bg-emerald-600/20 transition-colors border border-emerald-600/20">
                              <Check size={14} />Tandai Selesai
                            </button>
                          )}
                          {canCancel && (
                            <button onClick={() => handleBookingAction(b.id, "cancel")} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors border border-destructive/20">
                              <X size={14} />Batalkan
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer stats */}
        {state && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-accent">{slots.length}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Slot Tersedia</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-accent">{bookings.length}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Total Sowan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-accent">{bookings.filter(b => b.status === "completed").length}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Selesai</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif font-bold text-accent">{bookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Aktif</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
