"use client";

import { useState } from "react";
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
import { Navigation, MessageCircle, ShieldCheck, Star, CheckCircle, User2 } from "lucide-react";

export default function ExploreMentor() {
    const router = useRouter();
    
    // Filter state
    const [selectedCity, setSelectedCity] = useState("semua");
    const [selectedLanguage, setSelectedLanguage] = useState("semua");

    // Modal state
    const [selectedMentor, setSelectedMentor] = useState<any>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const mentors = [
        {
            id: 1,
            name: "Bapak Budi",
            age: 68,
            title: "Pensiunan Guru",
            badge: "Teman Sowan",
            badgeColor: "bg-slate-100 text-slate-700",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            location: "Yogyakarta",
            language: "Bahasa Jawa",
            desc: '"Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa. Saya senang mendengar cerita anak muda."',
            price: "Rp 100.000",
        },
        {
            id: 2,
            name: "Ibu Ratna",
            age: 72,
            title: "Mantan Diplomat",
            badge: "Pemandu Lokal",
            badgeColor: "bg-emerald-100 text-emerald-800",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
            location: "Jakarta",
            language: "Inggris / Indo",
            desc: '"Ingin berlatih bahasa Inggris sambil membicarakan isu global masa lalu? Mari Sowan dengan saya. Berbagi pengalaman luar negeri adalah hobi saya."',
            price: "Rp 200.000",
        },
        {
            id: 3,
            name: "Bapak Dodi",
            age: 65,
            title: "Pebisnis Kuliner",
            badge: "Tokoh Budaya",
            badgeColor: "bg-[#D97706]/10 text-[#D97706]",
            titleColor: "bg-accent/10 text-accent border-accent/20",
            image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop",
            location: "Bandung",
            language: "Sunda / Indo",
            desc: '"Punya ide bisnis atau sekadar rindu membahas resep masakan tradisional? Ayo kita berdiskusi hangat ditemani secangkir teh."',
            price: "Rp 350.000",
        }
    ];

    const filteredMentors = mentors.filter((mentor) => {
        // Filter Kota
        const matchCity = selectedCity === "semua" || mentor.location.toLowerCase() === selectedCity.toLowerCase();
        
        // Filter Bahasa
        const langLower = mentor.language.toLowerCase();
        let matchLanguage = selectedLanguage === "semua";
        if (selectedLanguage !== "semua") {
            if (selectedLanguage === "indonesia" && langLower.includes("indo")) matchLanguage = true;
            if (selectedLanguage === "jawa" && langLower.includes("jawa")) matchLanguage = true;
            if (selectedLanguage === "sunda" && langLower.includes("sunda")) matchLanguage = true;
            if (selectedLanguage === "inggris" && langLower.includes("inggris")) matchLanguage = true;
        }

        return matchCity && matchLanguage;
    });

    const handleOpenModal = (mentor: any) => {
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
        // Simulate payment process
        setTimeout(() => {
            setIsSuccess(true);
            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/dashboard/mentor");
            }, 2000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">

            {/* Header section */}
            <div className="mb-12 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                    Cari Teman Sowan Anda
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Temukan lansia berpengalaman untuk berbagi cerita, ilmu, dan merajut kembali tali silaturahmi.
                    Gunakan filter di bawah untuk mencari teman yang pas.
                </p>
            </div>

            {/* Filter Section - Besar & Mudah di-tap */}
            <div className="p-6 bg-secondary/30 border border-border rounded-3xl mb-12 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-lg font-bold text-primary pl-1">Asal Kota</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger className="w-full h-16 text-lg bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-accent transition-colors">
                            <SelectValue placeholder="Pilih Kota Asal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="semua" className="text-lg py-3">Semua Kota</SelectItem>
                            <SelectItem value="jakarta" className="text-lg py-3">Jakarta</SelectItem>
                            <SelectItem value="bandung" className="text-lg py-3">Bandung</SelectItem>
                            <SelectItem value="surabaya" className="text-lg py-3">Surabaya</SelectItem>
                            <SelectItem value="yogyakarta" className="text-lg py-3">Yogyakarta</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-lg font-bold text-primary pl-1">Bahasa Pengantar</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-full h-16 text-lg bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-accent transition-colors">
                            <SelectValue placeholder="Pilih Bahasa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="semua" className="text-lg py-3">Semua Bahasa</SelectItem>
                            <SelectItem value="indonesia" className="text-lg py-3">Bahasa Indonesia</SelectItem>
                            <SelectItem value="jawa" className="text-lg py-3">Bahasa Jawa</SelectItem>
                            <SelectItem value="sunda" className="text-lg py-3">Bahasa Sunda</SelectItem>
                            <SelectItem value="inggris" className="text-lg py-3">Bahasa Inggris (English)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/3 flex items-end pt-2 md:pt-8">
                    <Button 
                        onClick={() => {
                            setSelectedCity("semua");
                            setSelectedLanguage("semua");
                        }}
                        variant="outline"
                        className="w-full h-16 text-xl bg-white border-2 border-primary text-primary hover:bg-primary/10 rounded-xl shadow-sm"
                    >
                        Reset Filter
                    </Button>
                </div>
            </div>

            {/* Grid Mentor */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.length > 0 ? (
                    filteredMentors.map((mentor) => (
                        <Card key={mentor.id} className="rounded-3xl border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden bg-white flex flex-col">
                            <CardHeader className="bg-primary/5 pb-4">
                                <div className="flex justify-between items-start">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                                    />
                                    <span className={`${mentor.titleColor} px-3 py-1 rounded-full text-sm font-semibold border`}>
                                        {mentor.title}
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className={`${mentor.badgeColor} px-3 py-1 rounded-full text-sm font-bold`}>
                                        {mentor.badge}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-primary">{mentor.name} ({mentor.age})</h3>
                                <div className="flex flex-col gap-2 mt-3">
                                    <div className="flex items-center text-emerald-700 bg-emerald-50 w-fit px-2.5 py-1 border border-emerald-200 rounded-md text-xs font-bold shadow-sm">
                                        <ShieldCheck size={14} className="mr-1.5" /> Lulus Kurasi Pedagogi SOWAN
                                    </div>
                                    <div className="flex items-center text-amber-500 text-sm font-bold">
                                        <Star size={16} fill="currentColor" className="mr-1" /> 4.9 <span className="text-muted-foreground ml-1.5 font-medium">(120 Ulasan Internasional)</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-muted-foreground mt-4 space-x-4">
                                    <div className="flex items-center">
                                        <Navigation size={18} className="mr-1" />
                                        <span>{mentor.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageCircle size={18} className="mr-1" />
                                        <span>{mentor.language}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 flex-1">
                                <p className="text-lg text-foreground/80 line-clamp-3">
                                    {mentor.desc}
                                </p>
                                <p className="text-xl font-bold text-primary mt-4">{mentor.price} / Sesi</p>
                            </CardContent>
                            <CardFooter className="pb-6 pt-2">
                                <Button 
                                    onClick={() => handleOpenModal(mentor)}
                                    className="w-full h-14 text-lg bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-bold"
                                >
                                    Buat Jadwal Sowan
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 px-4 bg-white rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
                            <User2 size={48} className="text-muted-foreground/60" />
                        </div>
                        <h3 className="text-3xl font-extrabold text-primary mb-3">Belum Ada Teman Sowan</h3>
                        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                            Maaf, belum ada Teman Sowan yang sesuai dengan kriteria kota dan bahasa tersebut.
                        </p>
                        <Button 
                            onClick={() => { setSelectedCity("semua"); setSelectedLanguage("semua"); }}
                            className="mt-8 border-primary text-white bg-primary hover:bg-primary/90 h-14 px-8 rounded-xl text-xl font-bold shadow-md"
                        >
                            Lihat Semua Mentor
                        </Button>
                    </div>
                )}
            </div>

            {/* Premium Checkout Modal */}
            {selectedMentor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity p-4">
                    <div 
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!isSuccess ? (
                            <div className="flex flex-col">
                                <div className="p-6 md:p-8 bg-primary/5 text-center relative border-b border-border">
                                    {/* Close Button */}
                                    <button 
                                        onClick={handleCloseModal}
                                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground bg-white rounded-full p-2 h-8 w-8 flex items-center justify-center font-bold text-xl shadow-sm border border-border"
                                    >×</button>
                                    
                                    <img 
                                        src={selectedMentor.image} 
                                        alt={selectedMentor.name}
                                        className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow-lg mb-4"
                                    />
                                    <h2 className="text-2xl font-extrabold text-primary">Konfirmasi Jadwal</h2>
                                    <p className="text-muted-foreground text-lg mt-1">Sowan bersama {selectedMentor.name}</p>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col items-center">
                                    <div className="w-full bg-slate-50 p-5 rounded-2xl border border-border mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-muted-foreground font-medium">Biaya Layanan</span>
                                            <span className="text-lg font-bold text-foreground">{selectedMentor.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                                            <span className="text-muted-foreground font-medium">Biaya Aplikasi</span>
                                            <span className="text-lg font-bold text-foreground">Rp 5.000</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-primary">Total Biaya</span>
                                            <span className="text-2xl font-black text-primary">
                                                Rp {(parseInt(selectedMentor.price.replace(/\D/g, '')) + 5000).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full h-16 text-xl bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                                    >
                                        {isProcessing ? "Memproses..." : (
                                            <>
                                                <ShieldCheck size={24} />
                                                Bayar Aman via Sowan Escrow
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-4">
                                        Pembayaran dijamin aman 100% oleh sistem Escrow SOWAN. Mbah akan menerima pembayaran setelah sesi selesai.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <CheckCircle size={64} className="animate-bounce" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-emerald-700 mb-3">Hore! Berhasil!</h2>
                                <p className="text-xl text-foreground/80 font-medium">
                                    Jadwal Sowan dengan <span className="font-bold text-primary">{selectedMentor.name}</span> berhasil diamankan!
                                </p>
                                <p className="text-muted-foreground mt-6 flex flex-col items-center">
                                    <span className="w-8 h-8 rounded-full border-t-2 border-emerald-600 animate-spin mb-3"></span>
                                    Mengarahkan ke dashboard...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
