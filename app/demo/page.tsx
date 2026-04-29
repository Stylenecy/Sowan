'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DemoPage() {
    const router = useRouter();
    const { user, login } = useAuth();

    useEffect(() => {
        // Auto-login as Dex after brief delay
        const timer = setTimeout(() => {
            login("Dex");
            router.push("/explore");
        }, 500);
        return () => clearTimeout(timer);
    }, [login, router]);

    return (
        <main className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <span className="text-4xl">🌾</span>
                </div>
                <h1 className="text-3xl font-black text-primary">Sowan.id Demo</h1>
                <p className="text-muted-foreground">Memuat demo interaktif...</p>
                <div className="flex items-center justify-center gap-3">
                    <div className="w-4 h-4 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-4 h-4 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-4 h-4 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </main>
    );
}