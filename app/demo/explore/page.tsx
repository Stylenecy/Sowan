'use client';

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Star, Calendar, CheckCircle, X, Clock, Video, ArrowRight } from "lucide-react";

const MENTORS = [
    {
        id: 1,
        name: "Opa Adriel",
        title: "Pakar Sejarah Jawa",
        city: "Yogyakarta",
        rating: 4.9,
        sessions: 24,
        price: 100000,
        topics: ["Sejarah Jawa", "Bahasa Jawa"],
        bio: "Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
        online: true,
        searchTerms: "opa adriel adriel sejarah jawa bahasa jawa yogyakarta pakar sejarah mentor jawa",
    },
    {
        id: 2,
        name: "Kak Maya",
        title: "Ahli Bahasa Jawa",
        city: "Jakarta",
        rating: 4.7,
        sessions: 15,
        price: 80000,
        topics: ["Bahasa Jawa", "Sastra Jawa"],
        bio: "Belajar bahasa Jawa dengan cara yang menyenangkan dan praktis.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
        online: false,
        searchTerms: "kak maya maya bahasa jawa sastra jawa jakarta ahli bahasa",
    },
    {
        id: 3,
        name: "Pak Budi",
        title: "Pakar Kearifan Lokal",
        city: "Bandung",
        rating: 4.8,
        sessions: 31,
        price: 120000,
        topics: ["Kearifan Lokal", "Budaya Jawa"],
        bio: "Mengenal lebih dalam budaya dan kearifan lokal Jawa.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        online: true,
        searchTerms: "pak budi budi kearifan lokal budaya jawa bandung pakar budaya",
    },
];

const STEPS_ID = [
    { icon: "🔍", title: "Cari Mentor", desc: "Ketik nama atau topik yang Anda minati di kolom pencarian." },
    { icon: "🏙️", title: "Filter Kota", desc: "Pilih kota asal mentor yang Anda inginkan." },
    { icon: "👤", title: "Pilih Mentor", desc: "Klik kartu mentor untuk melihat profil lengkap." },
    { icon: "📅", title: "Buat Jadwal", desc: "Pilih waktu dan konfirmasi booking di panel samping." },
    { icon: "🎥", title: "Masuk Ruang", desc: "Gunakan kode booking untuk masuk ke ruang video." },
];

const STEPS_EN = [
    { icon: "🔍", title: "Search Mentor", desc: "Type the name or topic you're interested in." },
    { icon: "🏙️", title: "Filter City", desc: "Select the mentor's city." },
    { icon: "👤", title: "Choose Mentor", desc: "Click mentor card to see full profile." },
    { icon: "📅", title: "Book Schedule", desc: "Select time and confirm booking in the side panel." },
    { icon: "🎥", title: "Join Room", desc: "Use booking code to enter the video room." },
];

const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

type BookingStep = "time" | "confirm" | "success";

