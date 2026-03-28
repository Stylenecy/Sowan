'use client';

import React from "react";
import Link from "next/link";
import { CheckCircle, Home, Wallet, Clock, Star, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function MentorFeedbackPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center py-20 px-4">
            <Card className="max-w-2xl w-full rounded-[60px] p-12 text-center border-none shadow-2xl bg-white shadow-primary/5">
                <div className="w-24 h-24 bg-accent/10 text-accent rounded-[35px] flex items-center justify-center mx-auto mb-10 shadow-xl animate-bounce">
                    <CheckCircle size={56} />
                </div>

                <h1 className="text-5xl font-black text-primary mb-4">{t.feedback.title}!</h1>
                <p className="text-xl text-muted-foreground font-bold italic mb-12">
                    {t.feedback.desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                    <div className="bg-[#FAF9F6] p-8 rounded-[40px] border border-black/5 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white text-accent flex items-center justify-center mb-4 shadow-sm">
                            <Wallet size={32} />
                        </div>
                        <p className="text-primary/40 font-black uppercase tracking-widest text-xs mb-1">{t.feedback.earnings}</p>
                        <h3 className="text-3xl font-black text-primary">Rp 100.000</h3>
                    </div>
                    <div className="bg-[#FAF9F6] p-8 rounded-[40px] border border-black/5 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
                            <Clock size={32} />
                        </div>
                        <p className="text-primary/40 font-black uppercase tracking-widest text-xs mb-1">{t.feedback.duration}</p>
                        <h3 className="text-3xl font-black text-primary">{t.feedback.durationValue}</h3>
                    </div>
                </div>

                <div className="bg-primary rounded-[40px] p-10 text-white mb-12 text-left flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-black mb-2">{t.feedback.gratitudeFrom.replace('{name}', 'Imeldya')}</h3>
                        <p className="text-white/60 font-bold italic leading-relaxed">
                            "{t.feedback.gratitudeMsg}"
                        </p>
                    </div>
                    <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-white shrink-0">
                        <Gift size={40} />
                    </div>
                </div>

                <Button asChild className="w-full h-20 bg-accent hover:bg-accent/90 text-white rounded-[32px] text-2xl font-black shadow-2xl shadow-accent/20 transition-all hover:-translate-y-2 group">
                    <Link href="/dashboard/mentor" className="flex items-center justify-center gap-4">
                        <Home size={28} />
                        {t.feedback.backHome}
                        <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </Button>
            </Card>
        </main>
    );
}
