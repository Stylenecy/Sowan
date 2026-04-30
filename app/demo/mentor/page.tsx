'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Users, Calendar, Video, Heart, CheckCircle, Star } from "lucide-react";

const MENTOR_STEPS = [
    {
        id: 0,
        target: "nav-explore",
        icon: "🔍",
        title: "Jelajahi",
        desc: "Profil Anda terlihat oleh customer yang mencari mentor.",
        position: "top"
    },
    {
        id: 1,
        target: "nav-schedule",
        icon: "📅",
        title: "Kelola Jadwal",
        desc: "Lihat dan kelola jadwal sesi yang sudah dipesan.",
        position: "top"
    },
    {
        id: 2,
        target: "nav-room",
        icon: "🎥",
        title: "Ruang Sowan",
        desc: "Masuk ke ruang video call dengan customer.",
        position: "top"
    },
    {
        id: 3,
        target: "nav-feedback",
        icon: "💬",
        title: "Apresiasi",
        desc: "Lihat testimonial dan rating dari customer.",
        position: "top"
    }
];

const EXPLORE_STEPS = [
    { target: "profile-card", icon: "👤", title: "Profil Mentor", desc: "Ini adalah kartu profil Anda yang dilihat customer.", position: "center" },
    { target: "profile-bio", icon: "📝", title: "Bio & Topik", desc: "Topik yang Anda tawarkan terlihat di sini.", position: "center" },
];

const SCHEDULE_STEPS = [
    { target: "upcoming-session", icon: "📅", title: "Sesi Mendatang", desc: "Customer sudah booked. Klik untuk detail.", position: "center" },
    { target: "session-detail", icon: "👤", title: "Detail Customer", desc: "Nama dan topik yang ingin dibahas.", position: "center" },
];

const ROOM_STEPS = [
    { target: "join-room", icon: "🎥", title: "Masuk Ruang", desc: "Klik untuk mulai video call.", position: "center" },
    { target: "video-area", icon: "📹", title: "Video Call", desc: "Anda akan terhubung dengan customer.", position: "center" },
];

const FEEDBACK_STEPS = [
    { target: "rating-display", icon: "⭐", title: "Rating & Ulasan", desc: "Customer memberikan testimonial untuk Anda.", position: "center" },
    { target: "appreciation-badge", icon: "🎉", title: "Apresiasi", desc: "Berkat Anda, customer merasa terbantu!", position: "center" },
];

