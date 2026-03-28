"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, X, User2, LogIn, Globe, ChevronDown } from "lucide-react";

// Demo accounts for one-click login
const DEMO_ACCOUNTS = [
    { name: "Dex", emoji: "🧑‍💻", role: "Pengguna Baru" },
    { name: "Opa Adriel", emoji: "👴", role: "Teman Sowan" },
];

export default function Navbar() {
    const { user, login, logout, showLoginModal: showModal, setShowLoginModal: setShowModal } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const isMentor = user?.name === "Opa Adriel";

    const [name, setName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showModal) setTimeout(() => inputRef.current?.focus(), 100);
    }, [showModal]);

    const performLoginAndRoute = (loginName: string) => {
        login(loginName);
        setShowModal(false);
        setName("");
        
        // Auto-redirect logic
        if (loginName === "Opa Adriel") {
            router.push('/dashboard/mentor');
        } else if (window.location.pathname === "/") {
            // Only force customer to explore if they are on homepage
            router.push('/explore');
        }
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (name.trim()) {
            performLoginAndRoute(name.trim());
        }
    };

    const handleDemoLogin = (demoName: string) => {
        performLoginAndRoute(demoName);
    };

    return (
        <>
            <nav className="w-full bg-background border-b border-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Sowan */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-3xl font-bold text-primary tracking-tighter">
                                Sowan.id
                            </Link>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {user && (
                                <>
                                    <Link
                                        href="/explore"
                                        className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl"
                                    >
                                        {t.shared.explore}
                                    </Link>
                                    <Link
                                        href={isMentor ? "/dashboard/mentor" : "/dashboard/customer"}
                                        className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl"
                                    >
                                        {t.shared.schedule}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                            {/* Language Switcher - Premium Highlighted Version */}
                            <div className="relative group">
                                <Button 
                                    variant="outline" 
                                    className="h-12 px-4 rounded-2xl border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center gap-3 shadow-sm active:scale-95"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Globe size={18} className="text-primary" />
                                    </div>
                                    <div className="flex flex-col items-start translate-y-[1px]">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1 tracking-wider">{t.shared.language}</span>
                                        <span className="text-sm font-extrabold text-primary leading-none">
                                            {language === 'id' ? 'Indonesia' : 
                                             language === 'en' ? 'English' : 
                                             language === 'ja' ? '日本語' : 
                                             language === 'ko' ? '한국어' : '中文'}
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className="text-primary/40 transition-transform group-hover:rotate-180 ml-1" />
                                </Button>
                                
                                <div className="absolute top-full right-0 mt-3 w-48 bg-white/95 backdrop-blur-xl rounded-[24px] shadow-2xl shadow-black/10 border border-white/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60] transform origin-top-right translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100">
                                    <div className="p-2 space-y-1">
                                        {[
                                            { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
                                            { code: 'en', label: 'English', flag: '🇺🇸' },
                                            { code: 'ja', label: '日本語', flag: '🇯🇵' },
                                            { code: 'ko', label: '한국어', flag: '🇰🇷' },
                                            { code: 'zh', label: '中文', flag: '🇨🇳' }
                                        ].map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => setLanguage(lang.code as any)}
                                                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group/item ${language === lang.code ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' : 'hover:bg-primary/5 text-slate-700 font-semibold'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">{lang.flag}</span>
                                                    <span>{lang.label}</span>
                                                </div>
                                                {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <div className="hidden md:flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                                        <User2 size={18} className="text-primary" />
                                        <span className="font-semibold text-lg text-primary">{t.shared.hello}{user.name}</span>
                                    </div>
                                    <Button onClick={() => { logout(); router.push('/'); }} variant="outline" className="h-12 text-lg font-bold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-2xl">
                                        {t.shared.logout}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Button onClick={() => setShowModal(true)} variant="ghost" className="text-lg font-bold text-primary hover:bg-primary/5 px-6 h-12 rounded-2xl hidden md:flex">
                                        {t.shared.login}
                                    </Button>
                                    <Button onClick={() => setShowModal(true)} className="bg-accent hover:bg-accent/90 text-white text-lg font-extrabold px-8 h-12 shadow-lg shadow-accent/20 rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0">
                                        {t.shared.register}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Custom Login Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-8 text-center">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
                            >
                                <X size={20} />
                            </button>
                            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={32} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-white mb-1">
                                {t.shared.welcomeModal}
                            </h2>
                            <p className="text-white/70 text-lg">
                                {t.shared.loginDesc}
                            </p>
                        </div>

                        <div className="p-8">
                            {/* Manual Name Input */}
                            <form onSubmit={handleSubmit} className="mb-6">
                                <label className="block text-lg font-bold text-primary mb-3">
                                    {t.shared.nameLabel}
                                </label>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t.shared.namePlaceholder}
                                    className="w-full border-2 border-border rounded-2xl px-5 py-4 text-xl font-medium focus:outline-none focus:border-primary transition-colors mb-4"
                                />
                                <Button
                                    type="submit"
                                    disabled={!name.trim()}
                                    className="w-full h-14 text-xl bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold disabled:opacity-40 flex items-center justify-center gap-2"
                                >
                                    <LogIn size={22} />
                                    {t.shared.login}
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-border"></div>
                                <span className="text-muted-foreground text-sm font-medium px-2">
                                    {t.shared.demoLabel}
                                </span>
                                <div className="flex-1 h-px bg-border"></div>
                            </div>

                            {/* Demo Account Buttons */}
                            <div className="flex flex-col gap-3">
                                {DEMO_ACCOUNTS.map((acc) => (
                                    <button
                                        key={acc.name}
                                        onClick={() => handleDemoLogin(acc.name)}
                                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group text-left"
                                    >
                                        <span className="text-3xl">{acc.emoji}</span>
                                        <div>
                                            <p className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{acc.name}</p>
                                            <p className="text-muted-foreground text-sm">{acc.role}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
