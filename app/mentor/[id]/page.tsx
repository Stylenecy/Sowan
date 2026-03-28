'use client';

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Globe, Star, Clock, Heart, ArrowLeft, Calendar, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function MentorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { t } = useLanguage();
    const router = useRouter();
    const mentorId = parseInt(id);
    const { user, setShowLoginModal } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const mentors = [
        {
            id: 1,
            name: "Opa Adriel",
            age: 68,
            title: "Pakar Sejarah Jawa",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Bahasa Jawa",
            about: "Saya adalah pensiunan guru sejarah yang telah mengajar selama 40 tahun lebih. Bagi saya, masa pensiun bukanlah akhir untuk berhenti berbagi, namun adalah lembaran baru untuk lebih intim bercerita dengan generasi muda. Saya menantikan percakapan yang hangat, mulai dari filosofi kehidupan budaya Jawa hingga kisah-kisah kecil masa lampau yang mungkin sulit Anda temukan di buku.",
            experiences: ["40 Tahun Guru Sejarah", "Penulis Buku Budaya", "Pemandu Wisata Sejarah"],
            interests: ["Sejarah Jawa", "Filosofi Hidup", "Pewayangan"],
            price: "Rp 100.000",
            rating: 4.9,
            reviewsCount: 120,
        }
    ];

    const foundMentor = mentors.find(m => m.id === mentorId) || mentors[0];

    const handleOpenModal = () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        setIsModalOpen(true);
        setIsSuccess(false);
        setIsProcessing(false);
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsSuccess(true);
            setTimeout(() => router.push("/dashboard/customer"), 2000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-foreground pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <button 
                    onClick={() => router.back()} 
                    className="group mb-12 flex items-center gap-3 text-primary/60 hover:text-primary font-bold transition-all text-xl"
                >
                    <ArrowLeft size={28} className="group-hover:-translate-x-2 transition-transform" />
                    {t.shared.back}
                </button>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* LEFTSIDE: Profile Overview */}
                    <div className="w-full lg:w-[450px]">
                        <div className="bg-white rounded-[48px] p-10 border border-black/5 shadow-xl shadow-primary/5 flex flex-col items-center text-center">
                            <div className="relative w-64 h-64 mb-10 rounded-[40px] overflow-hidden border-8 border-[#FAF9F6] shadow-2xl">
                                <Image
                                    src={foundMentor.image}
                                    alt={foundMentor.name}
                                    fill
                                    className="object-cover"
                                    sizes="256px"
                                    priority
                                />
                            </div>
                            
                            <h1 className="text-4xl font-black text-primary mb-2">{foundMentor.name}, {foundMentor.age}</h1>
                            <p className="text-xl text-muted-foreground font-bold mb-8">{foundMentor.title}</p>

                            <div className="grid grid-cols-1 gap-4 w-full text-left">
                                <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-3xl border border-black/5">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                                        <MapPin size={24} />
                                    </div>
                                    <span className="text-lg font-bold text-primary">{foundMentor.location}</span>
                                </div>
                                <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-3xl border border-black/5">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm">
                                        <Globe size={24} />
                                    </div>
                                    <span className="text-lg font-bold text-primary">{foundMentor.language}</span>
                                </div>
                                <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-3xl border border-amber-100">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-amber-500 shadow-sm">
                                        <Star size={24} fill="currentColor" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-black text-amber-700">{foundMentor.rating} / 5.0</span>
                                        <span className="text-sm font-bold text-amber-600/60 uppercase tracking-tighter">{foundMentor.reviewsCount} {t.mentor.reviews}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHTSIDE: Content & Layout */}
                    <div className="flex-1 space-y-12">
                        {/* About Section */}
                        <div className="bg-white rounded-[48px] p-10 md:p-12 border border-black/5 shadow-sm">
                            <h2 className="text-3xl font-black text-primary mb-8 flex items-center gap-4">
                                <ShieldCheck size={36} className="text-accent" />
                                {t.mentor.about}
                            </h2>
                            <p className="text-2xl text-muted-foreground leading-relaxed font-medium">
                                {foundMentor.about}
                            </p>
                        </div>

                        {/* Experience and Interests Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-white rounded-[48px] p-10 border border-black/5 shadow-sm">
                                <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-4">
                                    <Clock size={28} className="text-accent" />
                                    {t.mentor.exp}
                                </h3>
                                <ul className="space-y-6">
                                    {foundMentor.experiences.map((exp: string, i: number) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="w-3 h-3 rounded-full bg-accent mt-3 shrink-0" />
                                            <p className="text-xl text-primary/80 font-bold">{exp}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-[48px] p-10 border border-black/5 shadow-sm">
                                <h3 className="text-2xl font-black text-primary mb-8 flex items-center gap-4">
                                    <Heart size={28} className="text-accent" />
                                    {t.mentor.interests}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {foundMentor.interests.map((tag: string) => (
                                        <span key={tag} className="px-6 py-3 bg-[#FAF9F6] border-2 border-primary/5 rounded-2xl text-lg font-bold text-primary hover:border-accent hover:text-accent transition-all cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="bg-primary rounded-[48px] p-10 md:p-14 text-white shadow-2xl shadow-primary/30 flex flex-col md:flex-row items-center justify-between gap-8 transform hover:scale-[1.01] transition-transform">
                            <div>
                                <h3 className="text-3xl font-black mb-2">{t.mentor.bookingTitle}</h3>
                                <p className="text-xl text-white/60 font-bold italic">{t.mentor.bookingDesc}</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-5xl font-black">{foundMentor.price}</span>
                                    <span className="text-xl text-white/40 font-bold italic">/ {t.home.sessions}</span>
                                </div>
                                <Button
                                    onClick={handleOpenModal}
                                    className="h-20 px-12 rounded-[28px] bg-accent hover:bg-accent/90 text-white font-black text-2xl shadow-xl shadow-black/20 transition-all hover:-translate-y-2 active:translate-y-0"
                                >
                                    {t.mentor.confirmBtn}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Payment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[48px] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
                        {!isSuccess ? (
                            <div className="p-10 space-y-10">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-primary/5 shadow-xl">
                                        <img src={foundMentor.image} alt={foundMentor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h2 className="text-4xl font-black text-primary">{t.payment.confirm}</h2>
                                    <p className="text-xl text-muted-foreground font-bold mt-2">Maestro {foundMentor.name}</p>
                                </div>

                                <div className="bg-[#FAF9F6] p-8 rounded-[40px] space-y-4">
                                    <div className="flex justify-between items-center text-xl font-bold text-primary/60 italic">
                                        <span>{t.mentor.bookingTitle}</span>
                                        <span>{foundMentor.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl font-bold text-primary/60 italic">
                                        <span>{t.payment.fee}</span>
                                        <span>Rp 5.000</span>
                                    </div>
                                    <div className="h-px bg-primary/10 my-4"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-black text-primary">{t.payment.total}</span>
                                        <span className="text-4xl font-black text-accent">
                                            Rp {(parseInt(foundMentor.price.replace(/\D/g, '')) + 5000).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <Button 
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full h-20 bg-primary hover:bg-primary/95 text-white rounded-[28px] text-2xl font-black shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t.payment.processing}
                                        </div>
                                    ) : (
                                        t.payment.pay
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="p-16 text-center animate-in zoom-in duration-500">
                                <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-bounce">
                                    <CheckCircle size={80} />
                                </div>
                                <h2 className="text-5xl font-black text-primary mb-4">{t.payment.success}</h2>
                                <p className="text-2xl text-muted-foreground font-bold leading-relaxed">
                                    {t.payment.secured.replace('{name}', foundMentor.name)}
                                </p>
                                <div className="mt-12 flex items-center justify-center gap-4 text-primary/30 font-black italic">
                                    <div className="w-6 h-6 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    {t.payment.redirect}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
