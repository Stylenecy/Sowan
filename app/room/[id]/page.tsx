'use client';

import React, { useEffect, useRef, useState, useCallback, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Wifi, Clock, Volume2, VolumeX } from 'lucide-react';

function formatDuration(s: number) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const { t } = useLanguage();
    const myName = user?.name ?? t.room.self;

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isRemoteMuted, setIsRemoteMuted] = useState(true);
    const [cameraError, setCameraError] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Session timer
    useEffect(() => {
        const t = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(t);
    }, []);

    // Camera
    useEffect(() => {
        let active = true;
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
                streamRef.current = stream;
                setCameraError(false);
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch {
                if (active) setCameraError(true);
            }
        };
        if (!isVideoOff) startCamera();
        return () => {
            active = false;
            streamRef.current?.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        };
    }, [isVideoOff]);

    const toggleMute = useCallback(() => {
        streamRef.current?.getAudioTracks().forEach(t => { t.enabled = isMuted; });
        setIsMuted(p => !p);
    }, [isMuted]);

    const toggleVideo = useCallback(() => {
        streamRef.current?.getVideoTracks().forEach(t => { t.enabled = isVideoOff; });
        setIsVideoOff(p => !p);
    }, [isVideoOff]);

    const toggleRemoteMute = useCallback(() => {
        const nextMuted = !isRemoteMuted;
        setIsRemoteMuted(nextMuted);
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: nextMuted ? 'mute' : 'unMute'
                }),
                '*'
            );
        }
    }, [isRemoteMuted]);

    const isMentor = user?.name === 'Opa Adriel';

    // Determine partner details based on room ID or user role
    let partnerName = isMentor ? "Imeldya" : "Opa Adriel";
    let videoId = isMentor ? 'xUDcOBBF79o' : '9y3XCrhCbCw';
    let ytSource = isMentor ? "Bailey Schildbach" : "Bernard Albertson";
    let ytHandle = isMentor ? "@bailey.schildbach" : "@BernardAlbertson";

    // Custom overrides for specific female mentors
    if (id === '5') {
        partnerName = "Ibu Sri";
        videoId = "N90UIXMuMMU";
        ytSource = "Sandra Hart";
        ytHandle = "@lifewithsandrahart";
    } else if (id === '8') {
        partnerName = "Ibu Dian";
        videoId = "N90UIXMuMMU";
        ytSource = "Sandra Hart";
        ytHandle = "@lifewithsandrahart";
    } else if (id === '11') {
        partnerName = "Ibu Ningsih";
        videoId = "N90UIXMuMMU";
        ytSource = "Sandra Hart";
        ytHandle = "@lifewithsandrahart";
    }

    const ytUrl = `https://www.youtube.com/${ytHandle}`;

    return (
        <main className="fixed inset-0 bg-black flex flex-col overflow-hidden select-none">

            {/* ── Full-screen remote video ── */}
            <div className="absolute inset-0 z-0">
                <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1`}
                    allow="autoplay; encrypted-media"
                    className="absolute top-1/2 left-1/2 w-[115vw] h-[115vh] md:w-[120vw] md:h-[120vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 pointer-events-none" />

                {/* ── YouTube Source Credit (Premium Visibility) ── */}
                <div className="absolute top-28 left-4 sm:left-6 z-30 opacity-60 hover:opacity-100 transition-opacity max-w-[150px] sm:max-w-none">
                    <a
                        href={ytUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col bg-black/40 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm text-white/80 font-bold hover:text-white hover:bg-black/60 transition-all shadow-lg"
                    >
                        <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Source: YouTube</span>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <span className="truncate">{ytSource}</span>
                            <span className="text-white/40 font-medium truncate hidden sm:inline">{ytHandle}</span>
                        </div>
                    </a>
                </div>

                {/* ── Floating Remote Audio Toggle ── */}
                <div className="absolute top-28 right-4 sm:right-6 z-30">
                    <button
                        onClick={toggleRemoteMute}
                        className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[32px] flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all active:scale-90 shadow-2xl border backdrop-blur-xl group
                            ${isRemoteMuted
                                ? 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30'
                                : 'bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30'}`}
                    >
                        {isRemoteMuted ? (
                            <VolumeX className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 group-hover:scale-110 transition-transform" />
                        ) : (
                            <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                        )}
                        <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest 
                            ${isRemoteMuted ? 'text-red-300' : 'text-emerald-300'}`}>
                            {isRemoteMuted ? 'Unmute' : 'Mute'}
                        </span>
                    </button>
                    <div className="mt-2 text-center hidden sm:block">
                        <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">Partner Audio</p>
                    </div>
                </div>
            </div>

            {/* ── TOP HUD ── */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-5 pt-4 sm:pt-5 gap-3">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 sm:py-2 rounded-full w-full sm:w-auto justify-center">
                    <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight">Sowan.id</span>
                    <span className="text-white/40 text-lg">|</span>
                    <span className="text-white/70 text-xs sm:text-base font-medium truncate">{t.room.sessionLabel} #{id}</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-emerald-400 font-bold text-xs sm:text-sm">
                        <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{t.room.stable}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" />
                        <span className="text-white font-mono font-bold text-xs sm:text-sm">{formatDuration(elapsed)}</span>
                    </div>
                </div>
            </div>

            {/* ── Partner Info ── */}
            <div className="absolute bottom-32 sm:bottom-28 left-4 sm:left-5 z-20">
                <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex flex-col gap-0.5 sm:gap-1 max-w-[150px] sm:max-w-none">
                    <p className="text-white/40 text-[8px] sm:text-[10px] uppercase font-black tracking-widest">{t.room.partner}</p>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="text-white font-bold text-sm sm:text-lg truncate">{partnerName}</span>
                    </div>
                </div>
            </div>

            {/* ── Self PiP ── */}
            <div className="absolute bottom-32 sm:bottom-28 right-4 sm:right-5 z-20 w-[120px] sm:w-[220px] aspect-video rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gray-900">
                {isVideoOff ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                        <VideoOff className="w-5 h-5 sm:w-7 sm:h-7 text-gray-500" />
                        <span className="text-gray-400 text-[8px] sm:text-xs font-bold uppercase tracking-tighter">{t.room.cameraOff}</span>
                    </div>
                ) : cameraError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                        <VideoOff className="w-5 h-5 sm:w-7 sm:h-7 text-red-400" />
                        <span className="text-red-300 text-[8px] sm:text-xs font-bold text-center px-1 sm:px-2">{t.room.cameraErr}</span>
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay playsInline muted
                        className="w-full h-full object-cover"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                )}
                <div className="absolute bottom-1 sm:bottom-1.5 left-1 sm:left-1.5 bg-black/60 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg flex items-center gap-1 max-w-[90%]">
                    <span className="text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest truncate">{myName}</span>
                    {isMuted && <span className="text-red-400 text-[10px]">🔇</span>}
                </div>
            </div>

            {/* ── BOTTOM CONTROLS ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 sm:pb-8 pt-4 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="flex items-center justify-center gap-3 sm:gap-6 px-4 sm:px-6">

                    <button
                        onClick={toggleMute}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-xl shrink-0
                            ${isMuted ? 'bg-red-600 ring-4 ring-red-500/20' : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}
                    >
                        {isMuted ? <MicOff className="w-5 h-5 sm:w-7 sm:h-7 text-white" /> : <Mic className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
                    </button>

                    <button
                        onClick={toggleVideo}
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-xl shrink-0
                            ${isVideoOff ? 'bg-red-600 ring-4 ring-red-500/20' : 'bg-white/10 hover:bg-white/20 border border-white/20'}`}
                    >
                        {isVideoOff ? <VideoOff className="w-5 h-5 sm:w-7 sm:h-7 text-white" /> : <Video className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
                    </button>

                    <Link
                        href={isMentor ? "/feedback-mentor" : "/feedback"}
                        className="flex items-center justify-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-base sm:text-xl px-4 sm:px-12 py-3.5 sm:py-5 rounded-2xl sm:rounded-[28px] shadow-2xl shadow-red-500/20 transition-all border-b-4 border-red-900 flex-1 sm:flex-none"
                    >
                        <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                        <span className="whitespace-nowrap">{t.room.endCall}</span>
                    </Link>

                </div>
            </div>

        </main>
    );
}
