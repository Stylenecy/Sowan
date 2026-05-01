'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Video, Mic, Camera, MonitorUp, PhoneOff, Star, MapPin, Clock, ArrowRight, CheckCircle, Users } from "lucide-react";

const TUTORIAL_STEPS_ID = [
    { icon: "🔍", title: "Jelajahi", desc: "Lihat profil mentor dan booked sessions.", phase: 'overview' },
    { icon: "📅", title: "Jelajahi", desc: "Klik kartu 'Jelajahi' untuk lihat profil.", phase: 'explore' },
    { icon: "📝", title: "Topik & Harga", desc: "Lihat harga dan topik yang ditawarkan.", phase: 'explore' },
    { icon: "📅", title: "Jadwal", desc: "Kelola jadwal sesi yang dipesan.", phase: 'schedule' },
    { icon: "📅", title: "Detail Booking", desc: "Lihat detail sesi Dex - Sejarah Jawa.", phase: 'schedule' },
    { icon: "🎥", title: "Ruang Sowan", desc: "Gunakan video call untuk sesi.", phase: 'room' },
    { icon: "📹", title: "Video Call", desc: "Terhubung dengan Dex untuk sesi.", phase: 'room' },
    { icon: "⭐", title: "Apresiasi", desc: "Lihat rating dan testimonial.", phase: 'feedback' },
    { icon: "🎉", title: "Selesai", desc: "Demo lengkap! logout dan kembali.", phase: 'logout' },
];

const TUTORIAL_STEPS_EN = [
    { icon: "🔍", title: "Explore", desc: "View mentor profile and booked sessions.", phase: 'overview' },
    { icon: "📅", title: "Explore", desc: "Click 'Explore' card to view profile.", phase: 'explore' },
    { icon: "📝", title: "Topics & Price", desc: "View price and topics offered.", phase: 'explore' },
    { icon: "📅", title: "Schedule", desc: "Manage scheduled sessions.", phase: 'schedule' },
    { icon: "📅", title: "Booking Detail", desc: "View Dex's session details.", phase: 'schedule' },
    { icon: "🎥", title: "Sowan Room", desc: "Use video call for session.", phase: 'room' },
    { icon: "📹", title: "Video Call", desc: "Connect with Dex for session.", phase: 'room' },
    { icon: "⭐", title: "Appreciation", desc: "View ratings and testimonials.", phase: 'feedback' },
    { icon: "🎉", title: "Done", desc: "Demo complete! Logout and return.", phase: 'logout' },
];

