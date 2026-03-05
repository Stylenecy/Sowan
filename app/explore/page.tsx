import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { User2, Navigation, MessageCircle } from "lucide-react";

export default function ExploreMentor() {
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

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
                    <Select>
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
                    <Select>
                        <SelectTrigger className="w-full h-16 text-lg bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-accent transition-colors">
                            <SelectValue placeholder="Pilih Bahasa" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="indonesia" className="text-lg py-3">Bahasa Indonesia</SelectItem>
                            <SelectItem value="jawa" className="text-lg py-3">Bahasa Jawa</SelectItem>
                            <SelectItem value="sunda" className="text-lg py-3">Bahasa Sunda</SelectItem>
                            <SelectItem value="inggris" className="text-lg py-3">Bahasa Inggris (English)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-1/3 flex items-end pt-2 md:pt-8">
                    <Button className="w-full h-16 text-xl bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md">
                        Terapkan Filter
                    </Button>
                </div>
            </div>

            {/* Grid Mentor */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Mentor Card 1 */}
                <Card className="rounded-3xl border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden bg-white">
                    <CardHeader className="bg-primary/5 pb-4">
                        <div className="flex justify-between items-start">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                                alt="Bapak Budi"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                            />
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold border border-accent/20">
                                Pensiunan Guru
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
                                Teman Sowan
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-primary">Bapak Budi (68)</h3>
                        <div className="flex items-center text-muted-foreground mt-2 space-x-4">
                            <div className="flex items-center">
                                <Navigation size={18} className="mr-1" />
                                <span>Yogyakarta</span>
                            </div>
                            <div className="flex items-center">
                                <MessageCircle size={18} className="mr-1" />
                                <span>Bahasa Jawa</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="text-lg text-foreground/80 line-clamp-3">
                            "Mari ngobrol santai soal sejarah, pengalaman hidup, atau sekadar berlatih bahasa Jawa. Saya senang mendengar cerita anak muda."
                        </p>
                        <p className="text-xl font-bold text-primary mt-4">Rp 100.000 / Sesi</p>
                    </CardContent>
                    <CardFooter className="pb-6 pt-2">
                        <Button asChild className="w-full h-14 text-lg bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-bold">
                            <Link href="/dashboard/mentor">
                                Buat Jadwal Sowan
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Mentor Card 2 */}
                <Card className="rounded-3xl border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden bg-white">
                    <CardHeader className="bg-primary/5 pb-4">
                        <div className="flex justify-between items-start">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                                alt="Ibu Ratna"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                            />
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold border border-accent/20">
                                Mantan Diplomat
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                                Pemandu Lokal
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-primary">Ibu Ratna (72)</h3>
                        <div className="flex items-center text-muted-foreground mt-2 space-x-4">
                            <div className="flex items-center">
                                <Navigation size={18} className="mr-1" />
                                <span>Jakarta</span>
                            </div>
                            <div className="flex items-center">
                                <MessageCircle size={18} className="mr-1" />
                                <span>Inggris / Indo</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="text-lg text-foreground/80 line-clamp-3">
                            "Ingin berlatih bahasa Inggris sambil membicarakan isu global masa lalu? Mari Sowan dengan saya. Berbagi pengalaman luar negeri adalah hobi saya."
                        </p>
                        <p className="text-xl font-bold text-primary mt-4">Rp 200.000 / Sesi</p>
                    </CardContent>
                    <CardFooter className="pb-6 pt-2">
                        <Button asChild className="w-full h-14 text-lg bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-bold">
                            <Link href="/dashboard/mentor">
                                Buat Jadwal Sowan
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Mentor Card 3 */}
                <Card className="rounded-3xl border border-border shadow-sm hover:shadow-lg transition-all overflow-hidden bg-white">
                    <CardHeader className="bg-primary/5 pb-4">
                        <div className="flex justify-between items-start">
                            <img
                                src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop"
                                alt="Bapak Dodi"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                            />
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold border border-accent/20">
                                Pebisnis Kuliner
                            </span>
                        </div>
                        <div className="mb-2">
                            <span className="bg-[#D97706]/10 text-[#D97706] px-3 py-1 rounded-full text-sm font-bold">
                                Tokoh Budaya
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-primary">Bapak Dodi (65)</h3>
                        <div className="flex items-center text-muted-foreground mt-2 space-x-4">
                            <div className="flex items-center">
                                <Navigation size={18} className="mr-1" />
                                <span>Bandung</span>
                            </div>
                            <div className="flex items-center">
                                <MessageCircle size={18} className="mr-1" />
                                <span>Sunda / Indo</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="text-lg text-foreground/80 line-clamp-3">
                            "Punya ide bisnis atau sekadar rindu membahas resep masakan tradisional? Ayo kita berdiskusi hangat ditemani secangkir teh."
                        </p>
                        <p className="text-xl font-bold text-primary mt-4">Rp 350.000 / Sesi</p>
                    </CardContent>
                    <CardFooter className="pb-6 pt-2">
                        <Button asChild className="w-full h-14 text-lg bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-bold">
                            <Link href="/dashboard/mentor">
                                Buat Jadwal Sowan
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