export default function DemoExplorePage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const { language } = useLanguage();
    const hasRun = useRef(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMentor, setSelectedMentor] = useState<typeof MENTORS[0] | null>(null);
    const [bookingStep, setBookingStep] = useState<BookingStep>("time");
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [showRoomEntry, setShowRoomEntry] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showSuccessBook, setShowSuccessBook] = useState(false);

    const isID = language === "id";
    const STEPS = isID ? STEPS_ID : STEPS_EN;
    const stepData = STEPS[currentStep];

    useEffect(() => {
        if (hasRun.current || user) return;
        hasRun.current = true;
        login("Dex");
    }, [user, login]);

    const filteredMentors = useMemo(() => {
        return MENTORS.filter((m) => {
            const matchesCity = activeFilter === "all" || m.city === activeFilter;
            const q = searchQuery.toLowerCase();
            const matchesSearch = q === "" || m.searchTerms.includes(q);
            return matchesCity && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    const handleFilterClick = (city: string) => {
        setActiveFilter(city);
        if (currentStep === 1) {
            setTimeout(() => setCurrentStep(2), 500);
        }
    };

    const handleCardClick = (mentor: typeof MENTORS[0]) => {
        setSelectedMentor(mentor);
        setShowSidePanel(true);
        setBookingStep("time");
        setSelectedTime(null);
        setCurrentStep(3);
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setBookingStep("confirm");
        setCurrentStep(4);
    };

    const handleConfirmBooking = () => {
        setBookingStep("success");
        setShowSuccessBook(true);
        setTimeout(() => setShowSuccessBook(false), 3000);
    };

    const handleNextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleClosePanel = () => {
        setShowSidePanel(false);
        setSelectedMentor(null);
        setBookingStep("time");
        setSelectedTime(null);
    };

    const getBubbleText = () => {
        if (showSidePanel && bookingStep === "success") {
            return isID ? "Booking berhasil! Gunakan kode untuk masuk." : "Booking confirmed! Use code to enter.";
        }
        if (showSidePanel) {
            if (bookingStep === "time") return isID ? "Pilih waktu yang tersedia" : "Select available time";
            return isID ? "Konfirmasi booking Anda" : "Confirm your booking";
        }
        return stepData.desc;
    };

    const getBubbleIcon = () => {
        if (showSidePanel && bookingStep === "success") return "✓";
        if (showSidePanel) return "📅";
        return stepData.icon;
    };

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] pt-[72px]">
            {/* Sticky Demo Header */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 py-4 px-6 sticky top-[72px] z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">🔍</span>
                        <div>
                            <h2 className="font-black text-primary">{isID ? "Demo: Jelajahi Mentor" : "Demo: Explore Mentor"}</h2>
                            <p className="text-sm text-muted-foreground">{isID ? "Ikuti panduan langkah demi langkah" : "Follow step-by-step guide"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {STEPS.map((_, i) => (
                                <div key={i} className={"w-3 h-3 rounded-full transition-all " + (i <= currentStep ? "bg-accent" : "bg-primary/20")} />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            {isID ? "Langkah" : "Step"} {currentStep + 1} / {STEPS.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Step Guide */}
            <div className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
                style={{ top: "calc(72px + 4rem)", maxWidth: "90vw" }}>
                <div className="bg-accent text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4"
                    style={{ animation: "demoBounce 2.5s ease-in-out infinite" }}>
                    <span className="text-3xl shrink-0">{getBubbleIcon()}</span>
                    <div className="min-w-0">
                        <p className="font-black text-base whitespace-nowrap">{stepData.title}</p>
                        <p className="text-sm opacity-80 whitespace-nowrap">{getBubbleText()}</p>
                    </div>
                </div>
            </div>

            {/* Bottom-right controls */}
            <div className="fixed bottom-8 right-8 z-50">
                <button onClick={handleNextStep}
                    className="bg-accent hover:bg-accent/90 text-white font-black px-6 py-3 rounded-2xl shadow-xl transition-all active:scale-95">
                    {currentStep < STEPS.length - 1 ? (isID ? "Langkah Berikutnya →" : "Next Step →") : "✓"}
                </button>
            </div>

            {/* Side Panel Overlay */}
            {showSidePanel && selectedMentor && (
                <div className="fixed inset-0 z-50 flex justify-end" onClick={handleClosePanel}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleClosePanel}
                            className="absolute top-4 right-4 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center z-10">
                            <X className="w-5 h-5 text-primary" />
                        </button>

                        {/* Mentor Header */}
                        <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-50">
                            <img src={selectedMentor.image} alt={selectedMentor.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                                <span className={"w-2 h-2 rounded-full inline-block mr-1 " + (selectedMentor.online ? "bg-emerald-500" : "bg-slate-400") + " animate-pulse"} />
                                {selectedMentor.online ? (isID ? "Online" : "Online") : (isID ? "Offline" : "Offline")}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2">
                                    <h3 className="font-black text-primary text-xl">{selectedMentor.name}</h3>
                                    <p className="text-xs text-muted-foreground">{selectedMentor.title}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                                    <strong>{selectedMentor.rating}</strong>
                                </span>
                                <span className="text-primary/30">•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-primary/50" />
                                    {selectedMentor.city}
                                </span>
                                <span className="text-primary/30">•</span>
                                <span>{selectedMentor.sessions} {isID ? "sesi" : "sessions"}</span>
                            </div>

                            <p className="text-sm text-muted-foreground">"{selectedMentor.bio}"</p>

                            <div className="flex gap-2 flex-wrap">
                                {selectedMentor.topics.map((t) => (
                                    <span key={t} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">{t}</span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                                <span className="text-2xl font-black text-primary">Rp {selectedMentor.price.toLocaleString("id-ID")}</span>
                                <span className="text-sm text-primary/50">{isID ? "/ sesi 60 menit" : "/ session 60 min"}</span>
                            </div>

                            {bookingStep === "time" && (
                                <div className="space-y-4">
                                    <h4 className="font-black text-lg">{isID ? "Pilih Waktu" : "Select Time"}</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        {TIME_SLOTS.map((time) => (
                                            <button key={time} onClick={() => handleTimeSelect(time)}
                                                className="px-4 py-3 bg-white border-2 border-primary/20 rounded-xl font-bold text-sm hover:border-accent hover:bg-accent/5 transition-all">
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">{isID ? "Waktu dalam WIB" : "Time in WIB"}</p>
                                </div>
                            )}

                            {bookingStep === "confirm" && selectedTime && (
                                <div className="space-y-4">
                                    <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Calendar className="w-5 h-5 text-accent" />
                                            <div>
                                                <p className="font-black text-lg">{isID ? "Jadwal Pemesanan" : "Booking Summary"}</p>
                                                <p className="text-sm text-muted-foreground">{isID ? "Hari ini" : "Today"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-primary/50" />
                                            <span className="font-bold text-lg">
                                                {selectedTime} - {String(parseInt(selectedTime.split(":")[0]) + 1).padStart(2, "0")}:00
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                                        <Video className="w-4 h-4" />
                                        <span>{isID ? "Video call 60 menit via Sowan Room" : "60 min video call via Sowan Room"}</span>
                                    </div>
                                    <button onClick={handleConfirmBooking}
                                        className="w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg">
                                        ✓ {isID ? "Konfirmasi Booking" : "Confirm Booking"}
                                    </button>
                                    <button onClick={() => setBookingStep("time")}
                                        className="w-full text-sm text-muted-foreground hover:underline py-2">
                                        ← {isID ? "Pilih waktu lain" : "Choose different time"}
                                    </button>
                                </div>
                            )}

                            {bookingStep === "success" && (
                                <div className="space-y-4 text-center">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center text-4xl">✓</div>
                                    <div>
                                        <p className="font-black text-xl text-emerald-600">
                                            {isID ? "Booking Berhasil!" : "Booking Confirmed!"}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {isID
                                                ? "Sesi dengan " + selectedMentor.name + " pada " + selectedTime + " telah dikonfirmasi."
                                                : "Session with " + selectedMentor.name + " at " + selectedTime + " confirmed."}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-4 text-left">
                                        <p className="text-xs text-muted-foreground mb-1">{isID ? "Kode Booking" : "Booking Code"}</p>
                                        <p className="font-black text-2xl tracking-widest text-primary">SW-284751</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleClosePanel();
                                            setShowRoomEntry(true);
                                            setCurrentStep(4);
                                        }}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                                        <Video className="w-5 h-5" />
                                        {isID ? "Masuk Ruang Sowan →" : "Enter Sowan Room →"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Room Entry Modal */}
            {showRoomEntry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-4xl mb-4">🎥</div>
                            <h3 className="font-black text-2xl text-primary">{isID ? "Ruang Sowan" : "Sowan Room"}</h3>
                            <p className="text-muted-foreground text-sm mt-2">
                                {isID ? "Masukkan kode booking untuk bergabung" : "Enter booking code to join"}
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
                            <p className="text-xs text-muted-foreground mb-1">{isID ? "Kode Booking Anda" : "Your Booking Code"}</p>
                            <p className="font-black text-2xl tracking-widest text-center text-primary">SW-284751</p>
                        </div>
                        <button
                            onClick={() => {
                                setShowRoomEntry(false);
                                setShowFeedback(true);
                            }}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                            <Video className="w-5 h-5" />
                            {isID ? "Gabung Ruang Sowan" : "Join Sowan Room"}
                        </button>
                        <button onClick={() => setShowRoomEntry(false)}
                            className="w-full text-sm text-muted-foreground hover:underline mt-4 py-2">
                            {isID ? "Tutup" : "Close"}
                        </button>
                    </div>
                </div>
            )}

            {/* Feedback Preview Modal */}
            {showFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-amber-100 rounded-full mx-auto flex items-center justify-center text-4xl mb-4">⭐</div>
                            <h3 className="font-black text-2xl text-primary">{isID ? "Berikan Apresiasi" : "Give Appreciation"}</h3>
                            <p className="text-muted-foreground text-sm mt-2">
                                {isID ? "Bagaimana pengalaman Anda dengan Opa Adriel?" : "How was your experience with Opa Adriel?"}
                            </p>
                        </div>
                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <button key={i} className="text-4xl hover:scale-110 transition-transform text-amber-400">★</button>
                            ))}
                        </div>
                        <textarea
                            className="w-full p-4 border-2 border-primary/20 rounded-2xl text-sm mb-4 resize-none"
                            placeholder={isID ? "Tulis testimonial Anda..." : "Write your testimonial..."}
                            rows={3}
                        />
                        <button
                            onClick={() => {
                                setShowFeedback(false);
                                setCurrentStep(5);
                            }}
                            className="w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all shadow-lg">
                            ✓ {isID ? "Kirim Apresiasi" : "Submit Appreciation"}
                        </button>
                        <button onClick={() => setShowFeedback(false)}
                            className="w-full text-sm text-muted-foreground hover:underline mt-3 py-2">
                            {isID ? "Lewati" : "Skip"}
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Bar - WORKING */}
                <div className="relative mb-8" id="search">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-6 h-6" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (currentStep === 0 && e.target.value.length > 0) {
                                setTimeout(() => setCurrentStep(1), 500);
                            }
                        }}
                        placeholder={isID ? "Cari nama, topik, atau kota..." : "Search name, topic, or city..."}
                        className="w-full h-16 pl-14 pr-6 bg-white border-2 border-transparent hover:border-accent/30 focus:border-accent rounded-2xl text-lg font-medium shadow-lg transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Filter Bar - WORKING */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4" id="filter">
                    {[
                        { key: "all", label: isID ? "Semua Kota" : "All Cities" },
                        { key: "Yogyakarta", label: "Yogyakarta" },
                        { key: "Jakarta", label: "Jakarta" },
                        { key: "Bandung", label: "Bandung" },
                    ].map((f) => (
                        <button
                            key={f.key}
                            onClick={() => handleFilterClick(f.key)}
                            className={
                                "px-6 py-3 bg-white rounded-full font-bold text-sm border-2 transition-all whitespace-nowrap " +
                                (activeFilter === f.key
                                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                                    : "border-primary/10 hover:border-primary/30")
                            }>
                            {f.label}
                            {f.key !== "all" && (
                                <span className="ml-2 text-primary/40">
                                    {MENTORS.filter((m) => m.city === f.key).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                    {isID ? "Menampilkan" : "Showing"} {filteredMentors.length} {isID ? "mentor" : "mentors"}
                    {searchQuery ? ' untuk "' + searchQuery + '"' : ""}
                </p>

                {/* Mentor Cards - CLICKABLE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="card">
                    {filteredMentors.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-4xl mb-4">🔍</p>
                            <p className="font-black text-primary text-xl">
                                {isID ? "Tidak ada mentor ditemukan" : "No mentors found"}
                            </p>
                            <p className="text-muted-foreground text-sm mt-2">
                                {isID ? "Coba kata kunci lain atau hapus filter" : "Try different keywords or remove filters"}
                            </p>
                        </div>
                    ) : (
                        filteredMentors.map((mentor) => (
                            <button
                                key={mentor.id}
                                onClick={() => handleCardClick(mentor)}
                                className={
                                    "relative rounded-[32px] overflow-hidden border-4 bg-white shadow-2xl text-left transition-all hover:shadow-xl hover:-translate-y-1 " +
                                    (currentStep === 2 ? "border-accent shadow-accent/30" : "border-transparent")
                                }>
                                <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-50">
                                    <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                    {mentor.online && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" />
                                            Online
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                                        ★ {mentor.rating}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2">
                                            <h3 className="font-black text-primary text-lg">{mentor.name}</h3>
                                            <p className="text-xs text-muted-foreground">{mentor.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="w-4 h-4 text-primary/50" />
                                        <span className="text-sm font-medium text-primary/70">{mentor.city}</span>
                                        <span className="mx-2 text-primary/30">•</span>
                                        <Star className="w-4 h-4 text-amber-500" fill="currentColor" />
                                        <span className="text-sm font-bold">{mentor.rating}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">"{mentor.bio}"</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-black text-primary">Rp {mentor.price.toLocaleString("id-ID")}</span>
                                        <span className="text-xs text-primary/50">{mentor.sessions} {isID ? "sesi" : "sessions"}</span>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center" id="book">
                    <button
                        onClick={() => {
                            if (selectedMentor) {
                                setShowSidePanel(true);
                            } else {
                                handleCardClick(MENTORS[0]);
                            }
                        }}
                        className="bg-accent hover:bg-accent/90 text-white font-black text-xl px-12 py-6 rounded-3xl shadow-xl transition-all active:scale-95">
                        {isID ? "Jelajahi & Booking Sekarang →" : "Explore & Book Now →"}
                    </button>
                    <p className="text-sm text-muted-foreground mt-4">
                        {isID ? "Klik kartu mentor untuk melihat profil dan booking sesi" : "Click mentor card to view profile and book a session"}
                    </p>
                </div>

                {/* Bottom links */}
                <div className="text-center mt-8 flex justify-center gap-6">
                    <button
                        onClick={() => {
                            login("Opa Adriel");
                            router.push("/demo/mentor");
                        }}
                        className="text-sm text-blue-600 hover:underline font-medium">
                        {isID ? "Lihat Demo Mentor →" : "See Mentor Demo →"}
                    </button>
                    <button
                        onClick={() => {
                            login("Dex");
                            router.push("/dashboard/customer");
                        }}
                        className="text-sm text-primary/60 hover:underline font-medium">
                        {isID ? "Dashboard Customer →" : "Customer Dashboard →"}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes demoBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-8px); }
                }
            `}</style>
        </main>
    );
}