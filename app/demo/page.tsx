'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const DEMO_STEPS = [
    {
        icon: "🔍",
        title: "Jelajahi Mentor",
        desc: "Temukan maestro yang sesuai dengan minat dan kebutuhan Anda.",
        color: "bg-amber-50 border-amber-200"
    },
    {
        icon: "📅",
        title: "Buat Jadwal",
        desc: "Pilih waktu yang tepat dan lakukan pembayaran untuk mengkonfirmasi.",
        color: "bg-blue-50 border-blue-200"
    },
    {
        icon: "🎥",
        title: "Masuk Ruang Sowan",
        desc: "Hubungi maestro melalui panggilan video eksklusif 1-on-1.",
        color: "bg-emerald-50 border-emerald-200"
    },
    {
        icon: "💬",
        title: "Berikan Apresiasi",
        desc: "Setelah sesi selesai, berikan rating dan pesan apresiasi.",
        color: "bg-purple-50 border-purple-200"
    }
];

export default function DemoPage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const hasRun = useRef(false);

    const handleStartDemo = () => {
        login("Dex");
        router.push("/explore");
    };

    const handleStartAsMentor = () => {
        login("Opa Adriel");
        router.push("/dashboard/mentor");
    };

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] pt-[72px]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <span className="text-4xl">🌾</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black text-primary mb-4">
                        Demo Sowan.id
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Platform Edutech yang menghubungkan generasi muda dengan maestro berpengalaman melalui panggilan video eksklusif.
                    </p>
                </div>

                {/* Demo Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {DEMO_STEPS.map((step, i) => (
                        <div key={i} className={`rounded-3xl p-8 border-2 ${step.color}`}>
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shrink-0 shadow-sm">
                                    {step.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                                        <h3 className="text-xl font-black text-primary">{step.title}</h3>
                                    </div>
                                    <p className="text-primary/70 font-medium">{step.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Demo Accounts Info */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-primary/10 mb-12">
                    <h2 className="text-2xl font-black text-primary mb-6 text-center">Akun Demo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">🧑‍💻</span>
                                <div>
                                    <h3 className="font-black text-primary text-lg">Dex</h3>
                                    <p className="text-amber-700 text-sm font-medium">Akun Customer</p>
                                </div>
                            </div>
                            <p className="text-primary/70 text-sm mb-4">Coba fitur sebagai pengguna muda yang ingin belajar dari maestro.</p>
                            <ul className="text-sm text-primary/60 space-y-1">
                                <li>✓ Jelajahi mentor</li>
                                <li>✓ Booking sesi</li>
                                <li>✓ Masuk ruang video</li>
                                <li>✓ Berikan feedback</li>
                            </ul>
                        </div>
                        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">👴</span>
                                <div>
                                    <h3 className="font-black text-primary text-lg">Opa Adriel</h3>
                                    <p className="text-emerald-700 text-sm font-medium">Akun Mentor</p>
                                </div>
                            </div>
                            <p className="text-primary/70 text-sm mb-4">Coba fitur sebagai maestro berpengalaman yang menerima siswa.</p>
                            <ul className="text-sm text-primary/60 space-y-1">
                                <li>✓ Lihat dashboard mentor</li>
                                <li>✓ Terima booking</li>
                                <li>✓ Masuk ruang video</li>
                                <li>✓ Lihat pendapatan</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Special Demo Modes */}
                <div className="mb-12">
                    <h2 className="text-2xl font-black text-primary mb-6 text-center">🎬 Demo Interaktif dengan Animasi Panduan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            href="/demo/explore"
                            className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all block text-center"
                        >
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-4xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                🔍
                            </div>
                            <h3 className="text-xl font-black text-primary mb-2">Demo Jelajahi Mentor</h3>
                            <p className="text-sm text-primary/70 font-medium">Lihat panduan langkah demi langkah cara mencari dan memilih mentor dengan animasi langsung.</p>
                            <span className="inline-block mt-4 bg-accent text-white font-bold px-6 py-2 rounded-full group-hover:bg-accent/90 transition-all">
                                Mulai Demo →
                            </span>
                        </Link>
                        <Link
                            href="/demo/mentor"
                            className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all block text-center"
                        >
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-4xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                👴
                            </div>
                            <h3 className="text-xl font-black text-primary mb-2">Demo Dashboard Mentor</h3>
                            <p className="text-sm text-primary/70 font-medium">Ikuti alur lengkap dari Jelajahi, Jadwal, Ruang Sowan, hingga Apresiasi dengan panduan animasi.</p>
                            <span className="inline-block mt-4 bg-blue-600 text-white font-bold px-6 py-2 rounded-full group-hover:bg-blue-700 transition-all">
                                Mulai Demo →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={handleStartDemo}
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-6 rounded-3xl shadow-xl shadow-accent/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        <span>🚀</span>
                        Langsung ke Explore (Auto-Login Dex)
                    </button>
                    <button
                        onClick={handleStartAsMentor}
                        className="w-full sm:w-auto bg-primary/10 hover:bg-primary/20 text-primary font-black text-xl px-12 py-6 rounded-3xl border-2 border-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        <span>👴</span>
                        Langsung ke Mentor Dashboard (Auto-Login Opa Adriel)
                    </button>
                </div>

                {/* Info note */}
                <p className="text-center text-muted-foreground text-sm mt-10">
                    Demo ini akan otomatis mengisi data dan membawa Anda melalui alur platform.
                    <br />
                    Gunakan Wi-Fi stabil untuk pengalaman terbaik saat panggilan video.
                </p>

            </div>
        </main>
    );
}