'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Search, MapPin, Star, Calendar, CheckCircle } from "lucide-react";

const STEPS = [
    {
        target: "search",
        icon: "🔍",
        title: "Cari Mentor",
        desc: "Ketik nama atau topik yang Anda minati di kolom pencarian.",
        position: "top"
    },
    {
        target: "filter",
        icon: "🏙️",
        title: "Filter Kota",
        desc: "Pilih kota asal mentor yang Anda inginkan.",
        position: "top"
    },
    {
        target: "card",
        icon: "👤",
        title: "Pilih Mentor",
        desc: "Klik kartu mentor untuk melihat profil lengkap.",
        position: "center"
    },
    {
        target: "book",
        icon: "📅",
        title: "Buat Jadwal",
        desc: "Pilih waktu yang tersedia dan konfirmasi booking.",
        position: "bottom"
    }
];

export default function DemoExplorePage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const hasRun = useRef(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (hasRun.current || user) return;
        hasRun.current = true;
        login("Dex");

        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= STEPS.length - 1) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [user, login]);

    const handleGoToExplore = () => {
        router.push("/explore");
    };

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] pt-[72px]">
            {/* Overlay Guide */}
            <div className="fixed inset-0 z-50 pointer-events-none">
                {STEPS.map((step, i) => (
                    <div
                        key={i}
                        className={`absolute transition-all duration-500 ${
                            i === currentStep ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                    >
                        {i === currentStep && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-bounce">
                                <span className="text-2xl">{step.icon}</span>
                                <div>
                                    <p className="font-black text-sm">{step.title}</p>
                                    <p className="text-xs opacity-80">{step.desc}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Demo Header */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">🔍</span>
                        <div>
                            <h2 className="font-black text-primary">Demo Mode: Jelajahi Mentor</h2>
                            <p className="text-sm text-muted-foreground">Ikuti panduan langkah demi langkah</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        i <= currentStep ? 'bg-accent' : 'bg-primary/20'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            Langkah {currentStep + 1} dari {STEPS.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mock Explore Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Bar */}
                <div className="relative mb-8" id="search">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Cari nama atau topik..."
                        className="w-full h-16 pl-14 pr-6 bg-white border-2 border-transparent hover:border-accent/30 focus:border-accent rounded-2xl text-lg font-medium shadow-lg transition-all"
                    />
                    <div className={`absolute -inset-1 border-4 border-accent/50 rounded-2xl pointer-events-none transition-opacity ${currentStep === 0 ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                </div>

                {/* Filter Bar */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4" id="filter">
                    <div className={`px-6 py-3 bg-white rounded-full font-bold text-sm border-2 transition-all cursor-pointer ${
                        currentStep === 1 ? 'border-accent bg-accent/10' : 'border-primary/10 hover:border-primary/30'
                    }`}>
                        Semua Kota
                    </div>
                    <div className="px-6 py-3 bg-white rounded-full font-bold text-sm border-2 border-primary/10 hover:border-primary/30 cursor-pointer">
                        Yogyakarta
                    </div>
                    <div className="px-6 py-3 bg-white rounded-full font-bold text-sm border-2 border-primary/10 hover:border-primary/30 cursor-pointer">
                        Jakarta
                    </div>
                    <div className="px-6 py-3 bg-white rounded-full font-bold text-sm border-2 border-primary/10 hover:border-primary/30 cursor-pointer">
                        Bandung
                    </div>
                </div>

                {/* Mentor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="card">
                    {/* Featured Mentor Card */}
                    <div className="relative rounded-[32px] overflow-hidden border-4 border-accent/30 bg-white shadow-2xl group">
                        <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-50">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
                                alt="Opa Adriel"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" />
                                Online
                            </div>
                            <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                                Top Rated
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2">
                                    <h3 className="font-black text-primary text-lg">Opa Adriel</h3>
                                    <p className="text-xs text-muted-foreground">Pakar Sejarah Jawa</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-4 h-4 text-primary/50" />
                                <span className="text-sm font-medium text-primary/70">Yogyakarta</span>
                                <span className="mx-2 text-primary/30">•</span>
                                <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                                <span className="text-sm font-bold">4.9</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                                "Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa."
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-black text-primary">Rp 100.000</span>
                                <span className="text-xs text-primary/50">3 slot tersedia</span>
                            </div>
                        </div>
                        <div className={`absolute -inset-1 border-4 border-accent rounded-[36px] pointer-events-none transition-opacity ${currentStep === 2 ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                    </div>

                    {/* More Cards */}
                    {[2, 3].map(i => (
                        <div key={i} className="rounded-[32px] overflow-hidden border-2 border-primary/10 bg-white shadow-lg opacity-60">
                            <div className="relative h-56 bg-slate-100">
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}-?q=80&w=400`}
                                    alt="Mentor"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-black text-primary mb-2">Mentor {i}</h3>
                                <p className="text-sm text-muted-foreground">Deskripsi mentor</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center" id="book">
                    <button
                        onClick={handleGoToExplore}
                        className="bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-6 rounded-3xl shadow-xl transition-all active:scale-95"
                    >
                        Mulai Jelajahi Sekarang →
                    </button>
                    <p className="text-sm text-muted-foreground mt-4">
                        Tekan untuk masuk ke halaman explore sebenarnya
                    </p>
                </div>
            </div>
        </main>
    );
}