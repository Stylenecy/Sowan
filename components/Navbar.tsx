"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, X, User2, LogIn, Globe, ChevronDown, Menu, ChevronRight } from "lucide-react";

// Demo accounts for one-click login
const DEMO_ACCOUNTS = [
    { name: "Dex", emoji: "🧑‍💻", role: "Pengguna Baru" },
    { name: "Opa Adriel", emoji: "👴", role: "Teman Sowan" },
];

const LANGUAGES = [
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
];

export default function Navbar() {
    const { user, login, logout, showLoginModal: showModal, setShowLoginModal: setShowModal } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const isMentor = user?.name === "Opa Adriel";

    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                            <Link href="/" className="text-2xl md:text-3xl font-bold text-primary tracking-tighter">
                                Sowan.id
                            </Link>
                        </div>

                        {/* Nav Links (Desktop Only) */}
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
                        <div className="flex items-center space-x-3 md:space-x-4">
                            {/* Language Switcher */}
                            <div className="relative group">
                                <Button 
                                    variant="outline" 
                                    className="h-11 md:h-14 px-3 md:px-6 rounded-2xl md:rounded-3xl border-2 border-primary/5 hover:border-primary/20 bg-white/50 backdrop-blur-md hover:bg-white transition-all flex items-center gap-3 md:gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] active:scale-95 group/btn"
                                >
                                    <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 shadow-inner group-hover/btn:scale-110 transition-transform">
                                        <span className="text-sm md:text-xl">{(LANGUAGES.find(l => l.code === language) || LANGUAGES[0]).flag}</span>
                                    </div>
                                    <div className="flex flex-col items-start translate-y-[1px]">
                                        <span className="text-[7px] md:text-[9px] uppercase font-black text-muted-foreground/60 leading-none mb-1.5 tracking-[0.15em]">{t.shared.language}</span>
                                        <span className="text-[10px] md:text-sm font-black text-primary leading-none tracking-tight">
                                            {(LANGUAGES.find(l => l.code === language) || LANGUAGES[0]).flag} <span className="hidden md:inline">{(LANGUAGES.find(l => l.code === language) || LANGUAGES[0]).label}</span>
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className="text-primary/20 transition-transform duration-500 group-hover:rotate-180 group-hover:text-primary/40" />
                                </Button>
                                
                                <div className="absolute top-full right-0 mt-4 w-56 bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white p-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[60] transform origin-top-right translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100">
                                    <div className="space-y-1.5">
                                        {LANGUAGES.map(lang => (
                                            <button
                                                key={lang.code}
                                                onClick={() => setLanguage(lang.code as any)}
                                                className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group/item ${language === lang.code ? 'bg-primary text-white font-black shadow-xl shadow-primary/25 scale-[1.02]' : 'hover:bg-primary/5 text-slate-600 font-bold hover:translate-x-1'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl group-hover/item:scale-125 transition-transform duration-300">{lang.flag}</span>
                                                    <span className="text-sm md:text-base">{lang.label}</span>
                                                </div>
                                                {language === lang.code && (
                                                    <div className="relative flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-white animate-ping absolute" />
                                                        <div className="w-2 h-2 rounded-full bg-white relative" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {user ? (
                                <div className="flex items-center space-x-3 md:space-x-4">
                                    <div className="hidden lg:flex items-center gap-3 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/5 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User2 size={16} className="text-primary" />
                                        </div>
                                        <span className="font-bold text-base text-primary tracking-tight">{t.shared.hello}{user.name}</span>
                                    </div>
                                    <Button onClick={() => { logout(); router.push('/'); }} variant="outline" className="h-11 md:h-14 px-4 md:px-6 text-sm md:text-lg font-black text-red-500 border-red-100 hover:bg-red-500 hover:text-white rounded-2xl md:rounded-3xl transition-all shadow-sm">
                                        {t.shared.logout}
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="md:hidden text-primary h-11 w-11 hover:bg-primary/5 rounded-2xl"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Button onClick={() => setShowModal(true)} variant="ghost" className="text-sm md:text-lg font-bold text-primary hover:bg-primary/5 px-4 md:px-6 h-10 md:h-12 rounded-xl md:rounded-2xl hidden sm:flex">
                                        {t.shared.login}
                                    </Button>
                                    <Button onClick={() => setShowModal(true)} className="bg-accent hover:bg-accent/90 text-white text-xs md:text-lg font-extrabold px-3 md:px-8 h-10 md:h-12 shadow-lg shadow-accent/20 rounded-xl md:rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 text-nowrap">
                                        {t.shared.register}
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="md:hidden text-primary h-10 w-10 ml-1"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Mobile Menu Overlay */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-border bg-white animate-in slide-in-from-top duration-300">
                            <div className="px-4 py-6 space-y-4">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-2xl mb-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xl">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-muted-foreground uppercase">{t.shared.hello.replace(',', '').trim()}</p>
                                                <p className="text-lg font-black text-primary leading-none">{user.name}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/explore"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#FAF9F6] text-primary font-black text-lg border border-black/5"
                                        >
                                            {t.shared.explore}
                                            <ChevronRight size={20} className="text-accent" />
                                        </Link>
                                        <Link
                                            href={isMentor ? "/dashboard/mentor" : "/dashboard/customer"}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#FAF9F6] text-primary font-black text-lg border border-black/5"
                                        >
                                            {t.shared.schedule}
                                            <ChevronRight size={20} className="text-accent" />
                                        </Link>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button onClick={() => { setShowModal(true); setIsMenuOpen(false); }} variant="outline" className="h-14 rounded-2xl font-black text-lg">
                                            {t.shared.login}
                                        </Button>
                                        <Button onClick={() => { setShowModal(true); setIsMenuOpen(false); }} className="h-14 rounded-2xl font-black text-lg bg-accent text-white">
                                            {t.shared.register}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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
