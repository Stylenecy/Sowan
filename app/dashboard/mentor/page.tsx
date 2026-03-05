import React from 'react';
import Link from 'next/link';

export default function MentorDashboard() {
    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] flex flex-col items-center justify-center p-6 md:p-12 font-sans">

            <div className="w-full max-w-4xl flex flex-col items-center space-y-10 md:space-y-16">

                {/* Header / Greeting */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 text-center tracking-tight leading-snug">
                    Selamat Pagi, Oma Ratna
                </h1>

                {/* Giant Schedule Card */}
                <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border-4 border-gray-100 p-8 md:p-16 flex flex-col items-center space-y-12">

                    {/* Card Content */}
                    <div className="text-2xl md:text-4xl font-medium text-gray-800 flex flex-col items-center space-y-8 text-center w-full">
                        <div className="w-full bg-gray-50 rounded-3xl p-6 border-2 border-gray-100">
                            <span className="text-gray-500 block mb-2 text-xl md:text-2xl font-normal">Customer</span>
                            <span className="font-bold text-gray-900">Kenji</span>
                        </div>

                        <div className="w-full bg-gray-50 rounded-3xl p-6 border-2 border-gray-100">
                            <span className="text-gray-500 block mb-2 text-xl md:text-2xl font-normal">Topik</span>
                            <span className="font-bold text-gray-900">Bahasa Indonesia Bisnis</span>
                        </div>

                        <div className="w-full bg-orange-50 rounded-3xl p-6 border-2 border-orange-100">
                            <span className="text-orange-600 block mb-2 text-xl md:text-2xl font-normal">Jam</span>
                            <span className="font-bold text-[#D97706]">10.00 WIB</span>
                        </div>
                    </div>

                    {/* Action Button - Unmissable */}
                    <Link
                        href="/room/123"
                        className="w-full flex items-center justify-center md:w-[90%] h-24 md:h-32 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-3xl md:text-4xl font-extrabold shadow-xl hover:shadow-2xl transition-all active:scale-95 focus:outline-none focus:ring-8 focus:ring-[#D97706]/50 mt-4"
                        aria-label="Mulai Sowan Sekarang"
                    >
                        MULAI SOWAN
                    </Link>
                </div>

            </div>
        </main>
    );
}
