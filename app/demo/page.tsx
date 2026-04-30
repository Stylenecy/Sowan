'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight, Play, Star, Users, Video, Heart, Zap, ChevronDown, Globe, Clock } from "lucide-react";

const FLOW_STEPS_ID = [
    { num: "01", icon: "🔍", title: "Jelajahi Mentor", desc: "Temukan maestro yang sesuai minat dan kebutuhan Anda." },
    { num: "02", icon: "📅", title: "Buat Jadwal", desc: "Pilih waktu yang tepat dan lakukan pembayaran." },
    { num: "03", icon: "🎥", title: "Masuk Ruang Sowan", desc: "Terhubung via video call eksklusif 1-on-1." },
    { num: "04", icon: "💬", title: "Berikan Apresiasi", desc: "Berikan rating dan pesan dukungan untuk maestro." },
];

const FLOW_STEPS_EN = [
    { num: "01", icon: "🔍", title: "Explore Mentor", desc: "Find a maestro that matches your interests." },
    { num: "02", icon: "📅", title: "Book Schedule", desc: "Choose the right time and confirm payment." },
    { num: "03", icon: "🎥", title: "Join Sowan Room", desc: "Connect via exclusive 1-on-1 video call." },
    { num: "04", icon: "💬", title: "Give Appreciation", desc: "Rate and send support messages to the maestro." },
];

