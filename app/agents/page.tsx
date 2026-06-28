"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Handshake, History, School, UserCircle, Calendar, Clock,
  ArrowRight, RotateCcw, Loader2, Plus, X, Check, UserCog,
  BookOpen, Sparkles, MessageSquare, LogIn,
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

const BADGE: Record<string, { label: string; color: string }> = {
  accepted: { label: "Diterima", color: "#16a34a" },
  countered: { label: "Alternatif", color: "#b8863c" },
  pending: { label: "Menunggu", color: "#636363" },
  confirmed: { label: "Dikonfirmasi", color: "#2563eb" },
  completed: { label: "Selesai", color: "#6b7280" },
  cancelled: { label: "Batal", color: "#dc2626" },
};

export default function AgentsPage() {
  const { user, isLoading: authLoading, setShowLoginModal } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("sowan");
  const [state, setState] = useState<AgentState | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; color: string } | null>(null);

  const [elderName, setElderName] = useState("Mbah Karto");
  const [elderBio, setElderBio] = useState("Sesepuh Karawitan — 30 tahun pengajar gamelan");
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotLabel, setNewSlotLabel] = useState("Pagi");

  const [learnerName, setLearnerName] = useState("");
  const [topic, setTopic] = useState("Belajar Gamelan");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");

  const showToast = useCallback((msg: string, color = "#1a1c1a") => {
    setToast({ msg, color }); setTimeout(() => setToast(null), 3000);
  }, []);

  const LS_KEY = "sowan_agents_state";
  const saveLocal = useCallback((s: AgentState) => {
    setState(s); try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
  }, []);

  const fetchState = useCallback(async () => {
    try { const r = await fetch("/api/agents/status"); const d = await r.json(); saveLocal(d); }
    catch { try { const c = localStorage.getItem(LS_KEY); if (c) setState(JSON.parse(c)); } catch {} }
  }, [saveLocal]);

  useEffect(() => {
    if (!authLoading && !user) { setShowLoginModal(true); router.push("/"); return; }
    if (user) { fetchState(); const i = setInterval(fetchState, 8000); return () => clearInterval(i); }
  }, [user, authLoading]);
  useEffect(() => { const d = new Date(); const f = d.toISOString().split("T")[0]; setNewSlotDate(f); setBookDate(f); setLearnerName(user?.name || ""); }, [user]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookDate || !bookTime) { showToast("Pilih tanggal dan jam dulu", "#dc2626"); return; }
    setLoading(true);
    try {
      const r = await fetch("/api/agents/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learner_name: learnerName, topic, date: bookDate, start_time: bookTime }),
      });
      const result = await r.json();
      if (result.state) saveLocal(result.state);
      showToast(
        result.status === "accepted" ? "Pintu dibuka!" : result.status === "countered" ? "Alternatif ditawarkan" : "Belum cocok",
        result.status === "accepted" ? "#16a34a" : result.status === "countered" ? "#b8863c" : "#dc2626"
      );
    } catch { showToast("Gagal", "#dc2626"); }
    setLoading(false);
  };

  const handleAddSlot = async () => {
    if (!newSlotDate || !newSlotTime) { showToast("Pilih tanggal dan jam", "#dc2626"); return; }
    try {
      const r = await fetch("/api/agents/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", date: newSlotDate, start_time: newSlotTime, label: newSlotLabel }),
      });
      const result = await r.json();
      if (result.state) saveLocal(result.state);
      showToast("Slot ditambahkan", "#16a34a");
    } catch { showToast("Gagal", "#dc2626"); }
  };

  const handleRemoveSlot = async (date: string, time: string) => {
    try {
      const r = await fetch("/api/agents/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", date, start_time: time }),
      });
      const result = await r.json();
      if (result.state) saveLocal(result.state);
      showToast("Slot dihapus", "#1a1c1a");
    } catch { showToast("Gagal", "#dc2626"); }
  };

  const handleBookingAction = async (id: string, action: "complete" | "cancel") => {
    try {
      const r = await fetch("/api/agents/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, booking_id: id }),
      });
      const result = await r.json();
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

  const fmtDate = (d: string) => {
    try { return new Date(d + "T00:00:00").toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }); }
    catch { return d; }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={32} /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-medium text-white shadow-2xl animate-in fade-in slide-in-from-bottom-2" style={{ background: toast.color }}>
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2"><Sparkles size={12} className="inline mr-1.5" />AI DIGNITY GUARD</p>
            <h1 className="text-display-sm">Pendopo<span className="text-accent italic"> Digital</span></h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs md:text-right leading-relaxed">
            Dua sisi pendopo — pembelajar dan sesepuh, dijembatani oleh ElderAgent.
          </p>
        </div>

        <div className="flex gap-1 p-1 rounded-2xl bg-muted/60 border border-border/30 w-fit">
          <button onClick={() => setTab("sowan")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "sowan" ? "bg-background text-foreground shadow-sm border border-border/30" : "text-muted-foreground hover:text-foreground"}`}>
            <BookOpen size={16} /> Sowan — Saya Tamu
          </button>
          <button onClick={() => setTab("elder")} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === "elder" ? "bg-background text-foreground shadow-sm border border-border/30" : "text-muted-foreground hover:text-foreground"}`}>
            <UserCog size={16} /> Kelola — Saya Sesepuh
          </button>
        </div>

        {/* ===== TAB: SOWAN ===== */}
        {tab === "sowan" && (
          <div className="space-y-8">
            {/* Available Slots */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-1">
                <Calendar className="text-accent" size={24} />
                <h2 className="text-xl font-serif font-bold">Slot Tersedia</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6 ml-11">
                Klik slot untuk memilih. ElderAgent akan cek energi {state?.elder?.name || "Mbah Karto"}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {slots.length === 0 ? (
                  <p className="text-sm text-muted-foreground col-span-full py-4">Belum ada slot tersedia.</p>
                ) : (
                  slots.map((s, i) => {
                    const active = bookDate === s.date && bookTime === s.start_time;
                    return (
                      <button key={i} type="button" onClick={() => { setBookDate(s.date); setBookTime(s.start_time); }}
                        className={`text-left p-3 rounded-xl border transition-all text-sm cursor-pointer ${
                          active ? "border-accent bg-accent/10 ring-2 ring-accent/40 shadow" : "border-border/40 bg-muted/30 hover:border-accent/30 hover:bg-accent/5"
                        }`}>
                        <p className="text-xs text-muted-foreground">{fmtDate(s.date)}</p>
                        <p className="font-semibold mt-0.5">{s.start_time} - {s.end_time}</p>
                        <p className="text-[10px] text-accent uppercase tracking-wider mt-1">{s.label}</p>
                        {active && <p className="text-[10px] text-accent font-bold mt-1">✓ Terpilih</p>}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-1">
                <Handshake className="text-accent" size={24} />
                <h2 className="text-xl font-serif font-bold">Sampaikan Niat Sowan</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6 ml-11">
                ElderAgent akan cek energi {state?.elder?.name || "Mbah Karto"} dan merespon.
              </p>
              <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Namamu</label>
                  <input type="text" value={learnerName} onChange={e => setLearnerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Ingin belajar</label>
                  <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tanggal {bookDate && bookTime ? <span className="text-accent font-bold">({fmtDate(bookDate)}, {bookTime})</span> : ""}</label>
                  <input type="date" value={bookDate} onChange={e => setBookDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Jam</label>
                  <input type="time" value={bookTime} onChange={e => setBookTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors" />
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                  <button type="submit" disabled={loading || !bookDate || !bookTime}
                    className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                    style={{ background: "linear-gradient(135deg, #c79a55 0%, #b8863c 100%)", boxShadow: "0 4px 12px rgba(184,134,60,0.3)" }}>
                    {loading ? <><Loader2 className="animate-spin" size={16} />Mengirim...</> : <><Sparkles size={16} />Kirim Niat <ArrowRight size={16} /></>}
                  </button>
                  <button type="button" onClick={handleReset}
                    className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors">
                    <RotateCcw size={16} />Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Customer Bookings */}
            {bookings.length > 0 && (
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="text-accent" size={24} />
                  <h2 className="text-xl font-serif font-bold">Sowan Saya</h2>
                </div>
                <div className="space-y-4">
                  {bookings.slice().reverse().map((b) => {
                    const badge = BADGE[b.status] || { label: b.status, color: "#636363" };
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
                          <span className="flex items-center gap-1.5"><Calendar size={14} />{fmtDate(b.date)}</span>
                          <span className="flex items-center gap-1.5"><Clock size={14} />{b.startTime} - {b.endTime}</span>
                        </div>
                        {b.elderReply && (
                          <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                              <MessageSquare size={16} className="text-accent mt-0.5 shrink-0" />
                              <div>
                                <p className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">Respon ElderAgent:</p>
                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{b.elderReply}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        {b.status === "countered" && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <p className="text-xs text-amber-800 font-medium">💡 Alternatif slot ditawarkan — cek slot tersedia dan kirim ulang niat.</p>
                          </div>
                        )}
                        {b.status === "declined" || b.status === "cancelled" ? (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-xs text-red-700 font-medium">✋ Sesi ditutup — pilih slot lain dan coba lagi.</p>
                          </div>
                        ) : null}
                        {(b.status === "accepted" || b.status === "confirmed") && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                            <p className="text-xs text-emerald-700 font-medium">✅ Sesi diterima! Datang sesuai jadwal ya.</p>
                          </div>
                        )}
                        {b.status === "completed" && (
                          <div className="bg-violet-50 border border-violet-200 rounded-xl p-3">
                            <p className="text-xs text-violet-700 font-medium">🎉 Sesi selesai! Terima kasih sudah sowan.</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* History Log */}
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
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">ID</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Waktu</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Dari</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Status</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground text-xs uppercase">Pesan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((h: any, i: number) => {
                        const st = h.status || "-";
                        const badge = BADGE[st] || { label: st, color: "#636363" };
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
                                <div className="bg-muted/50 backdrop-blur-sm rounded-xl px-3 py-2 mt-1 text-xs text-muted-foreground leading-relaxed border border-border/30 max-w-lg whitespace-pre-line">
                                  {h.asi_reply}
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

        {/* ===== TAB: ELDER ===== */}
        {tab === "elder" && (
          <div className="space-y-8">
            {/* Profile */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
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

            {/* Manage Slots */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-1">
                <Calendar className="text-accent" size={24} />
                <h2 className="text-xl font-serif font-bold">Atur Jadwal</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6 ml-11">Isi tanggal, jam, label → klik Tambah Slot.</p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-3xl mb-8">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tanggal</label>
                  <input type="date" value={newSlotDate} onChange={e => setNewSlotDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Jam Mulai</label>
                  <input type="time" value={newSlotTime} onChange={e => setNewSlotTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Label Waktu</label>
                  <select value={newSlotLabel} onChange={e => setNewSlotLabel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer">
                    <option>Pagi</option>
                    <option>Siang</option>
                    <option>Sore</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button type="button" onClick={handleAddSlot} disabled={!newSlotDate || !newSlotTime}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                    <Plus size={16} />Tambah Slot
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3 font-medium">Slot saat ini — arahkan kursor ke slot untuk menghapus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {slots.length === 0 ? (
                  <p className="text-sm text-muted-foreground col-span-full py-4">Belum ada slot. Isi form di atas lalu klik Tambah Slot.</p>
                ) : (
                  slots.map((s, i) => (
                    <div key={i} className="relative group p-3 rounded-xl border border-border/40 bg-muted/30 hover:border-accent/30 transition-colors">
                      <button type="button" onClick={() => handleRemoveSlot(s.date, s.start_time)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110 cursor-pointer"
                        title="Hapus slot">
                        <X size={12} />
                      </button>
                      <p className="text-xs text-muted-foreground">{fmtDate(s.date)}</p>
                      <p className="font-semibold text-sm mt-0.5">{s.start_time} - {s.end_time}</p>
                      <p className="text-[10px] text-accent uppercase mt-1">{s.label}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* All Bookings */}
            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-accent" size={24} />
                <h2 className="text-xl font-serif font-bold">Semua Booking</h2>
              </div>
              {bookings.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-12 text-balance">Belum ada yang sowan. Customer bisa booking lewat tab "Sowan — Saya Tamu".</div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice().reverse().map((b) => {
                    const badge = BADGE[b.status] || { label: b.status, color: "#636363" };
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
                          <span className="flex items-center gap-1.5"><Calendar size={14} />{fmtDate(b.date)}</span>
                          <span className="flex items-center gap-1.5"><Clock size={14} />{b.startTime} - {b.endTime}</span>
                        </div>
                        {b.elderReply && (
                          <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                            <p className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">Respon ElderAgent ke {b.learnerName}:</p>
                            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{b.elderReply}</p>
                          </div>
                        )}
                        <div className="flex gap-2 pt-1">
                          {canComplete && (
                            <button type="button" onClick={() => handleBookingAction(b.id, "complete")}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-700 text-xs font-medium hover:bg-emerald-600/20 transition-colors border border-emerald-600/20 cursor-pointer">
                              <Check size={14} />Tandai Selesai
                            </button>
                          )}
                          {canCancel && (
                            <button type="button" onClick={() => handleBookingAction(b.id, "cancel")}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors border border-destructive/20 cursor-pointer">
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

        {/* Stats Footer */}
        {state && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/30">
            <div className="text-center"><p className="text-2xl font-serif font-bold text-accent">{slots.length}</p><p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Slot Tersedia</p></div>
            <div className="text-center"><p className="text-2xl font-serif font-bold text-accent">{bookings.length}</p><p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Total Sowan</p></div>
            <div className="text-center"><p className="text-2xl font-serif font-bold text-accent">{bookings.filter(b => b.status === "completed").length}</p><p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Selesai</p></div>
            <div className="text-center"><p className="text-2xl font-serif font-bold text-accent">{bookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length}</p><p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Aktif</p></div>
          </div>
        )}
      </div>
    </div>
  );
}
