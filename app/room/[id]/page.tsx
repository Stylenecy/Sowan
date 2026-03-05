import React from 'react';
import Link from 'next/link';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

export default function RoomPage({ params }: { params: { id: string } }) {
    // Mock states for UI purposes
    const isMuted = false;
    const isVideoOff = false;

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] flex flex-col items-center justify-between p-4 md:p-8 font-sans">

            {/* Network Indicator */}
            <div className="w-full max-w-5xl flex justify-center mb-4">
                <div className="bg-green-100 border-4 border-green-500 rounded-full px-8 py-3 shadow-md">
                    <span className="text-green-800 font-extrabold text-xl md:text-2xl">
                        Status Jaringan: Stabil
                    </span>
                </div>
            </div>

            {/* Main Video Area */}
            <div className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-gray-300 flex items-center justify-center flex-1 my-4 min-h-[50vh]">
                {/* Mock Customer Video Placeholder */}
                <div className="text-gray-500 font-bold text-2xl md:text-4xl text-center px-4">
                    Video Customer (Lawan Bicara)
                </div>

                {/* Self Video Placeholder (Elderly) */}
                <div className="absolute bottom-6 right-6 w-1/3 max-w-[240px] aspect-video bg-gray-800 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
                    <span className="text-gray-400 font-bold text-lg md:text-xl">Kamera Sendiri</span>
                </div>
            </div>

            {/* Giant Control Bar */}
            <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-xl border-4 border-gray-100 p-6 md:p-10 flex flex-wrap gap-6 items-center justify-center mt-4">

                {/* Audio Toggle */}
                <button
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 hover:bg-gray-200 border-4 border-gray-300 flex items-center justify-center shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-8 focus:ring-gray-300/50"
                    aria-label={isMuted ? "Hidupkan Suara" : "Matikan Suara"}
                >
                    {isMuted ? (
                        <MicOff className="w-10 h-10 md:w-12 md:h-12 text-red-600" strokeWidth={3} />
                    ) : (
                        <Mic className="w-10 h-10 md:w-12 md:h-12 text-gray-800" strokeWidth={3} />
                    )}
                </button>

                {/* Video Toggle */}
                <button
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 hover:bg-gray-200 border-4 border-gray-300 flex items-center justify-center shadow-lg transition-transform active:scale-95 focus:outline-none focus:ring-8 focus:ring-gray-300/50"
                    aria-label={isVideoOff ? "Hidupkan Kamera" : "Matikan Kamera"}
                >
                    {isVideoOff ? (
                        <VideoOff className="w-10 h-10 md:w-12 md:h-12 text-red-600" strokeWidth={3} />
                    ) : (
                        <Video className="w-10 h-10 md:w-12 md:h-12 text-gray-800" strokeWidth={3} />
                    )}
                </button>

                {/* End Call Button - Extremely Prominent */}
                <Link
                    href="/dashboard/mentor"
                    className="ml-auto w-full md:w-auto mt-4 md:mt-0 px-10 h-24 md:h-28 bg-[#C53030] hover:bg-red-800 text-white rounded-[2rem] md:rounded-full text-2xl md:text-3xl font-extrabold shadow-xl hover:shadow-2xl transition-transform active:scale-95 flex items-center justify-center gap-4 focus:outline-none focus:ring-8 focus:ring-red-500/50"
                    aria-label="Akhiri Sesi Sowan"
                >
                    <PhoneOff className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                    AKHIRI SOWAN
                </Link>

            </div>

        </main>
    );
}
