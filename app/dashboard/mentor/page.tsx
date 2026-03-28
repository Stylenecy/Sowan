'use client';

import React, { useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Clock, CheckCircle2, ChevronRight, Calendar, Video, Play, ArrowRight, User2, MessageCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MentorDashboard() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const displayName = user?.name ?? "Opa Adriel";

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] font-sans text-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                
                {/* ── Greeting Header ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl lg:text-6xl font-black text-primary mb-2">
                            {t.dashboard.mentorTitle}
                        </h1>
                        <p className="text-2xl text-muted-foreground font-bold italic">
                            {t.shared.hello}{displayName}! 👋
                        </p>
                    </div>
                </div>

                {/* ── Stats Row ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <Card className="rounded-[40px] p-8 border border-black/5 shadow-sm bg-white hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[28px] bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Calendar size={40} />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs mb-1">{t.dashboard.sessions}</p>
                                <h3 className="text-4xl font-black text-primary">128</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-[40px] p-8 border border-black/5 shadow-sm bg-white hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[28px] bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                <Wallet size={40} />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs mb-1">{t.dashboard.earn}</p>
                                <h3 className="text-4xl font-black text-primary">Rp 5.2jt</h3>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-[40px] p-8 border border-black/5 shadow-sm bg-white hover:shadow-xl transition-all group">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[28px] bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                <Star size={40} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs mb-1">{t.dashboard.rating}</p>
                                <h3 className="text-4xl font-black text-primary">4.9</h3>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* ── Upcoming Sessions ── */}
                <div className="mb-16">
                    <h2 className="text-3xl font-black text-primary mb-8 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg">
                            <Calendar size={24} />
                        </div>
                        {t.dashboard.upcoming}
                    </h2>
                    
                    {/* Imeldya Session (Primary for Demo) */}
                    <Card className="rounded-[56px] overflow-hidden border-none shadow-2xl bg-white group/session">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-[400px] relative h-80 lg:h-auto overflow-hidden bg-slate-100">
                                <img 
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" 
                                    alt="Student"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/session:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8">
                                    <div className="inline-flex items-center gap-2 bg-accent text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider mb-3 animate-pulse">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        {t.dashboard.today}
                                    </div>
                                    <h3 className="text-3xl font-black text-white">Imeldya</h3>
                                </div>
                            </div>
                            <div className="p-10 lg:p-14 flex-1 flex flex-col justify-between bg-primary text-white">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-white/40 font-black uppercase tracking-[0.2em] text-sm italic">{t.dashboard.upcoming}</p>
                                        <h4 className="text-5xl font-black tracking-tight">{t.dashboard.sessionTime}</h4>
                                    </div>
                                    <p className="text-2xl text-white/70 font-bold leading-relaxed italic max-w-2xl">
                                        {t.dashboard.quoteMentor}
                                    </p>
                                </div>
                                <div className="mt-12">
                                    <Button asChild className="h-20 bg-accent hover:bg-accent/90 text-white rounded-[28px] px-12 text-2xl font-black shadow-2xl shadow-black/20 group/btn transition-all active:scale-95 hover:-translate-y-1">
                                        <Link href="/room/1" className="flex items-center gap-4">
                                            {t.dashboard.roomBtn}
                                            <ArrowRight size={32} className="group-hover/btn:translate-x-3 transition-transform" />
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
                            {t.dashboard.pendingDiscussion}
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4 p-4 rounded-3xl bg-[#FAF9F6] border border-black/5">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-2xl">👩‍🎓</div>
                                <div>
                                    <p className="font-black text-primary">Imeldya</p>
                                    <p className="text-muted-foreground font-medium line-clamp-1">{t.dashboard.lastMsgBodyMentor}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="rounded-[40px] p-10 bg-white border border-black/5 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                            <Wallet size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-primary mb-2">{t.dashboard.payoutAvailable}</h3>
                        <p className="text-muted-foreground font-bold italic">{t.dashboard.payoutDesc}</p>
                    </Card>
                </div>

            </div>
        </main>
    );
}
