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
            setBookedTime(`${t.dashboard.today}, ${startStr} - ${endStr} ${t.home.timezone}`);
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

                    {/* Booking Ticket Card */}
                    <div className="bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden border-2 border-dashed border-primary/20 shadow-xl">
                        <div className="flex flex-col lg:flex-row">
                            {/* Left: Mentor Photo */}
                            <div className="lg:w-[280px] relative h-48 sm:h-64 lg:h-auto overflow-hidden bg-primary/5">
                                <img
                                    src={bookedMentor ? bookedMentor.image : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"}
                                    alt={bookedMentor ? bookedMentor.name : "Mentor"}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center">
                                        <p className="font-black text-primary text-lg">{bookedMentor ? bookedMentor.name : "Opa Adriel"}</p>
                                        <p className="text-primary/60 text-sm font-medium">{bookedMentor ? bookedMentor.title : "Pakar Sejarah Jawa"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: Booking Details */}
                            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                <div className="space-y-6">
                                    {/* Status Badge */}
                                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full w-fit font-bold text-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                        CONFIRMED ✓
                                    </div>

                                    {/* Time & Date */}
                                    <div className="space-y-2">
                                        <p className="text-primary/50 font-bold uppercase tracking-wider text-xs">{t.dashboard.today}</p>
                                        <p className="text-3xl sm:text-4xl font-black text-primary">{bookedTime}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-black text-accent">{bookedMentor ? bookedMentor.price : "Rp 100.000"}</span>
                                        <span className="text-primary/40 font-medium">/ sesi</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-6">
                                    <Button asChild className="w-full h-14 sm:h-16 bg-accent hover:bg-accent/90 text-white rounded-2xl sm:rounded-[28px] text-lg sm:text-xl font-black shadow-xl shadow-accent/20 group/btn transition-all active:scale-95 hover:-translate-y-1">
                                        <Link href={`/room/${bookedMentor?.id ?? 1}`} className="flex items-center justify-center gap-3">
                                            {t.dashboard.roomBtn}
                                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-2 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Right: QR/Ticket Stub */}
                            <div className="hidden lg:flex w-[120px] flex-col items-center justify-center bg-primary/5 p-6 border-l-2 border-dashed border-primary/10">
                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <span className="text-3xl">🎫</span>
                                    </div>
                                </div>
                                <p className="text-primary/50 font-bold text-xs uppercase tracking-wider text-center">E-Ticket</p>
                                <p className="text-primary font-black text-lg text-center">SOWAN</p>
                            </div>
                        </div>

                        {/* Ticket Perforation Line */}
                        <div className="h-0 w-full border-t-2 border-dashed border-primary/10 -mt-px"></div>

                        {/* Additional Info Row */}
                        <div className="bg-primary/5 p-4 sm:p-6 flex flex-wrap gap-4 sm:gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-primary/60 font-medium">Video Call 1-on-1</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <span className="text-primary/60 font-medium">60 Menit</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-primary/60 font-medium">Escrow Protected</span>
                            </div>
                        </div>
                    </div>
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