export default function DemoPage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const { language } = useLanguage();
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    const isID = language === 'id';
    const FLOW_STEPS = isID ? FLOW_STEPS_ID : FLOW_STEPS_EN;

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleStartDemo = () => {
        login("Dex");
        router.push("/demo/explore");
    };

    const handleStartMentorDemo = () => {
        login("Opa Adriel");
        router.push("/demo/mentor");
    };

    const parallaxOffset = scrollY * 0.3;
    const heroOpacity = Math.max(0, 1 - scrollY / 500);

    return (
        <main className="min-h-screen w-full overflow-x-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-[128px]" style={{ transform: `translateY(${parallaxOffset}px)` }} />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-[128px]" style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }} />
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-200/20 rounded-full blur-[128px]" style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }} />

                {/* Floating particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i}
                        className="absolute w-2 h-2 bg-accent/30 rounded-full"
                        style={{
                            left: `${(i * 17 + scrollY * 0.02) % 100}%`,
                            top: `${(i * 23 + scrollY * 0.05) % 100}%`,
                            animation: `floatParticle ${8 + i % 4}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}

                {/* Animated grid lines */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    transform: `translateY(${parallaxOffset * 0.2}px)`,
                }} />
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4" style={{ zIndex: 1 }}>
                <div className="max-w-5xl mx-auto text-center" style={{ opacity: heroOpacity }}>
                    {/* Floating badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-200 rounded-full px-5 py-2 mb-8 shadow-lg"
                        style={{ animation: 'fadeInDown 0.8s ease-out' }}>
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-primary">{isID ? "Mode Demo Interaktif" : "Interactive Demo Mode"}</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-tight"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
                        {isID ? "Jelajahi" : "Explore"}{" "}
                        <span className="text-accent">Sowan.id</span>
                        <br />{isID ? "sebelum Anda用它" : "before you use it"}
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
                        {isID
                            ? "Platform Edutech yang menghubungkan generasi muda dengan maestro berpengalaman melalui panggilan video eksklusif."
                            : "An Edutech platform connecting young generations with experienced maestros via exclusive video calls."}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
                        <button onClick={handleStartDemo}
                            className="group bg-accent hover:bg-accent/90 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-xl shadow-accent/25 transition-all active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center">
                            <Play className="w-5 h-5" fill="currentColor" />
                            {isID ? "Mulai Demo Customer" : "Start Customer Demo"}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={handleStartMentorDemo}
                            className="group bg-white hover:bg-slate-50 text-primary font-bold text-lg px-10 py-5 rounded-2xl border-2 border-primary/20 hover:border-primary/40 shadow-lg transition-all active:scale-95 flex items-center gap-3 w-full sm:w-auto justify-center">
                            <span className="text-2xl">👴</span>
                            {isID ? "Demo Mentor (Geronteknologi)" : "Mentor Demo (Geronteknologi)"}
                        </button>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
                        <span className="text-sm text-muted-foreground font-medium">{isID ? "Scroll untuk panduan" : "Scroll for guide"}</span>
                        <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    </div>
                </div>
            </section>

            {/* What is Sowan Section */}
            <section className="relative py-24 px-4" style={{ zIndex: 1 }}>
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <span className="inline-block bg-amber-100 text-amber-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                            🌾 Sowan.id
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
                            {isID ? "Apa itu Sowan?" : "What is Sowan?"}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {isID
                                ? '"Sowan" berarti mengirim salam hangat — cara kami menghubungkan generasi melalui conversa tulus.'
                                : '"Sowan" means sending warm greetings — our way of connecting generations through heartfelt conversation.'}
                        </p>
                    </div>

                    {/* Feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: "🎥",
                                title: isID ? "Video Call Eksklusif" : "Exclusive Video Call",
                                desc: isID ? "Sesi 1-on-1 dengan maestro berpengalaman, langsung dari rumah Anda." : "1-on-1 sessions with experienced maestros, right from your home.",
                                color: "from-blue-50 to-indigo-50",
                                border: "border-blue-200",
                            },
                            {
                                icon: "🌍",
                                title: isID ? "Berbagai Bahasa" : "Various Languages",
                                desc: isID ? "Belajar bahasa daerah dari penutur asli yang passionate." : "Learn local languages from passionate native speakers.",
                                color: "from-emerald-50 to-teal-50",
                                border: "border-emerald-200",
                            },
                            {
                                icon: "⭐",
                                title: isID ? "Kurasi Maestro" : "Maestro Curation",
                                desc: isID ? "Setiap mentor dipilih karena keahlian dan kemampuan mendidik." : "Every mentor is selected for expertise and teaching ability.",
                                color: "from-amber-50 to-orange-50",
                                border: "border-amber-200",
                            },
                        ].map((f, i) => (
                            <div key={i}
                                className={`bg-gradient-to-br ${f.color} rounded-3xl p-8 border-2 ${f.border} hover:shadow-xl transition-all`}
                                style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s both` }}>
                                <div className="text-5xl mb-4">{f.icon}</div>
                                <h3 className="text-xl font-black text-primary mb-2">{f.title}</h3>
                                <p className="text-muted-foreground">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "500+", label: isID ? "Pengguna Aktif" : "Active Users" },
                            { value: "50+", label: isID ? "Maestro" : "Maestros" },
                            { value: "1.200+", label: isID ? "Sesi Selesai" : "Sessions Done" },
                            { value: "4.8", label: isID ? "Rating Rata-rata" : "Avg Rating", suffix: "⭐" },
                        ].map((s, i) => (
                            <div key={i} className="text-center bg-white rounded-2xl p-6 shadow-lg border border-primary/10"
                                style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both` }}>
                                <p className="text-3xl md:text-4xl font-black text-accent">{s.value}{s.suffix}</p>
                                <p className="text-sm text-muted-foreground font-medium mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative py-24 px-4 bg-white/50 backdrop-blur-sm" style={{ zIndex: 1 }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                            4 {isID ? "Langkah Mudah" : "Easy Steps"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
                            {isID ? "Cara Kerja Sowan" : "How Sowan Works"}
                        </h2>
                    </div>

                    {/* Steps with connectors */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-blue-200 to-emerald-200 hidden md:block" />

                        {FLOW_STEPS.map((step, i) => (
                            <div key={i} className={`relative flex items-center gap-8 mb-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Step card */}
                                <div className="flex-1 md:pr-16"
                                    style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.2}s both` }}>
                                    <div className={`bg-white rounded-3xl p-8 shadow-xl border-2 ${
                                        i === 0 ? 'border-amber-200' : i === 1 ? 'border-blue-200' : i === 2 ? 'border-purple-200' : 'border-emerald-200'
                                    }`}>
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-3xl shrink-0">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-muted-foreground">{step.num}</span>
                                                <h3 className="text-2xl font-black text-primary mt-1 mb-2">{step.title}</h3>
                                                <p className="text-muted-foreground">{step.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center number */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-accent text-white items-center justify-center font-black text-xl shadow-lg z-10">
                                    {i + 1}
                                </div>

                                {/* Empty space on right */}
                                <div className="flex-1 md:pl-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Modes Section */}
            <section className="relative py-24 px-4" style={{ zIndex: 1 }}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                            🎬 {isID ? "Demo Interaktif" : "Interactive Demo"}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
                            {isID ? "Pilih Mode Demo Anda" : "Choose Your Demo Mode"}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {isID
                                ? "Ikuti panduan langkah demi langkah dengan animasi langsung. Tidak perlu menebak-nebak."
                                : "Follow step-by-step guides with live animations. No guessing needed."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Customer Demo */}
                        <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200 hover:border-amber-400 hover:shadow-2xl transition-all"
                            style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                            <div className="absolute top-6 right-6 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                🔍 {isID ? "Customer" : "Customer"}
                            </div>
                            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                🧑‍💻
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-2">
                                {isID ? "Demo Jelajahi Mentor" : "Explore Mentor Demo"}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {isID
                                    ? "Lihat bagaimana customer mencari, memilih, dan booking mentor dengan panduan animasi."
                                    : "See how customers search, choose, and book mentors with animated guidance."}
                            </p>
                            <ul className="space-y-2 mb-8 text-sm">
                                {[
                                    { icon: "✓", text: isID ? "Cari dengan filter kota" : "Search with city filter" },
                                    { icon: "✓", text: isID ? "Lihat profil mentor" : "View mentor profile" },
                                    { icon: "✓", text: isID ? "Booking jadwal & konfirmasi" : "Book schedule & confirm" },
                                    { icon: "✓", text: isID ? "Masuk ruang video" : "Enter video room" },
                                    { icon: "✓", text: isID ? "Beri rating & testimonial" : "Give rating & testimonial" },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-primary/70">
                                        <span className="text-emerald-500 font-bold">{item.icon}</span>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleStartDemo}
                                className="w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all shadow-lg group-hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5" />
                                {isID ? "Mulai Demo Customer →" : "Start Customer Demo →"}
                            </button>
                        </div>

                        {/* Mentor Demo */}
                        <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all"
                            style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
                            <div className="absolute top-6 right-6 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                👴 {isID ? "Mentor" : "Mentor"}
                            </div>
                            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                👴
                            </div>
                            <h3 className="text-2xl font-black text-primary mb-2">
                                {isID ? "Demo Dashboard Mentor" : "Mentor Dashboard Demo"}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                {isID
                                    ? "Lihat bagaimana mentor menerima booking, mengelola jadwal, dan memberikan sesi."
                                    : "See how mentors receive bookings, manage schedules, and conduct sessions."}
                            </p>
                            <ul className="space-y-2 mb-8 text-sm">
                                {[
                                    { icon: "✓", text: isID ? "Overview dashboard dengan statistik" : "Dashboard overview with stats" },
                                    { icon: "✓", text: isID ? "Lihat profil yang dilihat customer" : "See profile as customers see" },
                                    { icon: "✓", text: isID ? "Kelola jadwal & sesi booked" : "Manage schedule & booked sessions" },
                                    { icon: "✓", text: isID ? "Masuk ruang video call" : "Join video call room" },
                                    { icon: "✓", text: isID ? "Lihat rating & testimonial" : "View ratings & testimonials" },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-primary/70">
                                        <span className="text-emerald-500 font-bold">{item.icon}</span>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleStartMentorDemo}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg group-hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5" />
                                {isID ? "Mulai Demo Mentor →" : "Start Mentor Demo →"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-primary/90" style={{ zIndex: 1 }}>
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        {isID ? "Siap menjelajahi Sowan?" : "Ready to explore Sowan?"}
                    </h2>
                    <p className="text-xl opacity-80 mb-10">
                        {isID
                            ? "Demo tidak memerlukan login. Langsung coba dan rasakan sendiri."
                            : "No login required for demo. Just try and experience it yourself."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={handleStartDemo}
                            className="bg-white text-primary font-black text-lg px-10 py-5 rounded-2xl shadow-xl transition-all active:scale-95 hover:bg-amber-50">
                            🚀 {isID ? "Mulai Sekarang" : "Start Now"}
                        </button>
                        <button onClick={() => router.push("/")}
                            className="border-2 border-white/40 text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all hover:bg-white/10">
                            {isID ? "Lihat Landing Page" : "View Landing Page"}
                        </button>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes floatParticle {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
                }
            `}</style>
        </main>
    );
}