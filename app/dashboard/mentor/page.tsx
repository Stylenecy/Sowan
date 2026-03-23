import React from 'react';
import Link from 'next/link';

export default function MentorDashboard() {
    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] flex flex-col items-center justify-center p-6 md:p-12 font-sans text-[#1A365D]">

            <div className="w-full max-w-5xl flex flex-col items-center space-y-12 md:space-y-20">

                {/* Header / Greeting */}
                <h1 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight leading-snug drop-shadow-sm text-[#1A365D]">
                    Selamat Pagi, Oma Ratna
                </h1>

                {/* Giant Schedule Card */}
                <div className="w-full bg-white rounded-[3rem] shadow-2xl border-[6px] border-[#1A365D]/10 p-10 md:p-20 flex flex-col items-center space-y-16">

                    {/* Card Content */}
                    <div className="text-3xl md:text-5xl font-bold flex flex-col items-center space-y-10 text-center w-full">
                        <div className="w-full bg-blue-50/50 rounded-[2rem] p-10 border-4 border-[#1A365D]/20 shadow-inner">
                            <span className="text-[#1A365D]/80 block mb-4 text-2xl md:text-3xl font-semibold">Jadwal Hari Ini</span>
                            <span className="font-extrabold text-[#1A365D] leading-relaxed">
                                Mahasiswa John Doe
                                <br/>
                                <span className="text-4xl md:text-6xl text-[#D97706] mt-4 block">Bahasa Indonesia Bisnis</span>
                            </span>
                        </div>
                    </div>

                    {/* Action Button - Unmissable */}
                    <Link
                        href="/room/123"
                        className="w-full flex items-center justify-center md:w-4/5 h-32 md:h-40 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-4xl md:text-5xl font-black shadow-2xl hover:shadow-[0_20px_50px_rgba(217,119,6,0.5)] transition-all transform active:scale-95 focus:outline-none focus:ring-8 focus:ring-[#D97706]/50 mt-8 border-b-8 border-[#92400E]"
                        aria-label="Mulai Sesi Video Call Sekarang"
                    >
                        MULAI SOWAN
                    </Link>
                </div>

            </div>
        </main>
    );
}