export default function DemoMentorPage() {
    const router = useRouter();
    const { login, logout, user } = useAuth();
    const { language } = useLanguage();
    const hasRun = useRef(false);

    const isID = language === 'id';
    const TUTORIAL_STEPS = isID ? TUTORIAL_STEPS_ID : TUTORIAL_STEPS_EN;

    const [tutorialStep, setTutorialStep] = useState(0);
    const [phase, setPhase] = useState<'overview' | 'explore' | 'schedule' | 'room' | 'feedback'>('overview');
    const [subStep, setSubStep] = useState(0);
    const [roomState, setRoomState] = useState<'idle' | 'connecting' | 'connected'>('idle');
    const [showLogout, setShowLogout] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showCongrats, setShowCongrats] = useState(false);

    useEffect(() => {
        if (hasRun.current || user) return;
        hasRun.current = true;
        login("Opa Adriel");
    }, [user, login]);

    const currentStep = TUTORIAL_STEPS[tutorialStep] || TUTORIAL_STEPS[0];

    function showToast(msg) {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 2500);
    }

    function goToPhase(p) {
        setPhase(p);
        setSubStep(0);
    }

    function handleNextStep() {
        var step = tutorialStep;

        if (step === 0) {
            setTutorialStep(1);
            goToPhase('explore');
            return;
        }
        if (step === 1) {
            setTutorialStep(2);
            setSubStep(1);
            return;
        }
        if (step === 2) {
            setTutorialStep(3);
            goToPhase('schedule');
            return;
        }
        if (step === 3) {
            setTutorialStep(4);
            setSubStep(1);
            return;
        }
        if (step === 4) {
            setTutorialStep(5);
            goToPhase('room');
            return;
        }
        if (step === 5) {
            setRoomState('connecting');
            setTutorialStep(6);
            setTimeout(() => setRoomState('connected'), 2000);
            return;
        }
        if (step === 6) {
            setTutorialStep(7);
            goToPhase('feedback');
            return;
        }
        if (step === 7) {
            setShowCongrats(true);
            return;
        }
    }

    function handleReset() {
        setTutorialStep(0);
        setPhase('overview');
        setSubStep(0);
        setRoomState('idle');
        setShowLogout(false);
    }

    function handleBookSesi() {
        showToast(isID ? '✓ Booking Berhasil! Customer Dex akan segera terhubung' : '✓ Booking Successful! Customer Dex will connect soon');
    }

    function getBubbleTitle() {
        if (phase === 'overview') return currentStep.title;
        if (phase === 'explore') return subStep === 0 ? (isID ? 'Profil Mentor' : 'Mentor Profile') : (isID ? 'Topik & Harga' : 'Topics & Price');
        if (phase === 'schedule') return subStep === 0 ? (isID ? 'Daftar Sesi' : 'Session List') : (isID ? 'Detail Booking' : 'Booking Detail');
        if (phase === 'room') return roomState === 'connected' ? (isID ? 'Video Call Aktif' : 'Video Call Active') : (isID ? 'Ruang Sowan' : 'Sowan Room');
        if (phase === 'feedback') return currentStep.title;
        return currentStep.title;
    }

    function getBubbleDesc() {
        if (phase === 'overview') return currentStep.desc;
        if (phase === 'explore') return subStep === 0 ? (isID ? 'Ini yang dilihat customer saat memilih Anda' : 'This is what customers see when choosing you') : (isID ? 'Topik dan harga terlihat di kartu profil' : 'Topics and price visible on profile card');
        if (phase === 'schedule') return subStep === 0 ? (isID ? 'Semua sesi booked dari customer' : 'All booked sessions from customers') : (isID ? 'Nama, topik, dan waktu sesi Dex' : 'Customer name, topic, and Dex\'s session time');
        if (phase === 'room') {
            if (roomState === 'connecting') return isID ? 'Menghubungkan...' : 'Connecting...';
            if (roomState === 'connected') return isID ? 'Terhubung dengan Dex - Sejarah Jawa' : 'Connected with Dex - Javanese History';
            return currentStep.desc;
        }
        if (phase === 'feedback') return currentStep.desc;
        return currentStep.desc;
    }

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] pb-48">
            {/* Toast */}
            {toastMessage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
                    <div className="bg-emerald-500 text-white px-8 py-6 rounded-2xl shadow-2xl text-center pointer-events-auto">
                        <p className="font-black text-xl">{toastMessage}</p>
                    </div>
                </div>
            )}

            {/* Congratulation Modal */}
            {showCongrats && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-10 max-w-lg w-full mx-4 shadow-2xl text-center">
                        <div className="text-7xl mb-4">🎉</div>
                        <h2 className="text-3xl font-black text-primary mb-2">
                            {isID ? "Selamat!" : "Congratulations!"}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            {isID
                                ? "Anda telah menyelesaikan demo Dashboard Mentor!"
                                : "You have completed the Mentor Dashboard demo!"}
                        </p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => { setShowCongrats(false); localStorage.removeItem("sowan_user"); logout(); router.push('/'); }}
                                className="w-full bg-accent hover:bg-accent/90 text-white font-black py-4 rounded-2xl transition-all shadow-lg">
                                {isID ? "Logout & Kembali ke Home" : "Logout & Return to Home"}
                            </button>
                            <button onClick={() => { setShowCongrats(false); handleReset(); }}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-primary font-bold py-4 rounded-2xl transition-all">
                                🔄 {isID ? "Mulai Ulang Demo" : "Restart Demo"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Demo Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 py-4 px-6 sticky top-[72px] z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">👴</span>
                        <div>
                            <h2 className="font-black text-primary">{isID ? "Demo: Dashboard Mentor" : "Demo: Mentor Dashboard"}</h2>
                            <p className="text-sm text-muted-foreground">{isID ? "Ikuti panduan langkah demi langkah" : "Follow step by step guide"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {TUTORIAL_STEPS.map((_, i) => (
                                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i <= tutorialStep ? 'bg-blue-600' : 'bg-primary/20'}`} />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            {isID ? 'Langkah' : 'Step'} {tutorialStep + 1} / {TUTORIAL_STEPS.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Step Guide */}
            <div className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
                style={{ top: 'calc(72px + 4rem)', maxWidth: '90vw' }}>
                <div className="bg-accent text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4"
                    style={{ animation: 'demoBounce 2.5s ease-in-out infinite' }}>
                    <span className="text-3xl shrink-0">{currentStep.icon}</span>
                    <div className="min-w-0">
                        <p className="font-black text-base whitespace-nowrap">{getBubbleTitle()}</p>
                        <p className="text-sm opacity-80 whitespace-nowrap">{getBubbleDesc()}</p>
                    </div>
                </div>
            </div>

            {/* Bottom-right Next Step button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button onClick={handleNextStep}
                    className="bg-accent hover:bg-accent/90 text-white font-black px-6 py-3 rounded-2xl shadow-xl transition-all active:scale-95">
                    {tutorialStep < TUTORIAL_STEPS.length - 1 ? (isID ? "Langkah Berikutnya" : "Next Step") : (isID ? "Selesai" : "Done")}
                </button>
            </div>

            {/* Bottom-left Reset */}
            {showLogout ? (
                <div className="fixed bottom-8 left-8 z-50">
                    <button onClick={handleReset}
                        className="bg-white hover:bg-slate-50 text-primary font-bold px-5 py-3 rounded-2xl shadow-lg border-2 border-primary/20 transition-all flex items-center gap-2">
                        🔄 {isID ? "Reset" : "Reset"}
                    </button>
                </div>
            ) : (
                <div className="fixed bottom-8 left-8 z-50">
                    <button onClick={handleReset}
                        className="bg-white hover:bg-slate-50 text-primary font-bold px-5 py-3 rounded-2xl shadow-lg border-2 border-primary/20 transition-all flex items-center gap-2">
                        🔄 {isID ? "Reset" : "Reset"}
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Tab Nav - only show when relevant to current step */}
                {(phase === 'overview' || phase === 'explore' || phase === 'schedule' || phase === 'room' || phase === 'feedback') && (
                    <div className="flex gap-3 mb-10 flex-wrap">
                        {(['overview', 'explore', 'schedule', 'room', 'feedback'] as const).map(p => {
                            const labels = {
                                overview: isID ? '🏠 Overview' : '🏠 Overview',
                                explore: '🔍 ' + (isID ? 'Jelajahi' : 'Explore'),
                                schedule: '📅 ' + (isID ? 'Jadwal' : 'Schedule'),
                                room: '🎥 ' + (isID ? 'Ruang Sowan' : 'Sowan Room'),
                                feedback: '⭐ ' + (isID ? 'Apresiasi' : 'Appreciation'),
                            };
                            return (
                                <button key={p} onClick={() => goToPhase(p)}
                                    className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all ${phase === p ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-primary/10 hover:border-blue-300'}`}>
                                    {labels[p]}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* === OVERVIEW === */}
                {phase === 'overview' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-200">
                            <div className="flex items-start gap-6">
                                <div className="relative">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=200&w=200&auto=format&fit=crop"
                                        alt="Opa Adriel" className="w-28 h-28 rounded-2xl object-cover shadow-md" />
                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">4.9</div>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-black text-primary mb-1">Opa Adriel</h2>
                                    <p className="text-muted-foreground font-medium mb-4">{isID ? "Pakar Sejarah Jawa • Yogyakarta" : "Javanese History Expert • Yogyakarta"}</p>
                                    <div className="flex gap-3 flex-wrap">
                                        <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold">Sejarah Jawa</span>
                                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">Bahasa Jawa</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">{isID ? "Sesi selesai" : "Sessions done"}</p>
                                    <p className="text-4xl font-black text-blue-600">24</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { icon: "🔍", label: isID ? "Jelajahi" : "Explore", desc: isID ? "Profil terlihat" : "Profile visible", color: "from-blue-50 to-indigo-50", border: "border-blue-200", targetPhase: 'explore' as const },
                                { icon: "📅", label: isID ? "Jadwal" : "Schedule", desc: isID ? "3 sesi booked" : "3 sessions booked", color: "from-emerald-50 to-teal-50", border: "border-emerald-200", targetPhase: 'schedule' as const },
                                { icon: "🎥", label: isID ? "Ruang Sowan" : "Sowan Room", desc: isID ? "1 sesi aktif" : "1 active session", color: "from-purple-50 to-violet-50", border: "border-purple-200", targetPhase: 'room' as const },
                                { icon: "⭐", label: isID ? "Apresiasi" : "Appreciation", desc: "4.9 rating", color: "from-amber-50 to-orange-50", border: "border-amber-200", targetPhase: 'feedback' as const },
                            ].map((item, i) => (
                                <button key={i} onClick={() => goToPhase(item.targetPhase)}
                                    className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 border-2 ${item.border} hover:shadow-xl transition-all text-left group`}>
                                    <span className="text-4xl mb-3 block">{item.icon}</span>
                                    <h3 className="font-black text-primary text-lg group-hover:underline">{item.label}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-primary/10">
                            <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" /> {isID ? "Sesi Mendatang" : "Upcoming Sessions"}
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: "Dex", topic: isID ? "Sejarah Jawa" : "Javanese History", time: isID ? "Hari ini, 14:00" : "Today, 14:00", status: "confirmed" },
                                    { name: "Mbak Siti", topic: isID ? "Bahasa Jawa Dasar" : "Basic Javanese", time: isID ? "Besok, 10:00" : "Tomorrow, 10:00", status: "pending" },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">{s.name[0]}</div>
                                        <div className="flex-1">
                                            <p className="font-bold text-primary">{s.name}</p>
                                            <p className="text-sm text-muted-foreground">{s.topic}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-blue-600">{s.time}</p>
                                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${s.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {s.status === 'confirmed' ? (isID ? 'Dikonfirmasi' : 'Confirmed') : (isID ? 'Menunggu' : 'Pending')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* === EXPLORE === */}
                {phase === 'explore' && (
                    <div className="space-y-8">
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-amber-700">📍 {isID ? "Mode Demo: Begini customer melihat profil Anda" : "Demo: This is how customers see your profile"}</p>
                        </div>
                        <div className="max-w-2xl mx-auto">
                            <div className={`bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 ${subStep === 0 ? 'border-accent' : 'border-amber-300'}`}>
                                <div className="relative h-72 bg-gradient-to-br from-amber-50 to-orange-50">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=400&auto=format&fit=crop"
                                        alt="Opa Adriel" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" /> Online
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2">
                                            <h3 className="font-black text-primary text-xl">Opa Adriel</h3>
                                            <p className="text-xs text-muted-foreground">{isID ? "Pakar Sejarah Jawa" : "Javanese History Expert"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="w-4 h-4 text-amber-500" fill="currentColor" /><strong>4.9</strong>
                                        <span className="mx-2 text-primary/20">•</span>
                                        <MapPin className="w-4 h-4 text-primary/50" /><span className="text-sm text-muted-foreground">Yogyakarta</span>
                                        <span className="mx-2 text-primary/20">•</span>
                                        <span className="text-sm text-muted-foreground">24 sesi</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {isID ? '"Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa."' : '"Let\'s chat casually about history, life experiences, or just practice Javanese."'}
                                    </p>
                                    <div className="flex gap-2 flex-wrap mb-4">
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Sejarah Jawa</span>
                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Bahasa Jawa</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                                        <span className="text-2xl font-black text-primary">Rp 100.000</span>
                                        <button onClick={handleBookSesi}
                                            className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-2">
                                            📅 {isID ? "Book Sesi" : "Book Session"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">← {isID ? "Ini yang dilihat customer saat mencari mentor" : "This is what customers see when searching for mentors"}</p>
                    </div>
                )}

                {/* === SCHEDULE === */}
                {phase === 'schedule' && (
                    <div className="space-y-8">
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-emerald-700">📅 {isID ? "Mode Demo: Jadwal sesi yang sudah dipesan" : "Demo: Scheduled sessions"}</p>
                        </div>
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {[
                                { name: "Dex", topic: isID ? "Sejarah Jawa" : "Javanese History", date: isID ? "Hari ini" : "Today", time: "14:00 - 15:00", desc: isID ? "Ingin belajar sejarah kerajaan Jawa" : "Wants to learn about Javanese kingdoms", urgent: true },
                                { name: "Mbak Siti", topic: isID ? "Bahasa Jawa" : "Javanese Language", date: isID ? "Besok" : "Tomorrow", time: "10:00 - 11:00", desc: isID ? "Mau belajar bahasa Jawa dasar" : "Wants to learn basic Javanese", urgent: false },
                                { name: "Bang Joko", topic: isID ? "Kearifan Lokal" : "Local Wisdom", date: "2 Mei", time: "15:00 - 16:00", desc: isID ? "Tertarik budaya Jawa" : "Interested in Javanese culture", urgent: false },
                            ].map((s, i) => (
                                <div key={i} className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${s.urgent ? 'border-emerald-400 bg-emerald-50' : 'border-primary/10'}`}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">{s.name[0]}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-black text-lg">{s.name}</h3>
                                                {s.urgent && <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">{isID ? "Segera" : "Soon"}</span>}
                                            </div>
                                            <p className="text-blue-600 font-bold text-sm mb-1">{s.topic}</p>
                                            <p className="text-sm text-muted-foreground mb-2">"{s.desc}"</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="font-bold text-primary/70 flex items-center gap-1"><Calendar className="w-3 h-3" /> {s.date}</span>
                                                <span className="font-bold text-primary/70 flex items-center gap-1"><Clock className="w-3 h-3" /> {s.time}</span>
                                            </div>
                                        </div>
                                        {s.urgent && (
                                            <button onClick={() => { goToPhase('room'); setRoomState('connecting'); setTimeout(() => setRoomState('connected'), 2000); }}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all h-fit flex items-center gap-2 active:scale-95">
                                                🎥 {isID ? "Masuk Ruang →" : "Join Room →"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* === ROOM === */}
                {phase === 'room' && (
                    <div className="space-y-8">
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-purple-700">🎥 {isID ? "Mode Demo: Ruang Sowan untuk video call" : "Demo: Sowan Room for video call"}</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    {roomState === 'idle' && (
                                        <div className="text-center">
                                            <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">👴</div>
                                            <p className="text-white font-black text-2xl mb-2">Opa Adriel</p>
                                            <p className="text-slate-400 text-sm">{isID ? "Tekan tombol di bawah untuk terhubung" : "Press button below to connect"}</p>
                                            <button onClick={() => { setRoomState('connecting'); setTimeout(() => setRoomState('connected'), 2000); }}
                                                className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
                                                🎥 {isID ? "Mulai Video Call" : "Start Video Call"}
                                            </button>
                                        </div>
                                    )}
                                    {roomState === 'connecting' && (
                                        <div className="text-center">
                                            <div className="w-32 h-32 bg-emerald-900 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl animate-pulse">🎥</div>
                                            <p className="text-white font-black text-2xl mb-2">{isID ? "Menghubungkan..." : "Connecting..."}</p>
                                            <div className="w-48 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden">
                                                <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                                            </div>
                                        </div>
                                    )}
                                    {roomState === 'connected' && (
                                        <div className="text-center">
                                            <div className="w-32 h-32 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">👴</div>
                                            <p className="text-white font-black text-2xl mb-1">Opa Adriel</p>
                                            <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> {isID ? "Terhubung" : "Connected"}
                                            </div>
                                            <p className="text-slate-400 text-sm">Dex - {isID ? "Sejarah Jawa" : "Javanese History"}</p>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-2 border-slate-600 flex items-center justify-center">
                                        <div className="text-center">
                                            <Camera className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                                            <p className="text-slate-400 text-xs font-bold">{isID ? "Video Anda" : "Your Video"}</p>
                                        </div>
                                    </div>
                                    {roomState === 'connected' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-40 h-40 border-4 border-emerald-500 rounded-full animate-ping opacity-20" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex items-center justify-center gap-6 bg-slate-900">
                                    <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                        <Mic className="w-7 h-7 text-white" />
                                    </button>
                                    <button className="w-20 h-20 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110">
                                        <Camera className="w-8 h-8 text-white" />
                                    </button>
                                    <button className="w-16 h-16 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                        <MonitorUp className="w-7 h-7 text-white" />
                                    </button>
                                    <button className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                        <PhoneOff className="w-7 h-7 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* === FEEDBACK === */}
                {phase === 'feedback' && (
                    <div className="space-y-8">
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                            <p className="font-bold text-amber-700">⭐ {isID ? "Mode Demo: Apresiasi dan testimonial" : "Demo: Appreciation and testimonials"}</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-amber-200 text-center">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <span className="text-6xl">⭐</span>
                                <div>
                                    <p className="text-6xl font-black text-primary">4.9</p>
                                    <p className="text-muted-foreground font-medium">{isID ? "dari 24 sesi" : "from 24 sessions"}</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-2 mb-8">
                                {[1,2,3,4,5].map(i => <span key={i} className={`text-3xl ${i <= 4 ? 'text-amber-400' : 'text-primary/20'}`}>★</span>)}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-slate-50 rounded-xl p-4"><p className="text-3xl font-black text-blue-600">24</p><p className="text-sm text-muted-foreground">{isID ? "Sesi" : "Sessions"}</p></div>
                                <div className="bg-slate-50 rounded-xl p-4"><p className="text-3xl font-black text-emerald-600">100%</p><p className="text-sm text-muted-foreground">{isID ? "Selesai" : "Completed"}</p></div>
                                <div className="bg-slate-50 rounded-xl p-4"><p className="text-3xl font-black text-amber-600">4.9</p><p className="text-sm text-muted-foreground">Avg</p></div>
                            </div>
                        </div>

                        <div className="space-y-4 max-w-2xl mx-auto">
                            <h3 className="font-black text-xl text-center mb-4">{isID ? "Testimonial Terbaru" : "Latest Testimonials"}</h3>
                            {[
                                { name: "Dex", text: isID ? "Sangat membantu! Opa Adriel explains sejarah Jawa dengan cara yang sangat menarik." : "Very helpful! Opa Adriel explains Javanese history in a very engaging way.", rating: 5, date: isID ? "Hari ini" : "Today" },
                                { name: "Mbak Siti", text: isID ? "Belajar bahasa Jawa jadi menyenangkan! Thanks untuk kesabarannya." : "Learning Javanese is fun! Thanks for your patience.", rating: 5, date: isID ? "Kemarin" : "Yesterday" },
                                { name: "Bang Joko", text: isID ? "Diskusi kearifan lokal sangat enrichening. Recommended!" : "Local wisdom discussion was enriching. Recommended!", rating: 5, date: isID ? "3 hari lalu" : "3 days ago" },
                            ].map((t, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary/10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700">{t.name[0]}</div>
                                            <div><p className="font-bold text-primary">{t.name}</p><p className="text-xs text-muted-foreground">{t.date}</p></div>
                                        </div>
                                        <div className="flex gap-1">{Array.from({ length: t.rating }).map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}</div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">"{t.text}"</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center py-8">
                            <div className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl px-8 py-6 border-2 border-amber-300">
                                <span className="text-5xl mb-2 block">🎉</span>
                                <p className="font-black text-primary text-xl">{isID ? "Apresiasi Anda sangat berarti!" : "Your appreciation means a lot!"}</p>
                                <p className="text-sm text-muted-foreground mt-1">{isID ? "Setiap sesi membantu customer merasa lebih terhubung" : "Every session helps customers feel more connected"}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back button */}
                {phase !== 'overview' && (
                    <div className="text-center mt-8">
                        <button onClick={() => goToPhase('overview')} className="bg-primary/10 hover:bg-primary/20 text-primary font-bold px-8 py-4 rounded-2xl transition-all flex items-center gap-2 mx-auto">
                            <ArrowRight className="w-5 h-5 rotate-180" /> {isID ? "Kembali ke Overview" : "Back to Overview"}
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes demoBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-8px); }
                }
            `}</style>
        </main>
    );
}