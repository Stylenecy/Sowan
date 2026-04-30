'use client';

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Star, Calendar, CheckCircle, ArrowRight } from "lucide-react";

const STEPS_ID = [
    { icon: "🔍", title: "Cari Mentor", desc: "Ketik nama atau topik yang Anda minati di kolom pencarian.", highlight: "search" },
    { icon: "🏙️", title: "Filter Kota", desc: "Pilih kota asal mentor yang Anda inginkan.", highlight: "filter" },
    { icon: "👤", title: "Pilih Mentor", desc: "Klik kartu mentor untuk melihat profil lengkap.", highlight: "card" },
    { icon: "📅", title: "Buat Jadwal", desc: "Pilih waktu yang tersedia dan konfirmasi booking.", highlight: "book" },
];

const STEPS_EN = [
    { icon: "🔍", title: "Search Mentor", desc: "Type the name or topic you're interested in.", highlight: "search" },
    { icon: "🏙️", title: "Filter City", desc: "Select the mentor's city.", highlight: "filter" },
    { icon: "👤", title: "Choose Mentor", desc: "Click mentor card to see full profile.", highlight: "card" },
    { icon: "📅", title: "Book Schedule", desc: "Select available time and confirm booking.", highlight: "book" },
];

export default function DemoExplorePage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const { language } = useLanguage();
    const hasRun = useRef(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const isID = language === 'id';
    const STEPS = isID ? STEPS_ID : STEPS_EN;
    const stepData = STEPS[currentStep];

    const clearAutoAdvance = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (hasRun.current || user) return;
        hasRun.current = true;
        login("Dex");

        intervalRef.current = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= STEPS.length - 1) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsComplete(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 3000);

        return clearAutoAdvance;
    }, [user, login, clearAutoAdvance]);

    const handleNextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handleGoToExplore = () => {
        router.push("/explore");
    };

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] pt-[72px]">
            {/* Sticky Demo Header */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-4 px-6 sticky top-[72px] z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">🔍</span>
                        <div>
                            <h2 className="font-black text-primary">{isID ? "Demo: Jelajahi Mentor" : "Demo: Explore Mentor"}</h2>
                            <p className="text-sm text-muted-foreground">{isID ? "Ikuti panduan langkah demi langkah" : "Follow step-by-step guide"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {STEPS.map((_, i) => (
                                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i <= currentStep ? 'bg-accent' : 'bg-primary/20'}`} />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            {isID ? "Langkah" : "Step"} {currentStep + 1} / {STEPS.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Step Guide — fixed below header, above content */}
            <div className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{ top: 'calc(72px + 4rem)', maxWidth: '90vw' }}>
                <div className="bg-accent text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4"
                    style={{ animation: 'demoBounce 2.5s ease-in-out infinite' }}>
                    <span className="text-3xl shrink-0">{stepData.icon}</span>
                    <div className="min-w-0">
                        <p className="font-black text-base whitespace-nowrap">{stepData.title}</p>
                        <p className="text-sm opacity-80 whitespace-nowrap">{stepData.desc}</p>
                    </div>
                </div>
            </div>

            {/* Manual step button */}
            <div className="fixed bottom-8 right-8 z-50">
                {!isComplete ? (
                    <button onClick={handleNextStep} className="bg-accent hover:bg-accent/90 text-white font-black px-6 py-3 rounded-2xl shadow-xl transition-all active:scale-95">
                        {currentStep < STEPS.length - 1 ? (isID ? "Langkah Berikutnya →" : "Next Step →") : "✓"}
                    </button>
                ) : (
                    <div className="bg-emerald-500 text-white font-black px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" /> {isID ? "Selesai" : "Done"}
                    </div>
                )}
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Search Bar */}
                <div className="relative mb-8" id="search">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-6 h-6" />
                    <input type="text" placeholder={isID ? "Cari nama atau topik..." : "Search name or topic..."}
                        className="w-full h-16 pl-14 pr-6 bg-white border-2 border-transparent hover:border-accent/30 focus:border-accent rounded-2xl text-lg font-medium shadow-lg transition-all" />
                    <div className={`absolute -inset-1 border-4 border-accent/50 rounded-2xl pointer-events-none transition-opacity ${currentStep === 0 ? 'opacity-100' : 'opacity-0'}`}
                        style={{ borderRadius: '0.875rem' }} />
                </div>

                {/* Filter Bar */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4" id="filter">
                    <div className={`px-6 py-3 bg-white rounded-full font-bold text-sm border-2 transition-all cursor-pointer ${
                        currentStep === 1 ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20' : 'border-primary/10 hover:border-primary/30'
                    }`}>
                        {isID ? "Semua Kota" : "All Cities"}
                    </div>
                    <div className="px-6 py-3 bg-white rounded-full font-bold text-sm border-2 border-primary/10 hover:border-primary/30 cursor-pointer">Yogyakarta</div>
                    <div className="px-6 py-3 bg-white rounded-full font-bold text-sm border-2 border-primary/10 hover:border-primary/30 cursor-pointer">Jakarta</div>
                    <div className="px-6 py-3 bg-white rounded-full font-bold text-sm border-2 border-primary/10 hover:border-primary/30 cursor-pointer">Bandung</div>
                </div>

                {/* Mentor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="card">
                    <div className={`relative rounded-[32px] overflow-hidden border-4 bg-white shadow-2xl group transition-all ${
                        currentStep === 2 ? 'border-accent shadow-accent/30' : 'border-transparent'
                    }`}>
                        <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-50">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
                                alt="Opa Adriel" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" /> Online
                            </div>
                            <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Top Rated</div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2">
                                    <h3 className="font-black text-primary text-lg">Opa Adriel</h3>
                                    <p className="text-xs text-muted-foreground">{isID ? "Pakar Sejarah Jawa" : "Javanese History Expert"}</p>
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
                                {isID ? '"Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa."' : '"Let\'s chat casually about history, life experiences, or just practice Javanese."'}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-black text-primary">Rp 100.000</span>
                                <span className="text-xs text-primary/50">{isID ? "3 slot tersedia" : "3 slots available"}</span>
                            </div>
                        </div>
                    </div>

                    {[2, 3].map(i => (
                        <div key={i} className="rounded-[32px] overflow-hidden border-2 border-primary/10 bg-white shadow-lg opacity-60">
                            <div className="relative h-56 bg-slate-100">
                                <img src={`https://images.unsplash.com/photo-1550000000000-${1500000000000 + i * 1000}?q=80&w=400`}
                                    alt="Mentor" className="w-full h-full object-cover grayscale" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-black text-primary mb-2">Mentor {i}</h3>
                                <p className="text-sm text-muted-foreground">{isID ? "Deskripsi mentor" : "Mentor description"}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center" id="book">
                    <button onClick={handleGoToExplore}
                        className="bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-6 rounded-3xl shadow-xl transition-all active:scale-95">
                        {isID ? "Mulai Jelajahi Sekarang →" : "Start Exploring Now →"}
                    </button>
                    <p className="text-sm text-muted-foreground mt-4">
                        {isID ? "Tekan untuk masuk ke halaman explore sebenarnya" : "Press to enter the actual explore page"}
                    </p>
                </div>

                {/* Bottom links */}
                <div className="text-center mt-8 flex justify-center gap-6">
                    <button onClick={() => { login("Opa Adriel"); router.push("/demo/mentor"); }}
                        className="text-sm text-blue-600 hover:underline font-medium">
                        {isID ? "Lihat Demo Mentor →" : "See Mentor Demo →"}
                    </button>
                    <button onClick={() => { login("Dex"); router.push("/dashboard/customer"); }}
                        className="text-sm text-primary/60 hover:underline font-medium">
                        {isID ? "Dashboard Customer →" : "Customer Dashboard →"}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes demoBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-8px); }
                }
            `}</style>
        </main>
    );
}