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
        [...Array(30)].map((_, i) => ({
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 0.8}s`,
            color: ['#D97706', '#1A365D', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 6)],
            isCircle: Math.random() > 0.5,
            size: 6 + Math.random() * 8
        })), []);

    const handleSubmit = () => {
        if (rating > 0) {
            setSubmitted(true);
        }
    };

    return (
        <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center py-20 px-4 relative overflow-hidden">
            {!submitted ? (
                <Card className="max-w-xl w-full rounded-[60px] p-12 text-center border-none shadow-2xl bg-white shadow-primary/5 relative z-10">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[35px] flex items-center justify-center mx-auto mb-10 shadow-xl animate-bounce">
                        <CheckCircle size={56} />
                    </div>

                    <h1 className="text-5xl font-black text-primary mb-4">{t.feedback.title}!</h1>
                    <p className="text-xl text-muted-foreground font-bold italic mb-12">
                        {t.feedback.desc}
                    </p>

                    <div className="space-y-10">
                        <div>
                            <p className="text-lg font-black uppercase tracking-widest text-primary/40 mb-6">{t.feedback.rate}</p>
                            <div className="flex justify-center gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="transition-all hover:scale-125"
                                    >
                                        <Star
                                            size={48}
                                            fill={star <= rating ? "#F59E0B" : "none"}
                                            className={star <= rating ? "text-amber-500" : "text-primary/10"}
                                            strokeWidth={3}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#FAF9F6] p-8 rounded-[40px] border border-black/5 text-left">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                                    <Gift size={28} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-primary">{t.feedback.gratitude}</h3>
                                    <p className="text-muted-foreground font-bold italic text-sm">{bookedMentor?.name ?? "Maestro Sowan"}</p>
                                </div>
                            </div>
                            <textarea
                                className="w-full h-32 bg-white border-2 border-primary/5 rounded-3xl p-6 text-primary font-medium focus:ring-accent focus:border-accent transition-all resize-none"
                                placeholder={t.feedback.placeholder}
                            ></textarea>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className={`w-full h-20 text-white rounded-[32px] text-2xl font-black shadow-2xl transition-all hover:-translate-y-2 ${rating > 0 ? 'bg-primary hover:bg-primary/95 shadow-primary/20' : 'bg-slate-300 cursor-not-allowed'}`}
                        >
                            {t.feedback.backHome}
                        </Button>
                    </div>
                </Card>
            ) : (
                <Card className="max-w-xl w-full rounded-[60px] p-12 text-center border-none shadow-2xl bg-white shadow-primary/5 relative z-10">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[35px] flex items-center justify-center mx-auto mb-10 shadow-xl">
                        <CheckCircle size={56} />
                    </div>

                    <h1 className="text-5xl font-black text-primary mb-4">Terima Kasih! 🎉</h1>
                    <p className="text-xl text-muted-foreground font-bold italic mb-12">
                        Masukan Anda sangat berarti untuk kami
                    </p>

                    <div className="flex justify-center gap-3 mb-8">
                        {[1,2,3,4,5].map(s => (
                            <Star key={s} size={32} fill={s <= rating ? "#F59E0B" : "none"} className={s <= rating ? "text-amber-500" : "text-primary/10"} />
                        ))}
                    </div>

                    <Button asChild className="w-full h-20 bg-accent hover:bg-accent/90 text-white rounded-[32px] text-2xl font-black shadow-2xl shadow-accent/20 transition-all hover:-translate-y-2">
                        <Link href="/explore" className="flex items-center justify-center gap-4">
                            <Home size={28} />
                            {t.feedback.backHome}
                        </Link>
                    </Button>
                </Card>
            )}

            {submitted && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {confettiPieces.map((piece, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: piece.left,
                                animationDelay: piece.delay,
                                backgroundColor: piece.color,
                                width: `${piece.size}px`,
                                height: `${piece.size}px`,
                                borderRadius: piece.isCircle ? '50%' : '2px'
                            }}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
