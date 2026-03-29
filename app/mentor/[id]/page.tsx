'use client';

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Globe, Star, Clock, Heart, ArrowLeft, Calendar, ShieldCheck, CheckCircle, User2, MessageCircle } from "lucide-react";
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
    const [selectedTime, setSelectedTime] = useState("Today1");

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

    const mentors = [
        {
            id: 1,
            name: "Opa Adriel",
            age: 68,
            title: "Pakar Sejarah Jawa",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Bahasa Jawa",
            about: "Saya adalah pensiunan guru sejarah yang telah mengajar selama 40 tahun lebih. Bagi saya, masa pensiun bukanlah akhir untuk berhenti berbagi, namun adalah lembaran baru untuk lebih intim bercerita dengan generasi muda. Saya menantikan percakapan yang hangat, mulai dari filosofi kehidupan budaya Jawa hingga kisah-kisah kecil masa lampau yang mungkin sulit Anda temukan di buku.",
            experiences: ["40 Tahun Guru Sejarah", "Penulis Buku Budaya", "Pemandu Wisata Sejarah"],
            interests: ["Sejarah Jawa", "Filosofi Hidup", "Pewayangan"],
            price: "Rp 100.000",
            rating: 4.9,
            reviewsCount: 120,
        },
        {
            id: 2,
            name: "Ibu Ratna",
            age: 62,
            title: "Mantan Diplomat Internasional",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
            location: "Jakarta",
            language: "Inggris, Mandarin",
            about: "Setelah puluhan tahun bertugas di berbagai negara, saya ingin membagikan perspektif saya tentang dunia, diplomasi, dan bagaimana menjaga hubungan baik dengan sesama. Sesi saya cocok untuk Anda yang ingin belajar etiket internasional atau sekadar mendengar cerita unik dari balik layar meja perundingan global.",
            experiences: ["30 Tahun Diplomat", "Atase Kebudayaan di Beijing", "Konsultan Hubungan Internasional"],
            interests: ["Politik Dunia", "Budaya Global", "Bahasa Mandarin"],
            price: "Rp 250.000",
            rating: 4.8,
            reviewsCount: 95,
        },
        {
            id: 3,
            name: "Bapak Dodi",
            age: 65,
            title: "Pebisnis Kuliner & Budayawan",
            image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda, Indonesia",
            about: "Membangun bisnis dari nol adalah perjalanan spiritual. Saya telah melewati berbagai pasang surut di industri kuliner Bandung. Saya di sini untuk membantu Anda memicu ide bisnis kreatif atau sekadar mengenang resep-resep masakan sunda yang mulai terlupakan.",
            experiences: ["Founder Restoran Masakan Sunda", "Ketua Paguyuban Bisnis Bandung", "Pembicara Seminar Kewirausahaan"],
            interests: ["Wirausaha", "Masakan Sunda", "Musik Kecapi"],
            price: "Rp 350.000",
            rating: 4.7,
            reviewsCount: 88,
        },
        {
            id: 4,
            name: "Opa Yohanes",
            age: 70,
            title: "Musisi Kerocong",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=600&auto=format&fit=crop",
            location: "Surabaya",
            language: "Jawa, Indonesia",
            about: "Musik Keroncong adalah detak jantung masa muda saya. Biarkan saya membawa Anda kembali ke era di mana setiap nada memiliki makna mendalam. Kita bisa belajar tentang harmoni musik atau sekadar menikmati obrolan tentang skena seni di Surabaya era 70-an.",
            experiences: ["Pimpinan Orkes Keroncong Selaras", "Pencipta Lagu Tradisional", "Kurator Musik Etnik"],
            interests: ["Keroncong", "Harmonika", "Surabaya Tempo Dulu"],
            price: "Rp 150.000",
            rating: 5.0,
            reviewsCount: 42,
        },
        {
            id: 5,
            name: "Ibu Sri",
            age: 63,
            title: "Pengrajin Batik",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop",
            location: "Solo",
            language: "Jawa, Indonesia",
            about: "Membatik adalah meditasi. Saya telah menghabiskan ribuan jam dengan canting dan malam. Saya senang berbagi filosofi di balik setiap motif batik parang atau kawung, dan bagaimana kearifan lokal bisa menjadi penyeimbang hidup di era modern ini.",
            experiences: ["Pemilik Sanggar Batik Sri", "Instruktur Workshop Batik Internasional", "Pelestari Budaya Solo"],
            interests: ["Batik Tulis", "Meditasi", "Budaya Keraton"],
            price: "Rp 120.000",
            rating: 4.9,
            reviewsCount: 64,
        },
        {
            id: 6,
            name: "Bapak Hasan",
            age: 75,
            title: "Pakar Pertanian",
            image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=600&auto=format&fit=crop",
            location: "Malang",
            language: "Indonesia",
            about: "Tanah adalah guru yang paling jujur. Sebagai pensiunan dosen pertanian, saya percaya bahwa setiap orang bisa menanam kebahagiaannya sendiri. Mari berdiskusi tentang bagaimana mengelola kebun kecil di rumah atau sekadar berbagi pengalaman tentang kehidupan pedesaan yang tenang.",
            experiences: ["Profesor Emeritus Pertanian", "Konsultan Ketahanan Pangan", "Penulis Jurnal Hortikultura"],
            interests: ["Urban Farming", "Tanaman Obat", "Kehidupan Desa"],
            price: "Rp 80.000",
            rating: 4.8,
            reviewsCount: 52,
        },
        {
            id: 7,
            name: "Om Bima",
            age: 66,
            title: "Seniman Kriya Kayu",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Jawa, Indonesia",
            about: "Kayu memiliki serat yang seperti jalan hidup manusia—penuh liku tapi indah jika dipahat dengan sabar. Saya senang bercerita tentang filosofi kriya dan bagaimana hobi bisa menjadi pelipur lara di masa tua.",
            experiences: ["Pematung Kayu Berprestasi", "Pengajar Seni Rupa", "Kolektor Antik"],
            interests: ["Ukiran Kayu", "Restorasi Furnitur", "Filosofi Jawa"],
            price: "Rp 110.000",
            rating: 4.7,
            reviewsCount: 38,
        },
        {
            id: 8,
            name: "Ibu Dian",
            age: 61,
            title: "Mantan Penari Tradisional",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
            location: "Bali",
            language: "Bali, Indonesia",
            about: "Menari bukan hanya tentang gerakan, tapi tentang rasa. Sebagai mantan penari istana, saya belajar banyak tentang disiplin dan spiritualitas. Saya siap mendampingi Anda yang ingin berbincang tentang ketenangan batin atau seni pertunjukan Bali.",
            experiences: ["Penari Utama di PKB Bali", "Pelatih Tari Internasional", "Pemandu Wisata Budaya"],
            interests: ["Tari Bali", "Yoga", "Spiritualitas"],
            price: "Rp 180.000",
            rating: 4.9,
            reviewsCount: 76,
        },
        {
            id: 9,
            name: "Oma Lestari",
            age: 69,
            title: "Ahli Kuliner Sumatera",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Indonesia, Minang",
            about: "Masakan adalah cara terbaik untuk menunjukkan kasih sayang. Saya ingin membagikan rahasia bumbu rendang otentik dan bagaimana masakan bisa menyatukan keluarga yang renggang. Sini, cerita sama Oma.",
            experiences: ["Pemilik Catering Legendaris", "Penulis Resep Masakan Nusantara", "Juri Lomba Masak Tradisional"],
            interests: ["Masakan Padang", "Harmoni Keluarga", "Cerita Rakyat"],
            price: "Rp 90.000",
            rating: 5.0,
            reviewsCount: 110,
        },
        {
            id: 10,
            name: "Bapak Ahmad",
            age: 74,
            title: "Pensiunan Pelaut",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
            location: "Makassar",
            language: "Indonesia, Bugis",
            about: "Dunia ini luas, dan samudera adalah guru terbaik tentang keberanian. Saya telah mengelilingi dunia dan melihat berbagai budaya. Mari berbagi cerita tentang petualangan atau bagaimana menjaga semangat pantang menyerah di situasi sulit.",
            experiences: ["Nakhoda Kapal Kargo Internasional", "Instruktur Navigasi", "Ketua Kerukunan Pelaut"],
            interests: ["Navigasi", "Cerita Dunia", "Pancing Ikan"],
            price: "Rp 100.000",
            rating: 4.9,
            reviewsCount: 48,
        },
        {
            id: 11,
            name: "Ibu Ningsih",
            age: 64,
            title: "Pedagang Tangguh",
            image: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?q=80&w=400&auto=format&fit=crop",
            location: "Surabaya",
            language: "Indonesia, Madura",
            about: "Hidup di pasar mengajarkan saya tentang psikologi manusia. Saya mulai dari jualan keliling hingga punya toko sendiri. Saya ingin memotivasi Anda yang sedang berjuang dalam bisnis kecil atau butuh teman bicara yang lugas.",
            experiences: ["Wirausahawan Pasar Turi", "Mentor Bisnis UMKM", "Aktivis Sosial Surabaya"],
            interests: ["Strategi Dagang", "Ketahanan Mental", "Kuliner Surabaya"],
            price: "Rp 70.000",
            rating: 4.6,
            reviewsCount: 130,
        },
        {
            id: 12,
            name: "Om Tono",
            age: 67,
            title: "Akuntan Senior",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
            location: "Semarang",
            language: "Jawa, Indonesia",
            about: "Angka tidak pernah bohong, tapi hidup bukan sekadar matematika. Sebagai akuntan senior, saya belajar bahwa kekayaan sesungguhnya adalah waktu. Mari berdiskusi tentang perencanaan masa depan atau bagaimana menikmati hidup sederhana yang bermakna.",
            experiences: ["Partner di Firma Audit Ternama", "Konsultan Pajak Senior", "Dosen Keuangan"],
            interests: ["Investasi Masa Tua", "Filateli", "Sejarah Semarang"],
            price: "Rp 160.000",
            rating: 4.8,
            reviewsCount: 55,
        },
        {
            id: 13,
            name: "Bapak Eko",
            age: 71,
            title: "Dosen Sosiologi Pensiunan",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda, Indonesia",
            about: "Memahami masyarakat adalah memahami diri sendiri. Saya senang mengajak anak muda berdialog kritis tentang fenomena sosial saat ini, sembari membagikan pengalaman saya selama puluhan tahun mengajar di kampus.",
            experiences: ["Ketua Jurusan Sosiologi", "Peneliti Sosial Budaya", "Penulis Opini Media Nasional"],
            interests: ["Sosiologi", "Literasi", "Klub Buku"],
            price: "Rp 140.000",
            rating: 4.9,
            reviewsCount: 42,
        },
        {
            id: 14,
            name: "Ibu Salma",
            age: 62,
            title: "Pelaku Homeopati",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop",
            location: "Jakarta",
            language: "Indonesia",
            about: "Kesehatan tubuh berawal dari kesehatan jiwa. Saya mendalami pengobatan alami dan terapi pendengaran aktif. Sesi saya adalah ruang aman bagi Anda yang ingin menuangkan beban pikiran tanpa dihakimi.",
            experiences: ["Pakar Homeopati Sertifikasi", "Konselor Kesehatan Mental", "Pembuat Ramuan Herbal"],
            interests: ["Herbalisme", "Kesehatan Jiwa", "Teh Tradisional"],
            price: "Rp 100.000",
            rating: 4.8,
            reviewsCount: 33,
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

        // Save selected time to localStorage for dashboard sync
        let timeLabel = "";
        if (selectedTime === "Today1") timeLabel = `${t.dashboard.today}, ${getDynamicTimeRange(1)}`;
        else if (selectedTime === "Today2") timeLabel = `${t.dashboard.today}, ${getDynamicTimeRange(3)}`;
        else if (selectedTime === "Tomorrow1") timeLabel = `${t.dashboard.tomorrow}, 10:00 - 11:00 WIB`;
        else if (selectedTime === "Tomorrow2") timeLabel = `${t.dashboard.tomorrow}, 13:00 - 14:00 WIB`;

        localStorage.setItem("sowan_selected_time", timeLabel);
        localStorage.setItem("sowan_booked_mentor", JSON.stringify(foundMentor));

        setTimeout(() => {
            setIsSuccess(true);
            setTimeout(() => router.push("/dashboard/customer"), 2000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-foreground pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                <button
                    onClick={() => router.back()}
                    className="group mb-8 lg:mb-12 flex items-center gap-2 sm:gap-3 text-primary/60 hover:text-primary font-bold transition-all text-lg sm:text-xl"
                >
                    <ArrowLeft size={24} className="sm:w-7 sm:h-7 group-hover:-translate-x-2 transition-transform" />
                    {t.shared.back}
                </button>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* LEFTSIDE: Profile Overview */}
                    <div className="w-full lg:w-[450px]">
                        <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 sm:p-10 border border-black/5 shadow-xl shadow-primary/5 flex flex-col items-center text-center">
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6 sm:mb-10 rounded-[32px] sm:rounded-[40px] overflow-hidden border-4 sm:border-8 border-[#FAF9F6] shadow-2xl">
                                <Image
                                    src={foundMentor.image}
                                    alt={foundMentor.name}
                                    fill
                                    className="object-cover"
                                    sizes="256px"
                                    priority
                                />
                                {/* Deep Seamless Gradient Blend */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent z-10"></div>
                                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-[8px] text-white/80 px-2 py-1 rounded-md uppercase tracking-widest pointer-events-none z-20">
                                    Source: Unsplash
                                </div>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-black text-primary mb-2">{foundMentor.name}, {foundMentor.age}</h1>
                            <p className="text-lg sm:text-xl text-muted-foreground font-bold mb-6 sm:mb-8">{foundMentor.title}</p>

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
                        <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 sm:p-12 border border-black/5 shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                                <ShieldCheck className="w-7 h-7 sm:w-9 sm:h-9 text-accent" />
                                {t.mentor.about}
                            </h2>
                            <p className="text-lg sm:text-2xl text-muted-foreground leading-relaxed font-medium">
                                {foundMentor.about}
                            </p>
                        </div>

                        {/* Experience and Interests Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 sm:p-10 border border-black/5 shadow-sm">
                                <h3 className="text-xl sm:text-2xl font-black text-primary mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                                    {t.mentor.exp}
                                </h3>
                                <ul className="space-y-4 sm:space-y-6">
                                    {foundMentor.experiences.map((exp: string, i: number) => (
                                        <li key={i} className="flex gap-3 sm:gap-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-accent mt-2 sm:mt-3 shrink-0" />
                                            <p className="text-lg sm:text-xl text-primary/80 font-bold">{exp}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 sm:p-10 border border-black/5 shadow-sm">
                                <h3 className="text-xl sm:text-2xl font-black text-primary mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
                                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                                    {t.mentor.interests}
                                </h3>
                                <div className="flex flex-wrap gap-3 sm:gap-4">
                                    {foundMentor.interests.map((tag: string) => (
                                        <span key={tag} className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FAF9F6] border-2 border-primary/5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold text-primary hover:border-accent hover:text-accent transition-all cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary rounded-[32px] md:rounded-[48px] p-8 md:p-14 text-white shadow-2xl shadow-primary/30 flex flex-col md:flex-row items-center justify-between gap-8 transform hover:scale-[1.01] transition-transform text-center md:text-left">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-black mb-2">{t.mentor.bookingTitle}</h3>
                                <p className="text-lg sm:text-xl text-white/60 font-bold italic">{t.mentor.bookingDesc}</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-4xl sm:text-5xl font-black">{foundMentor.price}</span>
                                    <span className="text-lg sm:text-xl text-white/40 font-bold italic">/ {t.home.sessions}</span>
                                </div>
                                <Button
                                    onClick={handleOpenModal}
                                    className="h-16 sm:h-20 w-full sm:w-auto px-12 rounded-2xl sm:rounded-[28px] bg-accent hover:bg-accent/90 text-white font-black text-xl sm:text-2xl shadow-xl shadow-black/20 transition-all hover:-translate-y-2 active:translate-y-0"
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
                            <div className="p-0 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                {/* Modal Header with Visual Image */}
                                <div className="p-10 text-center space-y-4">
                                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl group">
                                        <img
                                            src={foundMentor.image}
                                            alt={foundMentor.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
                                        <div className="absolute bottom-1 right-1 bg-black/40 backdrop-blur-sm text-[6px] text-white/80 px-1 py-0.5 rounded-sm uppercase tracking-widest pointer-events-none">
                                            Source: Unsplash
                                        </div>
                                        <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                            <CheckCircle size={18} className="text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-black text-primary">{t.mentor.bookingTitle}</h2>
                                    <p className="text-muted-foreground font-medium mt-1">{t.mentor.bookingSubtitle.replace('{name}', foundMentor.name)}</p>
                                </div>

                                <div className="px-8 pb-10 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-wider text-primary/40 ml-1">{t.mentor.selectTime}</label>
                                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                                            <SelectTrigger className="w-full h-14 bg-white border-2 border-primary/5 rounded-2xl px-4 text-lg font-bold text-primary focus:ring-accent transition-all">
                                                <SelectValue placeholder={t.mentor.selectTime} />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-2 border-primary/5 rounded-2xl shadow-2xl z-[150] text-primary font-bold">
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
                                            <span>{foundMentor.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-primary/60 font-bold">
                                            <span>{t.payment.appFee}</span>
                                            <span>Rp 5.000</span>
                                        </div>
                                        <div className="h-px bg-primary/5 my-2"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-black text-primary">Total</span>
                                            <span className="text-3xl font-black text-accent">
                                                Rp {(parseInt(foundMentor.price.replace(/\D/g, '')) + 5000).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full h-16 bg-primary hover:bg-primary/95 text-white rounded-2xl text-xl font-black shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 group"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                {t.payment.processing}
                                            </div>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <ShieldCheck size={24} />
                                                {t.payment.confirmPay}
                                            </span>
                                        )}
                                    </Button>
                                </div>
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
