'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Star, CheckCircle, Home, Heart, Gift, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export default function FeedbackPage() {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);

    const [bookedMentor, setBookedMentor] = useState<any>(null);

    React.useEffect(() => {
        const storedMentor = localStorage.getItem("sowan_booked_mentor");
        if (storedMentor) {
            setBookedMentor(JSON.parse(storedMentor));
        }
    }, []);

    return (
        <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center py-20 px-4">
            <Card className="max-w-xl w-full rounded-[60px] p-12 text-center border-none shadow-2xl bg-white shadow-primary/5">
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

                    <Button asChild className="w-full h-20 bg-primary hover:bg-primary/95 text-white rounded-[32px] text-2xl font-black shadow-2xl shadow-primary/20 transition-all hover:-translate-y-2">
                        <Link href="/dashboard/customer" className="flex items-center justify-center gap-4">
                            <Home size={28} />
                            {t.feedback.backHome}
                        </Link>
                    </Button>
                </div>
            </Card>
        </main>
    );
}
