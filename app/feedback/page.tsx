'use client';

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Star, CheckCircle, Home, Heart, Gift, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function FeedbackPage() {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [bookedMentor, setBookedMentor] = useState<any>(null);

    React.useEffect(() => {
        const stored = localStorage.getItem("sowan_booked_mentor");
        if (stored) {
            try {
                setBookedMentor(JSON.parse(stored));
            } catch {}
        }
    }, []);

    const confettiPieces = useMemo(() =>
        [...Array(12)].map((_, i) => ({
            left: `${10 + Math.random() * 80}%`,
            delay: `${Math.random() * 0.8}s`,
            size: 60 + Math.random() * 40
        })), []);

    const handleSubmit = () => {
        if (rating > 0) {
            setSubmitted(true);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100 rounded-full blur-[100px] opacity-60" />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-4">
                {!submitted ? (
                    <Card className="max-w-xl w-full rounded-[40px] p-10 text-center border-none shadow-2xl bg-white shadow-primary/5">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <CheckCircle size={52} />
                        </div>

                        <h1 className="text-4xl font-black text-primary mb-3">{t.feedback.title}!</h1>
                        <p className="text-lg text-muted-foreground font-bold italic mb-10">
                            {t.feedback.desc}
                        </p>

                        <div className="space-y-10">
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-primary/40 mb-6">{t.feedback.rate}</p>
                                <div className="flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transition-all hover:scale-110"
                                        >
                                            <Star
                                                size={44}
                                                fill={star <= rating ? "#F59E0B" : "none"}
                                                className={star <= rating ? "text-amber-500" : "text-primary/10"}
                                                strokeWidth={2.5}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-[32px] border-2 border-amber-100 text-left">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                                        <Gift size={26} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-primary">{t.feedback.gratitude}</h3>
                                        <p className="text-muted-foreground font-bold italic text-sm">{bookedMentor?.name ?? "Maestro Sowan"}</p>
                                    </div>
                                </div>
                                <textarea
                                    className="w-full h-32 bg-white border-2 border-primary/5 rounded-2xl p-5 text-primary font-medium focus:ring-2 focus:ring-accent focus:border-accent transition-all resize-none text-base"
                                    placeholder={t.feedback.placeholder}
                                ></textarea>
                            </div>

                            <Button
                                onClick={handleSubmit}
                                disabled={rating === 0}
                                className={`w-full h-16 text-white rounded-[24px] text-xl font-black shadow-xl transition-all hover:-translate-y-1 ${rating > 0 ? 'bg-primary hover:bg-primary/95 shadow-primary/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                            >
                                {t.feedback.backHome}
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <Card className="max-w-xl w-full rounded-[40px] p-10 text-center border-none shadow-2xl bg-white shadow-primary/5 relative z-10 overflow-hidden">
                        {/* Confetti */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {confettiPieces.map((piece, i) => (
                                <img
                                    key={i}
                                    src="/logo.png"
                                    alt=""
                                    className="absolute animate-confetti object-contain"
                                    style={{
                                        left: piece.left,
                                        top: '-20px',
                                        animationDelay: piece.delay,
                                        width: `${piece.size}px`,
                                        height: `${piece.size}px`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <CheckCircle size={52} />
                            </div>

                            <h1 className="text-4xl font-black text-primary mb-3">Terima Kasih! 🎉</h1>
                            <p className="text-lg text-muted-foreground font-bold italic mb-8">
                                Masukan Anda sangat berarti untuk kami
                            </p>

                            <div className="flex justify-center gap-2 mb-10">
                                {[1,2,3,4,5].map(s => (
                                    <Star key={s} size={30} fill={s <= rating ? "#F59E0B" : "none"} className={s <= rating ? "text-amber-500" : "text-primary/10"} />
                                ))}
                            </div>

                            <Button asChild className="w-full h-16 bg-accent hover:bg-accent/90 text-white rounded-[24px] text-xl font-black shadow-xl shadow-accent/20 transition-all hover:-translate-y-1">
                                <Link href="/explore" className="flex items-center justify-center gap-3">
                                    <Home size={24} />
                                    {t.feedback.backHome}
                                </Link>
                            </Button>
                        </div>
                    </Card>
                )}
            </div>

            <style jsx global>{`
                @keyframes confetti {
                    0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti 2s ease-out forwards;
                }
            `}</style>
        </main>
    );
}
