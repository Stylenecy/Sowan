'use client';

import React, { useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Clock, CheckCircle2, ChevronRight, Calendar, Video, Play, ArrowRight, User2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CustomerDashboard() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const displayName = user?.name ?? "Teman Sowan";

    const [bookedTime, setBookedTime] = React.useState<string>("");
    const [bookedMentor, setBookedMentor] = React.useState<any>(null);

    React.useEffect(() => {
        const storedTime = localStorage.getItem("sowan_selected_time");
        const storedMentor = localStorage.getItem("sowan_booked_mentor");

        if (storedTime) {
            setBookedTime(storedTime);
        } else {
            // Default dynamic time (Now + 1h)
            const d = new Date();
            d.setHours(d.getHours() + 1);
            d.setMinutes(0);
            const startStr = d.getHours().toString().padStart(2, '0') + ":00";
            d.setHours(d.getHours() + 1);
            const endStr = d.getHours().toString().padStart(2, '0') + ":00";
            setBookedTime(`${t.dashboard.today}, ${startStr} - ${endStr} WIB`);
        }

        if (storedMentor) {
            setBookedMentor(JSON.parse(storedMentor));
        }
    }, [t.dashboard.today]);

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] font-sans text-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                {/* ── Greeting Header ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-primary mb-2">
                            {t.dashboard.customerTitle}
                        </h1>
                        <p className="text-2xl text-muted-foreground font-bold italic">
                            {t.shared.hello}{displayName}! 👋
                        </p>
                    </div>
                    <Button asChild className="h-14 sm:h-16 bg-accent hover:bg-accent/90 text-white rounded-2xl sm:rounded-3xl px-8 sm:px-10 text-lg sm:text-xl font-black shadow-xl shadow-accent/20 transition-all hover:-translate-y-1 w-full sm:w-auto">
                        <Link href="/explore">
                            {t.shared.explore}
                        </Link>
                    </Button>
                </div>

                {/* ── Stats Row ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-16">
                    <Card className="rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 border border-black/5 shadow-sm bg-white hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[28px] bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] sm:text-xs mb-1">{t.dashboard.sessions}</p>
                                <h3 className="text-3xl sm:text-4xl font-black text-primary">12</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 border border-black/5 shadow-sm bg-white hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[28px] bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <Clock className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] sm:text-xs mb-1">{t.dashboard.hours}</p>
                                <h3 className="text-3xl sm:text-4xl font-black text-primary">15.5</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 border border-black/5 shadow-sm bg-white hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[28px] bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <Star className="w-8 h-8 sm:w-10 sm:h-10" />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] sm:text-xs mb-1">{t.dashboard.points}</p>
                                <h3 className="text-3xl sm:text-4xl font-black text-primary">450</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Active Session ── */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg">
                            <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                        </div>
                        {t.dashboard.activeSession}
                    </h2>
                    <Card className="rounded-[40px] sm:rounded-[56px] overflow-hidden border-none shadow-2xl bg-white group/session">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-[400px] relative h-64 sm:h-80 lg:h-auto overflow-hidden">
                                <img
                                    src={bookedMentor ? bookedMentor.image : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"}
                                    alt={bookedMentor ? bookedMentor.name : "Mentor"}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/session:scale-110"
                                />
                                {/* Seamless Gradient Blend */}
                                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-primary via-primary/40 to-transparent z-10" />
                                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-[8px] text-white/80 px-2 py-1 rounded-md uppercase tracking-widest pointer-events-none z-20">
                                    Source: Unsplash
                                </div>
                                <div className="absolute top-8 left-8 z-20">
                                    <div className="bg-accent/90 backdrop-blur-md text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        {bookedMentor ? bookedMentor.name : "Opa Adriel"}
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 lg:p-14 flex-1 flex flex-col justify-between bg-primary text-white">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px] sm:text-sm italic">{t.dashboard.today}</p>
                                        <h4 className="text-3xl sm:text-5xl font-black tracking-tight">{bookedTime}</h4>
                                    </div>
                                    <p className="text-lg sm:text-2xl text-white/70 font-bold leading-relaxed italic max-w-2xl">
                                        {bookedMentor ? bookedMentor.desc : t.dashboard.quoteCustomer}
                                    </p>
                                </div>
                                <div className="mt-8 sm:mt-12">
                                    <Button asChild className="h-16 sm:h-20 bg-accent hover:bg-accent/90 text-white rounded-2xl sm:rounded-[28px] px-8 sm:px-12 text-xl sm:text-2xl font-black shadow-2xl shadow-black/20 group/btn transition-all active:scale-95 hover:-translate-y-1 w-full sm:w-auto">
                                        <Link href={`/room/${bookedMentor?.id ?? 1}`} className="flex items-center justify-center gap-3 sm:gap-4">
                                            {t.dashboard.roomBtn}
                                            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover/btn:translate-x-3 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Secondary Info ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="rounded-[40px] p-10 bg-white border border-black/5">
                        <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                            <MessageCircle size={24} className="text-accent" />
                            {t.dashboard.lastMessage}
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4 p-4 rounded-3xl bg-[#FAF9F6] border border-black/5">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-2xl">👴</div>
                                <div>
                                    <p className="font-black text-primary">Opa Adriel</p>
                                    <p className="text-muted-foreground font-medium line-clamp-1">{t.dashboard.lastMsgBodyCustomer}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-[40px] p-10 bg-white border border-black/5 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                            <Star size={40} fill="currentColor" />
                        </div>
                        <h3 className="text-2xl font-black text-primary mb-2">{t.dashboard.achievementTitle}</h3>
                        <p className="text-muted-foreground font-bold italic">{t.dashboard.achievementDesc}</p>
                    </Card>
                </div>

            </div>
        </main>
    );
}
