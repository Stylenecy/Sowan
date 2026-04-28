'use client';

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Search, MapPin, Globe, Star, ArrowRight, RefreshCcw, ShieldCheck, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function ExplorePage() {
    const router = useRouter();
    const { user, setShowLoginModal } = useAuth();
    const { t } = useLanguage();

    const [selectedCity, setSelectedCity] = useState("All");
    const [selectedLang, setSelectedLang] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedMentor, setSelectedMentor] = useState<any>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedTime, setSelectedTime] = useState("");

    const confettiPieces = useMemo(() =>
        [...Array(20)].map((_, i) => ({
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 0.5}s`,
            color: ['#D97706', '#1A365D', '#10B981', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
            isCircle: Math.random() > 0.5
        })), []);

    const mentors = [
        {
            id: 1,
            name: "Opa Adriel",
            age: 68,
            title: "Pakar Sejarah Jawa",
            badge: "Top Rated",
            badgeType: "top",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Jawa",
            desc: '"Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa."',
            price: "Rp 100.000",
            isOnline: true,
            slots: 3,
        },
        {
            id: 2,
            name: "Ibu Ratna",
            age: 72,
            title: "Mantan Diplomat Internasional",
            badge: "Cultural Expert",
            badgeType: "expert",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Inggris",
            desc: '"Ingin berlatih bahasa Inggris sambil membicarakan isu global masa lalu? Mari Sowan dengan saya."',
            price: "Rp 200.000",
            isOnline: false,
            slots: 0,
        },
        {
            id: 3,
            name: "Bapak Dodi",
            age: 65,
            title: "Pebisnis Kuliner & Budayawan",
            badge: "Cultural Expert",
            badgeType: "expert",
            image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda",
            desc: '"Punya ide bisnis atau sekadar rindu membahas resep masakan tradisional? Ayo kita berdiskusi hangat."',
            price: "Rp 350.000",
            isOnline: true,
            slots: 2,
        },
        {
            id: 4,
            name: "Opa Yohanes",
            age: 70,
            title: "Musisi Keroncong",
            badge: "New",
            badgeType: "new",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&auto=format&fit=crop",
            location: "Surabaya",
            language: "Jawa",
            desc: '"Musik adalah bahasa jiwa. Saya senang berbagi kisah tentang masa keemasan musik keroncong."',
            price: "Rp 150.000",
            isOnline: false,
            slots: 1,
        },
        {
            id: 5,
            name: "Ibu Sri",
            age: 63,
            title: "Pengrajin Batik",
            badge: "Top Rated",
            badgeType: "top",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop",
            location: "Solo",
            language: "Jawa",
            desc: '"Membatik butuh kesabaran luar biasa. Mari mengobrol tentang filosofi di balik pola batik."',
            price: "Rp 120.000",
            isOnline: true,
            slots: 4,
        },
        {
            id: 6,
            name: "Bapak Hasan",
            age: 75,
            title: "Pakar Pertanian",
            badge: "New",
            badgeType: "new",
            image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=400&auto=format&fit=crop",
            location: "Malang",
            language: "Indonesia",
            desc: '"Anak muda sekarang harus tahu cara menanam walau di teras rumah. Ayo berdiskusi urban farming."',
            price: "Rp 80.000",
            isOnline: false,
            slots: 0,
        },
        {
            id: 7,
            name: "Om Bima",
            age: 66,
            title: "Seniman Kriya Kayu",
            badge: "Cultural Expert",
            badgeType: "expert",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Jawa",
            desc: '"Kayu mengajarkan kita kelenturan dan kekuatan. Mari mengopi sambil bercerita tentang seni memahat kehidupan."',
            price: "Rp 110.000",
            isOnline: false,
            slots: 2,
        },
        {
            id: 8,
            name: "Ibu Dian",
            age: 61,
            title: "Mantan Penari Tradisional",
            badge: "Cultural Expert",
            badgeType: "expert",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
            location: "Bali",
            language: "Bali",
            desc: '"Gerak tubuh dapat menguraikan tali penat di pikiran. Saya siap mendengar curhatan Anda dengan sepenuh hati."',
            price: "Rp 180.000",
            isOnline: true,
            slots: 1,
        },
        {
            id: 9,
            name: "Oma Lestari",
            age: 69,
            title: "Ahli Kuliner Sumatera",
            badge: "Top Rated",
            badgeType: "top",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Indonesia",
            desc: '"Resep leluhur punya cerita di baliknya. Sini, cerita sama Oma tentang rindu masakan rumah."',
            price: "Rp 90.000",
            isOnline: false,
            slots: 3,
        },
        {
            id: 10,
            name: "Bapak Ahmad",
            age: 74,
            title: "Pensiunan Pelaut",
            badge: "New",
            badgeType: "new",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
            location: "Makassar",
            language: "Indonesia",
            desc: '"Lautan telah mengajarkan saya arti keikhlasan. Mengarungi gelombang hidup tak sesulit yang kau kira."',
            price: "Rp 100.000",
            isOnline: false,
            slots: 0,
        },
        {
            id: 11,
            name: "Ibu Ningsih",
            age: 64,
            title: "Pedagang Tangguh",
            badge: "Cultural Expert",
            badgeType: "expert",
            image: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=400&auto=format&fit=crop",
            location: "Surabaya",
            language: "Indonesia",
            desc: '"Tidak ada kerja keras yang mengkhianati hasil. Yuk ngobrol soal keberanian memulai usaha dari nol."',
            price: "Rp 70.000",
            isOnline: true,
            slots: 2,
        },
        {
            id: 12,
            name: "Om Tono",
            age: 67,
            title: "Akuntan Senior",
            badge: "New",
            badgeType: "new",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            location: "Semarang",
            language: "Jawa",
            desc: '"Stabilitas finansial mulai dari usia dua puluhan. Mari kita diskusikan hidup nyaman di hari tua."',
            price: "Rp 160.000",
            isOnline: false,
            slots: 1,
        },
        {
            id: 13,
            name: "Bapak Eko",
            age: 71,
            title: "Dosen Sosiologi Pensiunan",
            badge: "Cultural Expert",
            badgeType: "expert",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda",
            desc: '"Mari bedah kegelisahanmu lewat kacamata bermasyarakat. Semua ada benang merahnya."',
            price: "Rp 140.000",
            isOnline: false,
            slots: 0,
        },
        {
            id: 14,
            name: "Ibu Salma",
            age: 62,
            title: "Pelaku Homeopati",
            badge: "New",
            badgeType: "new",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Indonesia",
            desc: '"Terkadang, obat dari hati yang lelah hanyalah secangkir teh seduhan dan pendengar yang baik."',
            price: "Rp 100.000",
            isOnline: false,
            slots: 2,
        }
    ];

    const filteredMentors = useMemo(() => {
        return mentors.filter((mentor) => {
            const matchCity = selectedCity === "All" || mentor.location === selectedCity;
            const matchLanguage = selectedLang === "All" || mentor.language === selectedLang;
            const searchLower = searchQuery.toLowerCase();
            const matchSearch = searchQuery === "" ||
                mentor.name.toLowerCase().includes(searchLower) ||
                mentor.title.toLowerCase().includes(searchLower) ||
                mentor.desc.toLowerCase().includes(searchLower);
            return matchCity && matchLanguage && matchSearch;
        });
    }, [selectedCity, selectedLang, searchQuery]);

    const sortedMentors = [...filteredMentors].sort((a, b) => Number(b.isOnline) - Number(a.isOnline));

    const getDynamicTimeRange = (startOffset: number) => {
        const d = new Date();
        d.setHours(d.getHours() + startOffset);
        d.setMinutes(0);
        d.setSeconds(0);
        const startStr = d.getHours().toString().padStart(2, '0') + ":00";
        d.setHours(d.getHours() + 1);
        const endStr = d.getHours().toString().padStart(2, '0') + ":00";
        return `${startStr} - ${endStr} WIB`;
    };

    const handleOpenModal = (mentor: any) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        if (!mentor.isOnline) return;

        setSelectedTime("Today1");
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

        let timeLabel = "";
        if (selectedTime === "Today1") timeLabel = `${t.dashboard.today}, ${getDynamicTimeRange(1)}`;
        else if (selectedTime === "Today2") timeLabel = `${t.dashboard.today}, ${getDynamicTimeRange(3)}`;
        else if (selectedTime === "Tomorrow1") timeLabel = `${t.dashboard.tomorrow}, 10:00 - 11:00 WIB`;
        else if (selectedTime === "Tomorrow2") timeLabel = `${t.dashboard.tomorrow}, 13:00 - 14:00 WIB`;

        localStorage.setItem("sowan_selected_time", timeLabel);
        localStorage.setItem("sowan_booked_mentor", JSON.stringify(selectedMentor));

        setTimeout(() => {
            setIsSuccess(true);
            setTimeout(() => {
                router.push("/dashboard/customer");
            }, 2000);
        }, 800);
    };

    const getBadgeStyle = (type: string) => {
        switch (type) {
            case "top":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "expert":
                return "bg-purple-100 text-purple-700 border-purple-200";
            case "new":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getBadgeLabel = (type: string) => {
        switch (type) {
            case "top": return t.explore.badgeTopRated;
            case "expert": return t.explore.badgeCulturalExpert;
            case "new": return t.explore.badgeNew;
            default: return "";
        }
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
                    <div className="flex flex-col gap-4">
                        {/* Search Bar */}
                        <div className="relative w-full">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t.explore.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pl-14 pr-6 bg-[#FAF9F6] border-2 border-transparent hover:border-accent/30 focus:border-accent rounded-2xl text-lg text-primary placeholder:text-primary/40 font-medium transition-all outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Filters Row */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                {/* City Filter */}
                                <div className="relative flex-1 sm:flex-none min-w-[200px]">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                                        <SelectTrigger className="w-full pl-12 h-12 sm:h-14 bg-[#FAF9F6] border-2 border-transparent hover:border-accent rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold text-primary transition-all">
                                            <SelectValue placeholder={t.explore.filterLocation} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-2 border-primary/5 rounded-2xl shadow-2xl z-[100] text-primary">
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
                                        <SelectTrigger className="w-full pl-12 h-12 sm:h-14 bg-[#FAF9F6] border-2 border-transparent hover:border-accent rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold text-primary transition-all">
                                            <SelectValue placeholder={t.explore.filterLang} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-2 border-primary/5 rounded-2xl shadow-2xl z-[100] text-primary">
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
                                {(selectedCity !== "All" || selectedLang !== "All" || searchQuery) && (
                                    <button
                                        onClick={() => { setSelectedCity("All"); setSelectedLang("All"); setSearchQuery(""); }}
                                        className="flex items-center gap-2 px-4 py-2 text-accent hover:text-accent/80 font-bold transition-colors group"
                                    >
                                        <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                                        {t.explore.reset}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mentor Grid ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pb-20 pt-4"
                >
                    {sortedMentors.length > 0 ? (
                        sortedMentors.map((mentor) => (
                            <Card
                                key={mentor.id}
                                className={`w-full rounded-[24px] sm:rounded-[32px] border-2 border-transparent hover:border-accent/40 hover:shadow-[0_0_30px_rgb(217,119,6,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group/card ${!mentor.isOnline && 'saturate-[0.7] opacity-75'}`}
                            >
                                <CardHeader className="p-0 relative h-64 sm:h-72 bg-white overflow-hidden">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/70 to-transparent z-[5]"></div>

                                    <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-[8px] text-white/80 px-2 py-1 rounded-md uppercase tracking-widest pointer-events-none z-10">
                                        Source: Unsplash
                                    </div>

                                    {/* Online Status */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black border border-black/5 shadow-lg z-10">
                                        <div className={`w-2 h-2 rounded-full ${mentor.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                                        <span className={mentor.isOnline ? 'text-emerald-700' : 'text-slate-500'}>
                                            {mentor.isOnline ? t.shared.online : t.shared.offline}
                                        </span>
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border ${getBadgeStyle(mentor.badgeType)}`}>
                                            {getBadgeLabel(mentor.badgeType)}
                                        </span>
                                    </div>

                                    {/* Title Badge */}
                                    <div className="absolute bottom-4 left-4 z-10">
                                        <div className="bg-primary/95 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg border border-white/10">
                                            {mentor.title}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-primary group-hover/card:text-accent transition-colors">
                                            {mentor.name}, {mentor.age}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-sm font-black">4.9</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 sm:gap-4 text-primary/60 text-sm font-bold mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-accent" />
                                            {mentor.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe size={14} className="text-accent" />
                                            {mentor.language}
                                        </div>
                                    </div>

                                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed italic line-clamp-2 mb-4">
                                        {mentor.desc}
                                    </p>

                                    {/* Slots Available */}
                                    <div className="flex items-center gap-2 text-xs text-primary/40 font-medium mb-4">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        {mentor.slots} {t.explore.slotsAvailable}
                                    </div>

                                    <div className="mt-auto">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl sm:text-2xl font-black text-primary">{mentor.price}</span>
                                            <span className="text-sm text-muted-foreground font-bold italic">/ {t.dashboard.sessions.replace('Selesai', '').trim()}</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-6 sm:p-8 pt-0 flex flex-col gap-3">
                                    <Button asChild variant="outline" className="w-full h-12 sm:h-14 border-2 border-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl sm:rounded-2xl font-bold text-base transition-all group/info">
                                        <Link href={`/mentor/${mentor.id}`} className="flex items-center justify-center gap-2">
                                            {t.shared.viewProfile}
                                            <ArrowRight size={16} className="group-hover/info:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                    <Button
                                        onClick={() => handleOpenModal(mentor)}
                                        disabled={!mentor.isOnline}
                                        className={`w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl font-extrabold text-base sm:text-lg transition-all ${mentor.isOnline ? 'bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 hover:-translate-y-1' : 'bg-slate-100 text-slate-400 border-none cursor-not-allowed'}`}
                                    >
                                        {mentor.isOnline ? t.explore.bookBtn : t.shared.offline}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="w-full col-span-full py-20 px-4 bg-white rounded-[40px] border border-black/5 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="text-6xl mb-6">🌾</div>
                            <h3 className="text-3xl font-extrabold text-primary mb-3">{t.explore.noResultsTitle}</h3>
                            <p className="text-xl text-muted-foreground max-w-lg mb-8">
                                {t.explore.noResultsDesc}
                            </p>
                            <Button
                                onClick={() => { setSelectedCity("All"); setSelectedLang("All"); setSearchQuery(""); }}
                                className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg"
                            >
                                {t.explore.reset}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Checkout Modal ── */}
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

                                    {/* Progress Steps */}
                                    <div className="flex items-center justify-center gap-2 mb-6">
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm">
                                            <span className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-black">1</span>
                                            {t.payment.step1}
                                        </div>
                                        <div className="w-8 h-px bg-primary/20"></div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary/50 font-bold text-sm">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary/50 flex items-center justify-center text-xs font-black">2</span>
                                            {t.payment.step2}
                                        </div>
                                        <div className="w-8 h-px bg-primary/20"></div>
                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary/50 font-bold text-sm">
                                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary/50 flex items-center justify-center text-xs font-black">3</span>
                                            {t.payment.step3}
                                        </div>
                                    </div>

                                    <div className="relative w-32 h-32 mx-auto mb-6">
                                        <img
                                            src={selectedMentor.image}
                                            alt={selectedMentor.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                                        />
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
                                        <div className="absolute bottom-1 right-1 bg-black/40 backdrop-blur-sm text-[6px] text-white/80 px-1 py-0.5 rounded-sm uppercase tracking-widest pointer-events-none">
                                            Source: Unsplash
                                        </div>
                                        <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                            <CheckCircle size={18} className="text-white" />
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
                                                <SelectValue placeholder={t.mentor.selectTime} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-2 border-primary/5 rounded-2xl shadow-2xl z-[100] text-primary font-bold">
                                                <SelectItem value="Today1">{t.dashboard.today}, {getDynamicTimeRange(1)}</SelectItem>
                                                <SelectItem value="Today2">{t.dashboard.today}, {getDynamicTimeRange(3)}</SelectItem>
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
                                                Memproses pembayaran aman...
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
                            <div className="p-12 text-center flex flex-col items-center relative overflow-hidden">
                                {/* Confetti */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                    {confettiPieces.map((piece, i) => (
                                        <div
                                            key={i}
                                            className="absolute animate-confetti"
                                            style={{
                                                left: piece.left,
                                                animationDelay: piece.delay,
                                                backgroundColor: piece.color,
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: piece.isCircle ? '50%' : '2px'
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce transition-transform">
                                    <CheckCircle size={56} />
                                </div>
                                <h2 className="relative z-10 text-4xl font-black text-primary mb-4">{t.payment.bookingConfirmed}</h2>
                                <p className="relative z-10 text-xl text-muted-foreground font-medium leading-relaxed">
                                    {t.payment.secured.replace('{name}', selectedMentor.name)}
                                </p>
                                <div className="relative z-10 mt-10 flex items-center gap-3 text-primary/40 font-bold italic">
                                    <div className="w-5 h-5 border-2 border-primary/20 border-t-primary/60 rounded-full animate-spin" />
                                    {t.payment.redirect}
                                </div>
                            </div>
                        )}
                    </div>

                    <style jsx global>{`
                        @keyframes confetti {
                            0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
                            100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
                        }
                        .animate-confetti {
                            animation: confetti 1.5s ease-out forwards;
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}