export default function DemoMentorPage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const hasRun = useRef(false);
    const [phase, setPhase] = useState<'overview' | 'explore' | 'schedule' | 'room' | 'feedback'>('overview');
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (hasRun.current || user) return;
        hasRun.current = true;
        login("Opa Adriel");
    }, [user, login]);

    const getSteps = () => {
        switch (phase) {
            case 'explore': return EXPLORE_STEPS;
            case 'schedule': return SCHEDULE_STEPS;
            case 'room': return ROOM_STEPS;
            case 'feedback': return FEEDBACK_STEPS;
            default: return MENTOR_STEPS;
        }
    };

    const getTotalSteps = () => {
        if (phase === 'overview') return MENTOR_STEPS.length;
        return getSteps().length;
    };

    const getCurrentStepData = () => {
        const steps = phase === 'overview' ? MENTOR_STEPS : getSteps();
        return steps[step] || steps[0];
    };

    const goToPhase = (p: typeof phase) => {
        setPhase(p);
        setStep(0);
    };

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6]">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-4 px-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">👴</span>
                        <div>
                            <h2 className="font-black text-primary">Demo Mode: Dashboard Mentor</h2>
                            <p className="text-sm text-muted-foreground">Alur lengkap dari Jelajahi hingga Apresiasi</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {Array.from({ length: getTotalSteps() }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        i <= step ? 'bg-blue-600' : 'bg-primary/20'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            {phase === 'overview' ? `Langkah ${step + 1}` : `Detail ${step + 1}`} / {getTotalSteps()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Animated Guide */}
            {phase === 'overview' && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-blue-600 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 max-w-md">
                        <span className="text-4xl">{getCurrentStepData().icon}</span>
                        <div>
                            <p className="font-black text-base">{getCurrentStepData().title}</p>
                            <p className="text-sm opacity-80">{getCurrentStepData().desc}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Phase-specific overlays */}
            {phase !== 'overview' && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-indigo-600 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 max-w-md">
                        <span className="text-4xl">{getCurrentStepData().icon}</span>
                        <div>
                            <p className="font-black text-base">{getCurrentStepData().title}</p>
                            <p className="text-sm opacity-80">{getCurrentStepData().desc}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Mock Mentor Dashboard */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tab Nav */}
                <div className="flex gap-3 mb-10 flex-wrap" id="tab-nav">
                    <button
                        onClick={() => goToPhase('overview')}
                        className={`px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                            phase === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-primary/10 hover:border-blue-300'
                        }`}
                    >
                        <Users className="w-4 h-4" /> Overview
                    </button>
                    <button
                        onClick={() => goToPhase('explore')}
                        className={`px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                            phase === 'explore' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-primary/10 hover:border-blue-300'
                        }`}
                        id="nav-explore"
                    >
                        <Users className="w-4 h-4" /> Jelajahi
                    </button>
                    <button
                        onClick={() => goToPhase('schedule')}
                        className={`px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                            phase === 'schedule' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-primary/10 hover:border-blue-300'
                        }`}
                        id="nav-schedule"
                    >
                        <Calendar className="w-4 h-4" /> Jadwal
                    </button>
                    <button
                        onClick={() => goToPhase('room')}
                        className={`px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                            phase === 'room' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-primary/10 hover:border-blue-300'
                        }`}
                        id="nav-room"
                    >
                        <Video className="w-4 h-4" /> Ruang Sowan
                    </button>
                    <button
                        onClick={() => goToPhase('feedback')}
                        className={`px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${
                            phase === 'feedback' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-primary/10 hover:border-blue-300'
                        }`}
                        id="nav-feedback"
                    >
                        <Heart className="w-4 h-4" /> Apresiasi
                    </button>
                </div>

                {/* === OVERVIEW PHASE === */}
                {phase === 'overview' && (
                    <div className="space-y-8">
                        {/* Mentor Profile Header */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-200">
                            <div className="flex items-start gap-6">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=200&w=200&auto=format&fit=crop"
                                        alt="Opa Adriel"
                                        className="w-28 h-28 rounded-2xl object-cover shadow-md"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                        4.9
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-black text-primary mb-1">Opa Adriel</h2>
                                    <p className="text-muted-foreground font-medium mb-4">Pakar Sejarah Jawa • Yogyakarta</p>
                                    <div className="flex gap-3 flex-wrap">
                                        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold">Sejarah Jawa</span>
                                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">Bahasa Jawa</span>
                                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">Kearifan Lokal</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Sesicompleted</p>
                                    <p className="text-4xl font-black text-blue-600">24</p>
                                </div>
                            </div>
                        </div>

                        {/* 4-Flow Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { icon: "🔍", label: "Jelajahi", desc: "Profil terlihat", color: "from-blue-50 to-indigo-50", border: "border-blue-200", step: 0 },
                                { icon: "📅", label: "Jadwal", desc: "3 sesi booked", color: "from-emerald-50 to-teal-50", border: "border-emerald-200", step: 1 },
                                { icon: "🎥", label: "Ruang Sowan", desc: "1 sesi aktif", color: "from-purple-50 to-violet-50", border: "border-purple-200", step: 2 },
                                { icon: "⭐", label: "Apresiasi", desc: "4.9 rating", color: "from-amber-50 to-orange-50", border: "border-amber-200", step: 3 },
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const phases: ('explore' | 'schedule' | 'room' | 'feedback')[] = ['explore', 'schedule', 'room', 'feedback'];
                                        goToPhase(phases[i]);
                                    }}
                                    className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 border-2 ${item.border} hover:shadow-xl transition-all text-left group ${
                                        step === i ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                                    }`}
                                >
                                    <span className="text-4xl mb-3 block">{item.icon}</span>
                                    <h3 className="font-black text-primary text-lg group-hover:underline">{item.label}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                                </button>
                            ))}
                        </div>

                        {/* Session List Preview */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-primary/10">
                            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" /> Sesi Mendatang
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Dex", topic: "Sejarah Jawa", time: "Hari ini, 14:00", status: "confirmed" },
                                    { name: "Mbak Siti", topic: "Bahasa Jawa Dasar", time: "Besok, 10:00", status: "pending" },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                                            {s.name[0]}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-primary">{s.name}</p>
                                            <p className="text-sm text-muted-foreground">{s.topic}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-blue-600">{s.time}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                                s.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {s.status === 'confirmed' ? 'Dikonfirmasi' : 'Menunggu'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* === EXPLORE PHASE === */}
                {phase === 'explore' && (
                    <div className="space-y-8">
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-amber-700">📍 Mode Demo: Lihat bagaimana customer melihat profil Anda</p>
                        </div>
                        <div className="max-w-2xl mx-auto" id="profile-card">
                            <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 border-amber-300">
                                <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-50">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=400&auto=format&fit=crop"
                                        alt="Opa Adriel"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" /> Online
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2">
                                            <h3 className="font-black text-primary text-xl">Opa Adriel</h3>
                                            <p className="text-xs text-muted-foreground">Pakar Sejarah Jawa</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6" id="profile-bio">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-amber-500">★</span><strong>4.9</strong>
                                        <span className="mx-2 text-primary/20">•</span>
                                        <span className="text-sm text-muted-foreground">Yogyakarta</span>
                                        <span className="mx-2 text-primary/20">•</span>
                                        <span className="text-sm text-muted-foreground">24 sesi</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        "Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa."
                                    </p>
                                    <div className="flex gap-2 flex-wrap mb-4">
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Sejarah Jawa</span>
                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Bahasa Jawa</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                                        <span className="text-2xl font-black text-primary">Rp 100.000</span>
                                        <button className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-xl transition-all">
                                            Book Sesi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">← Ini yang dilihat customer saat mencari mentor</p>
                    </div>
                )}

                {/* === SCHEDULE PHASE === */}
                {phase === 'schedule' && (
                    <div className="space-y-8" id="upcoming-session">
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-emerald-700">📅 Mode Demo: Jadwal sesi yang sudah dipesan</p>
                        </div>
                        <div className="space-y-4 max-w-3xl mx-auto" id="session-detail">
                            {[
                                { name: "Dex", avatar: "👨‍💻", topic: "Sejarah Jawa", date: "Hari ini", time: "14:00 - 15:00", desc: "Ingin belajar sejarah kerajaan Jawa" },
                                { name: "Mbak Siti", avatar: "👩‍🎓", topic: "Bahasa Jawa", date: "Besok", time: "10:00 - 11:00", desc: "Mau belajar bahasa Jawa dasar" },
                                { name: "Bang Joko", avatar: "👨‍🦱", topic: "Kearifan Lokal", date: "2 Mei", time: "15:00 - 16:00", desc: "Tertarik budaya Jawa" },
                            ].map((s, i) => (
                                <div key={i} className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${i === 0 ? 'border-emerald-400 bg-emerald-50' : 'border-primary/10'}`}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">
                                            {s.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-black text-lg">{s.name}</h3>
                                                {i === 0 && <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">Segera</span>}
                                            </div>
                                            <p className="text-blue-600 font-bold text-sm mb-1">{s.topic}</p>
                                            <p className="text-sm text-muted-foreground mb-2">"{s.desc}"</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="font-bold text-primary/70">📅 {s.date}</span>
                                                <span className="font-bold text-primary/70">🕐 {s.time}</span>
                                            </div>
                                        </div>
                                        {i === 0 && (
                                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all h-fit">
                                                Masuk Ruang →
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* === ROOM PHASE === */}
                {phase === 'room' && (
                    <div className="space-y-8" id="join-room">
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-purple-700">🎥 Mode Demo: Ruang Sowan untuk video call</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl" id="video-area">
                                {/* Video Placeholder */}
                                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
                                            👴
                                        </div>
                                        <p className="text-white font-black text-2xl mb-2">Opa Adriel</p>
                                        <p className="text-slate-400 text-sm">Menunggu koneksi...</p>
                                    </div>
                                    {/* Simulated video feed from mentor side */}
                                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-2 border-slate-600 flex items-center justify-center">
                                        <p className="text-slate-400 text-xs font-bold">Video Anda</p>
                                    </div>
                                    {/* Connection pulse effect */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-40 h-40 border-4 border-emerald-500 rounded-full animate-ping opacity-20" />
                                    </div>
                                </div>
                                {/* Controls */}
                                <div className="p-6 flex items-center justify-center gap-6 bg-slate-900">
                                    <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-2xl transition-all">
                                        🎤
                                    </button>
                                    <button className="w-20 h-20 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center text-3xl transition-all shadow-lg">
                                        📹
                                    </button>
                                    <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-2xl transition-all">
                                        📤
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg text-center">
                                <p className="font-bold text-muted-foreground">Customer (Dex) akan muncul di sini saat terhubung</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* === FEEDBACK PHASE === */}
                {phase === 'feedback' && (
                    <div className="space-y-8" id="rating-display">
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-amber-700">⭐ Mode Demo: Apresiasi dan testimonial dari customer</p>
                        </div>

                        {/* Rating Summary */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-amber-200 text-center" id="appreciation-badge">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <span className="text-6xl">⭐</span>
                                <div>
                                    <p className="text-6xl font-black text-primary">4.9</p>
                                    <p className="text-muted-foreground font-medium">dari 24 sesi</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-2 mb-8">
                                {[1,2,3,4,5].map(i => (
                                    <span key={i} className={`text-3xl ${i <= 4 ? 'text-amber-400' : 'text-primary/20'}`}>★</span>
                                ))}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-3xl font-black text-blue-600">24</p>
                                    <p className="text-sm text-muted-foreground">Sesi</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-3xl font-black text-emerald-600">100%</p>
                                    <p className="text-sm text-muted-foreground">Selesai</p>
                                </div>
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-3xl font-black text-amber-600">4.9</p>
                                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonials */}
                        <div className="space-y-4 max-w-2xl mx-auto">
                            <h3 className="font-black text-xl text-center mb-4">Testimonial Terbaru</h3>
                            {[
                                { name: "Dex", text: "Sangat membantu! Opa Adriel explained sejarah Jawa dengan cara yang sangat menarik dan mudah dipahami.", rating: 5, date: "Hari ini" },
                                { name: "Mbak Siti", text: "Belajar bahasa Jawa jadi menyenangkan. Thanks untuk kesabarannya mengajarkan kami!", rating: 5, date: "Kemarin" },
                                { name: "Bang Joko", text: "Diskusi kearifan lokal sangat enrichening. Recommended!", rating: 5, date: "3 hari lalu" },
                            ].map((t, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary/10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700">
                                                {t.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-primary">{t.name}</p>
                                                <p className="text-xs text-muted-foreground">{t.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: t.rating }).map((_, j) => (
                                                <span key={j} className="text-amber-400 text-sm">★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">"{t.text}"</p>
                                </div>
                            ))}
                        </div>

                        {/* Celebration */}
                        <div className="text-center py-8">
                            <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl px-8 py-6 border-2 border-amber-300">
                                <span className="text-5xl mb-2 block">🎉</span>
                                <p className="font-black text-primary text-xl">Apresiasi Anda sangat berarti!</p>
                                <p className="text-sm text-muted-foreground mt-1">Setiap sesi membantu customer merasa lebih terhubung</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Overview */}
                {phase !== 'overview' && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => goToPhase('overview')}
                            className="bg-primary/10 hover:bg-primary/20 text-primary font-bold px-8 py-4 rounded-2xl transition-all"
                        >
                            ← Kembali ke Overview
                        </button>
                    </div>
                )}

                {/* Auto-advance with manual override */}
                <div className="text-center mt-12 border-t border-primary/10 pt-8">
                    <p className="text-sm text-muted-foreground mb-4">Demo ini berjalan otomatis. Tekan tombol di bawah untuk mencoba flow lengkap.</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => { login("Opa Adriel"); router.push("/demo/mentor"); }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all"
                        >
                            🔄 Reset Demo
                        </button>
                        <button
                            onClick={() => { login("Opa Adriel"); router.push("/dashboard/mentor"); }}
                            className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-2xl transition-all"
                        >
                            🚀 Buka Dashboard Mentor Asli →
                        </button>
                    </div>
                </div>
            </div>

            {/* Simulate step progression in overview */}
            {phase === 'overview' && (
                <div className="fixed bottom-4 right-4 z-50">
                    <button
                        onClick={() => setStep(prev => prev < MENTOR_STEPS.length - 1 ? prev + 1 : 0)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl transition-all"
                    >
                        {step < MENTOR_STEPS.length - 1 ? 'Langkah Berikutnya →' : '🔄 Ulangi'}
                    </button>
                </div>
            )}

            {/* Simulate step progression in phases */}
            {phase !== 'overview' && (
                <div className="fixed bottom-4 right-4 z-50">
                    <button
                        onClick={() => setStep(prev => prev < getSteps().length - 1 ? prev + 1 : prev)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl shadow-xl transition-all"
                    >
                        {step < getSteps().length - 1 ? 'Langkah Berikutnya →' : '✓ Selesai'}
                    </button>
                </div>
            )}
        </main>
    );
}