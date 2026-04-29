'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const DEMO_STEPS = [
    { message: "Memuat demo interaktif Sowan.id..." },
    { message: "Meluncur ke halaman eksplorasi..." },
    { message: "Menampilkan mentor tersedia..." },
    { message: "Demo siap! Pilih mentor untuk memulai." },
];

export default function DemoPage() {
    const router = useRouter();
    const { login, user } = useAuth();
    const [step, setStep] = useState(0);
    const [message, setMessage] = useState(DEMO_STEPS[0].message);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current || user) return;
        hasRun.current = true;

        login("Dex");
        setStep(1);
        setMessage(DEMO_STEPS[1].message);

        const t1 = setTimeout(() => {
            setStep(2);
            setMessage(DEMO_STEPS[2].message);
            router.push("/explore");
        }, 1500);

        return () => clearTimeout(t1);
    }, [user, login, router]);

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center pt-[72px]">
            <div className="text-center space-y-8 max-w-md px-6">
                {/* Logo */}
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <span className="text-5xl">🌾</span>
                </div>

                {/* Title */}
                <div>
                    <h1 className="text-3xl font-black text-primary mb-2">Sowan.id Demo</h1>
                    <p className="text-muted-foreground">Platform Sowan untuk menghubungkan generasi muda dengan lansia berpengalaman</p>
                </div>

                {/* Status */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-primary/5">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-primary/20'} animate-pulse`} />
                        <span className="text-sm font-bold text-primary">Login sebagai Dex (Customer)</span>
                    </div>
                    <p className="text-lg font-bold text-muted-foreground animate-pulse">
                        {message}
                    </p>
                </div>

                {/* Loading dots */}
                <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                    <div className="w-3 h-3 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                </div>

                {/* Skip button */}
                <Link href="/explore">
                    <button className="text-primary/50 hover:text-primary font-bold text-sm transition-colors">
                        Atau klik di sini untuk langsung menuju explore →
                    </button>
                </Link>
            </div>
        </main>
    );
}