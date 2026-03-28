'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Search, Filter, MapPin, Globe, Star, ArrowRight, ArrowLeft, RefreshCcw, ShieldCheck, MessageCircle, Navigation, CheckCircle, User2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ExplorePage() {
    const router = useRouter();
    const { user, setShowLoginModal } = useAuth();
    const { t } = useLanguage();
    
    // Filter state
    const [selectedCity, setSelectedCity] = useState("All");
    const [selectedLang, setSelectedLang] = useState("All");

    // Modal state
    const [selectedMentor, setSelectedMentor] = useState<any>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");

    // Scroll ref
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const mentors = [
        {
            id: 1,
            name: "Opa Adriel",
            age: 68,
            title: "Pakar Sejarah Jawa",
            badge: "Teman Sowan",
            badgeColor: "bg-slate-100 text-slate-700",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Jawa",
            desc: '"Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa."',
            price: "Rp 100.000",
            isOnline: true,
        },
        {
            id: 2,
            name: "Ibu Ratna",
            age: 72,
            title: "Mantan Diplomat Internasional",
            badge: "Pemandu Lokal",
            badgeColor: "bg-emerald-100 text-emerald-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Inggris",
            desc: '"Ingin berlatih bahasa Inggris sambil membicarakan isu global masa lalu? Mari Sowan dengan saya."',
            price: "Rp 200.000",
            isOnline: false,
        },
        {
            id: 3,
            name: "Bapak Dodi",
            age: 65,
            title: "Pebisnis Kuliner & Budayawan",
            badge: "Tokoh Budaya",
            badgeColor: "bg-[#D97706]/10 text-[#D97706]",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda",
            desc: '"Punya ide bisnis atau sekadar rindu membahas resep masakan tradisional? Ayo kita berdiskusi hangat."',
            price: "Rp 350.000",
            isOnline: true,
        },
        {
            id: 4,
            name: "Opa Yohanes",
            age: 70,
            title: "Musisi Kerocong",
            badge: "Seniman",
            badgeColor: "bg-blue-100 text-blue-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
            location: "Surabaya",
            language: "Jawa",
            desc: '"Musik adalah bahasa jiwa. Saya senang berbagi kisah tentang masa keemasan musik keroncong."',
            price: "Rp 150.000",
            isOnline: false,
        },
        {
            id: 5,
            name: "Ibu Sri",
            age: 63,
            title: "Pengrajin Batik",
            badge: "Kreator Lokal",
            badgeColor: "bg-purple-100 text-purple-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop",
            location: "Solo",
            language: "Jawa",
            desc: '"Membatik butuh kesabaran luar biasa. Mari mengobrol tentang filosofi di balik pola batik."',
            price: "Rp 120.000",
            isOnline: true,
        },
        {
            id: 6,
            name: "Bapak Hasan",
            age: 75,
            title: "Pakar Pertanian",
            badge: "Teman Sowan",
            badgeColor: "bg-slate-100 text-slate-700",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&auto=format&fit=crop",
            location: "Malang",
            language: "Indonesia",
            desc: '"Anak muda sekarang harus tahu cara menanam walau di teras rumah. Ayo berdiskusi urban farming."',
            price: "Rp 80.000",
            isOnline: false,
        },
        {
            id: 7,
            name: "Om Bima",
            age: 66,
            title: "Seniman Kriya Kayu",
            badge: "Pemandu Lokal",
            badgeColor: "bg-[#D97706]/10 text-[#D97706]",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Jawa",
            desc: '"Kayu mengajarkan kita kelenturan dan kekuatan. Mari mengopi sambil bercerita tentang seni memahat kehidupan."',
            price: "Rp 110.000",
            isOnline: false,
        },
        {
            id: 8,
            name: "Ibu Dian",
            age: 61,
            title: "Mantan Penari Tradisional",
            badge: "Seniman",
            badgeColor: "bg-blue-100 text-blue-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
            location: "Bali",
            language: "Bali",
            desc: '"Gerak tubuh dapat menguraikan tali penat di pikiran. Saya siap mendengar curhatan Anda dengan sepenuh hati."',
            price: "Rp 180.000",
            isOnline: true,
        },
        {
            id: 9,
            name: "Oma Lestari",
            age: 69,
            title: "Ahli Kuliner Sumatera",
            badge: "Tokoh Budaya",
            badgeColor: "bg-[#D97706]/10 text-[#D97706]",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Indonesia",
            desc: '"Resep leluhur punya cerita di baliknya. Sini, cerita sama Oma tentang rindu masakan rumah."',
            price: "Rp 90.000",
            isOnline: false,
        },
        {
            id: 10,
            name: "Bapak Ahmad",
            age: 74,
            title: "Pensiunan Pelaut",
            badge: "Teman Sowan",
            badgeColor: "bg-slate-100 text-slate-700",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop",
            location: "Makassar",
            language: "Indonesia",
            desc: '"Lautan telah mengajarkan saya arti keikhlasan. Mengarungi gelombang hidup tak sesulit yang kau kira."',
            price: "Rp 100.000",
            isOnline: false,
        },
        {
            id: 11,
            name: "Ibu Ningsih",
            age: 64,
            title: "Pedagang Tangguh",
            badge: "Pemandu Lokal",
            badgeColor: "bg-emerald-100 text-emerald-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=400&auto=format&fit=crop",
            location: "Surabaya",
            language: "Indonesia",
            desc: '"Tidak ada kerja keras yang mengkhianati hasil. Yuk ngobrol soal keberanian memulai usaha dari nol."',
            price: "Rp 70.000",
            isOnline: true,
        },
        {
            id: 12,
            name: "Om Tono",
            age: 67,
            title: "Akuntan Senior",
            badge: "Teman Sowan",
            badgeColor: "bg-slate-100 text-slate-700",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
            location: "Semarang",
            language: "Jawa",
            desc: '"Stabilitas finansial mulai dari usia dua puluhan. Mari kita diskusikan hidup nyaman di hari tua."',
            price: "Rp 160.000",
            isOnline: false,
        },
        {
            id: 13,
            name: "Bapak Eko",
            age: 71,
            title: "Dosen Sosiologi Pensiunan",
            badge: "Tokoh Budaya",
            badgeColor: "bg-[#D97706]/10 text-[#D97706]",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda",
            desc: '"Mari bedah kegelisahanmu lewat kacamata bermasyarakat. Semua ada benang merahnya."',
            price: "Rp 140.000",
            isOnline: false,
        },
        {
            id: 14,
            name: "Ibu Salma",
            age: 62,
            title: "Pelaku Homeopati",
            badge: "Kreator Lokal",
            badgeColor: "bg-purple-100 text-purple-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Indonesia",
            desc: '"Terkadang, obat dari hati yang lelah hanyalah secangkir teh seduhan dan pendengar yang baik."',
            price: "Rp 100.000",
            isOnline: false,
        }
    ];

    const filteredMentors = mentors.filter((mentor) => {
        const matchCity = selectedCity === "All" || mentor.location === selectedCity;
        const matchLanguage = selectedLang === "All" || mentor.language === selectedLang;
        return matchCity && matchLanguage;
    });

    const sortedMentors = [...filteredMentors].sort((a, b) => Number(b.isOnline) - Number(a.isOnline));

    const handleOpenModal = (mentor: any) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        if (!mentor.isOnline) return;
        
        const nextHour = new Date().getHours() + 1;
        const defaultTime = `Hari Ini, ${nextHour}.00 - ${nextHour + 1}.00 WIB`;
        setSelectedTime(defaultTime);
        
        setSelectedMentor(mentor);
        setIsSuccess(false);
        setIsProcessing(false);
    };

    const handleCloseModal = () => {
        if (!isProcessing) {
            setSelectedMentor(null);
            setIsSuccess(false);
        }
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/dashboard/customer");
            }, 2000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6]">
            {/* ── Header Section ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 tracking-tight">
                        {t.explore.title}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {t.explore.subtitle}
                    </p>
                </div>
            </div>

            {/* ── Filter Bar ── */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-black/5 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                            {/* City Filter */}
                            <div className="relative flex-1 sm:flex-none min-w-[200px]">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                                <Select value={selectedCity} onValueChange={setSelectedCity}>
                                    <SelectTrigger className="w-full pl-12 h-14 bg-[#FAF9F6] border-2 border-transparent hover:border-accent rounded-2xl text-lg font-bold text-primary transition-all">
                                        <SelectValue placeholder={t.explore.filterLocation} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">{t.explore.allCities}</SelectItem>
                                        <SelectItem value="Jakarta">Jakarta</SelectItem>
                                        <SelectItem value="Bandung">Bandung</SelectItem>
                                        <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                                        <SelectItem value="Surabaya">Surabaya</SelectItem>
                                        <SelectItem value="Solo">Solo</SelectItem>
                                        <SelectItem value="Malang">Malang</SelectItem>
                                        <SelectItem value="Semarang">Semarang</SelectItem>
                                        <SelectItem value="Bali">Bali</SelectItem>
                                        <SelectItem value="Makassar">Makassar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Language Filter */}
                            <div className="relative flex-1 sm:flex-none min-w-[200px]">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                                <Select value={selectedLang} onValueChange={setSelectedLang}>
                                    <SelectTrigger className="w-full pl-12 h-14 bg-[#FAF9F6] border-2 border-transparent hover:border-accent rounded-2xl text-lg font-bold text-primary transition-all">
                                        <SelectValue placeholder={t.explore.filterLang} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">{t.explore.allLangs}</SelectItem>
                                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                                        <SelectItem value="Jawa">Jawa</SelectItem>
                                        <SelectItem value="Sunda">Sunda</SelectItem>
                                        <SelectItem value="Inggris">Inggris</SelectItem>
                                        <SelectItem value="Bali">Bali</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Reset Button */}
                            {(selectedCity !== "All" || selectedLang !== "All") && (
                                <button
                                    onClick={() => { setSelectedCity("All"); setSelectedLang("All"); }}
                                    className="flex items-center gap-2 px-6 py-2 text-accent hover:text-accent/80 font-bold transition-colors group"
                                >
                                    <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                                    {t.explore.reset}
                                </button>
                            )}
                        </div>
                        
                        <div className="flex gap-3">
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => scroll('left')}
                                className="rounded-2xl h-14 w-14 border-2 border-primary/10 hover:border-primary text-primary hover:bg-primary/5 transition-all"
                            >
                                <ChevronLeft size={24} />
                            </Button>
                            <Button 
                                variant="outline" 
                                size="icon" 
                                onClick={() => scroll('right')}
                                className="rounded-2xl h-14 w-14 border-2 border-primary/10 hover:border-primary text-primary hover:bg-primary/5 transition-all"
                            >
                                <ChevronRight size={24} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mentor List ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div 
                    ref={scrollContainerRef}
                    className="grid grid-rows-2 grid-flow-col overflow-x-auto gap-8 pb-12 pt-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style dangerouslySetInnerHTML={{__html: `
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                    `}} />
                    
                    {sortedMentors.length > 0 ? (
                        sortedMentors.map((mentor) => (
                            <Card key={mentor.id} className={`w-[320px] md:w-[380px] rounded-[40px] border border-black/5 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col group/card ${!mentor.isOnline && 'saturate-[0.7] opacity-80'}`}>
                                <CardHeader className="p-0 relative h-48 sm:h-56 bg-white overflow-hidden">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black border border-black/5 shadow-lg z-10">
                                        <div className={`w-2 h-2 rounded-full ${mentor.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                                        <span className={mentor.isOnline ? 'text-emerald-700' : 'text-slate-500 uppercase'}>
                                            {mentor.isOnline ? t.shared.online : t.shared.offline}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="bg-white/95 backdrop-blur-md text-primary px-4 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                                            {mentor.title}
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-extrabold text-primary group-hover/card:text-accent transition-colors">
                                            {mentor.name}, {mentor.age}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-sm font-black">4.9</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-primary/60 text-sm font-bold mb-6">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-accent" />
                                            {mentor.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe size={16} className="text-accent" />
                                            {mentor.language}
                                        </div>
                                    </div>

                                    <p className="text-lg text-muted-foreground leading-relaxed italic line-clamp-2 mb-6">
                                        {mentor.desc}
                                    </p>
                                    
                                    <div className="mt-auto">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-primary">{mentor.price}</span>
                                            <span className="text-sm text-muted-foreground font-bold italic">/ {t.dashboard.sessions.replace('Selesai', '').trim()}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-8 pt-0 flex flex-col gap-3">
                                    <Button asChild variant="outline" className="w-full h-14 border-2 border-primary/10 text-primary hover:bg-primary/5 hover:border-primary/30 rounded-2xl font-bold text-lg transition-all group/info">
                                        <Link href={`/mentor/${mentor.id}`} className="flex items-center justify-center gap-2">
                                            {t.shared.explore}
                                            <ArrowRight size={18} className="group-hover/info:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    <Button 
                                        onClick={() => handleOpenModal(mentor)}
                                        disabled={!mentor.isOnline}
                                        className={`w-full h-14 rounded-2xl font-extrabold text-lg transition-all ${mentor.isOnline ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 hover:-translate-y-1' : 'bg-slate-100 text-slate-400 border-none cursor-not-allowed'}`}
                                    >
                                        {mentor.isOnline ? t.explore.bookBtn : t.shared.offline}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="w-full col-span-full py-20 px-4 bg-white rounded-[40px] border border-black/5 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                                <Search size={48} className="text-primary/20" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-primary mb-3">{t.explore.noResultsTitle}</h3>
                            <p className="text-xl text-muted-foreground max-w-lg mb-8">
                                {t.explore.noResultsDesc}
                            </p>
                            <Button 
                                onClick={() => { setSelectedCity("All"); setSelectedLang("All"); }}
                                className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg"
                            >
                                {t.explore.reset}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Premium Checkout Modal ── */}
            {selectedMentor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[40px] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300">
                        {!isSuccess ? (
                            <div className="flex flex-col">
                                <div className="p-8 pb-6 text-center relative">
                                    <button 
                                        onClick={handleCloseModal}
                                        className="absolute top-6 right-6 text-primary/40 hover:text-primary bg-primary/5 hover:bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center transition-all"
                                    >×</button>
                                    
                                    <div className="relative w-28 h-28 mx-auto mb-6">
                                        <img 
                                            src={selectedMentor.image} 
                                            alt={selectedMentor.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                                            <CheckCircle size={14} className="text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-black text-primary">{t.mentor.bookingTitle}</h2>
                                    <p className="text-muted-foreground font-medium mt-1">{t.mentor.bookingSubtitle.replace('{name}', selectedMentor.name)}</p>
                                </div>

                                <div className="px-8 pb-10 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-wider text-primary/40 ml-1">{t.mentor.selectTime}</label>
                                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                                            <SelectTrigger className="w-full h-14 bg-white border-2 border-primary/5 rounded-2xl px-4 text-lg font-bold text-primary focus:ring-accent transition-all">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl border-2 border-primary/5 shadow-xl">
                                                <SelectItem value="Today1">{t.dashboard.today}, 14:00 - 15:00 WIB</SelectItem>
                                                <SelectItem value="Today2">{t.dashboard.today}, 16:30 - 17:30 WIB</SelectItem>
                                                <SelectItem value="Tomorrow1">{t.dashboard.tomorrow}, 10:00 - 11:00 WIB</SelectItem>
                                                <SelectItem value="Tomorrow2">{t.dashboard.tomorrow}, 13:00 - 14:00 WIB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="bg-[#FAF9F6] p-6 rounded-3xl space-y-3">
                                        <div className="flex justify-between items-center text-primary/60 font-bold">
                                            <span>{t.payment.fee}</span>
                                            <span>{selectedMentor.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-primary/60 font-bold">
                                            <span>{t.payment.appFee}</span>
                                            <span>Rp 5.000</span>
                                        </div>
                                        <div className="h-px bg-primary/5 my-2"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-black text-primary">Total</span>
                                            <span className="text-3xl font-black text-accent">
                                                Rp {(parseInt(selectedMentor.price.replace(/\D/g, '')) + 5000).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                {t.payment.processing}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck size={24} className="group-hover:animate-pulse" />
                                                {t.payment.confirmPay}
                                            </div>
                                        )}
                                    </Button>
                                    <p className="text-[10px] text-center text-primary/30 font-bold uppercase tracking-widest px-4">
                                        🛡️ Aman • Transparan • Terpercaya • Sowan Escrow
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center">
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce transition-transform">
                                    <CheckCircle size={56} />
                                </div>
                                <h2 className="text-4xl font-black text-primary mb-4">{t.payment.success}</h2>
                                <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                    {t.payment.secured.replace('{name}', selectedMentor.name)}
                                </p>
                                <div className="mt-10 flex items-center gap-3 text-primary/40 font-bold italic">
                                    <div className="w-5 h-5 border-2 border-primary/20 border-t-primary/60 rounded-full animate-spin" />
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
