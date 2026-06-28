"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, X, User2, LogIn, Globe, ChevronDown, Menu, ChevronRight, Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

const DEMO_ACCOUNTS = [
    { name: "Dex", emoji: "🧑‍💻", role: "Pengguna Baru (Customer)" },
    { name: "Opa Adriel", emoji: "👴", role: "Teman Sowan (Mentor)" },
    { name: "Admin", emoji: "🛡️", role: "Admin Platform" },
];

const LANGUAGES = [
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'zh', label: '中文', flag: '🇨🇳' }
];

type AuthTab = 'real' | 'demo';
type AuthMode = 'login' | 'signup';

export default function Navbar() {
    const { user, login, loginWithEmail, signUpWithEmail, logout, showLoginModal: showModal, setShowLoginModal: setShowModal, isLoading: authLoading, isSupabaseMode } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const isMentor = user?.role === 'mentor' || (!user?.role && user?.name === "Opa Adriel");
    const isAdmin = user?.role === 'admin' || (!user?.role && user?.name === "Admin");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<AuthTab>(isSupabaseMode ? 'real' : 'demo');
    const [authMode, setAuthMode] = useState<AuthMode>('login');

    // Demo mode state
    const [demoName, setDemoName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Real auth state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [authSubmitting, setAuthSubmitting] = useState(false);
    const [authSuccess, setAuthSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (showModal) setTimeout(() => inputRef.current?.focus(), 100);
        if (!showModal) {
            setAuthError(null);
            setAuthSuccess(null);
            setEmail("");
            setPassword("");
            setFullName("");
        }
    }, [showModal]);

    useEffect(() => {
        setActiveTab(isSupabaseMode ? 'real' : 'demo');
    }, [isSupabaseMode]);

    const performLoginAndRoute = (loginName: string) => {
        login(loginName);
        setShowModal(false);
        setDemoName("");
        const role = loginName === "Opa Adriel" ? "mentor" : loginName === "Admin" ? "admin" : "customer";
        if (role === "mentor") {
            router.push('/dashboard/mentor');
        } else if (role === "admin") {
            router.push('/dashboard/admin');
        } else if (window.location.pathname === "/") {
            router.push('/explore');
        }
    };

    const handleDemoSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (demoName.trim()) performLoginAndRoute(demoName.trim());
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);
        setAuthSuccess(null);
        setAuthSubmitting(true);

        try {
            if (authMode === 'login') {
                const { error } = await loginWithEmail(email, password);
                if (error) {
                    setAuthError(error);
                } else {
                    setShowModal(false);
                    const dest = user?.role === 'mentor' ? '/dashboard/mentor' : '/dashboard/customer';
                    router.push(dest);
                }
            } else {
                if (!fullName.trim()) { setAuthError("Nama lengkap wajib diisi."); setAuthSubmitting(false); return; }
                const { error } = await signUpWithEmail(fullName.trim(), email, password, 'customer');
                if (error) {
                    setAuthError(error);
                } else {
                    setAuthSuccess("Akun berhasil dibuat! Silakan masuk.");
                    setAuthMode('login');
                }
            }
        } finally {
            setAuthSubmitting(false);
        }
    };

    return (
        <>
            <nav className="w-full bg-background/95 backdrop-blur-xl border-b border-border fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl md:text-3xl font-bold text-primary tracking-tighter">
                                Sowan.id
                            </Link>
                        </div>

                        {/* Nav Links (Desktop) */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {user && !authLoading && isAdmin && (
                                <>
                                    <Link href="/dashboard/admin" className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl">
                                        Panel Admin
                                    </Link>
                                    <Link href="/agents" className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl flex items-center gap-1.5">
                                        <Sparkles size={16} className="text-accent" />
                                        AI Agents
                                    </Link>
                                </>
                            )}
                            {user && !authLoading && !isAdmin && (
                                <>
                                    <Link href="/explore" className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl">
                                        {t.shared.explore}
                                    </Link>
                                    <Link href={isMentor ? "/dashboard/mentor" : "/dashboard/customer"} className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl">
                                        {t.shared.schedule}
                                    </Link>
                                    <Link href="/agents" className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl flex items-center gap-1.5">
                                        <Sparkles size={16} className="text-accent" />
                                        AI Agents
                                    </Link>
                                </>
                            )}
                            <Link href="/agents" className="text-foreground hover:text-accent font-semibold transition-colors px-3 py-2 text-xl flex items-center gap-1.5">
                                <Sparkles size={16} className="text-accent" />
                                AI Agents
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-3 md:space-x-4">
                            {/* Language Switcher */}
                            <div className="relative group">
                                <Button variant="outline" className="h-11 md:h-14 px-3 md:px-6 rounded-2xl md:rounded-3xl border-2 border-primary/5 hover:border-primary/20 bg-white/50 backdrop-blur-md hover:bg-white transition-all flex items-center gap-3 md:gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] active:scale-95 group/btn">
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
                                            <button key={lang.code} onClick={() => setLanguage(lang.code as 'id' | 'en' | 'ja' | 'ko' | 'zh')} className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group/item ${language === lang.code ? 'bg-primary text-white font-black shadow-xl shadow-primary/25 scale-[1.02]' : 'hover:bg-primary/5 text-slate-600 font-bold hover:translate-x-1'}`}>
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

                            {authLoading ? (
                                <Loader2 size={24} className="animate-spin text-primary/40" />
                            ) : user ? (
                                <div className="flex items-center space-x-3 md:space-x-4">
                                    <div className="hidden lg:flex items-center gap-3 bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/5 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User2 size={16} className="text-primary" />
                                        </div>
                                        <span className="font-bold text-base text-primary tracking-tight">{t.shared.hello}{user.name}</span>
                                    </div>
                                    <Button onClick={async () => { await logout(); router.push('/'); }} variant="outline" className="h-11 md:h-14 px-4 md:px-6 text-sm md:text-lg font-black text-red-500 border-red-100 hover:bg-red-500 hover:text-white rounded-2xl md:rounded-3xl transition-all shadow-sm">
                                        {t.shared.logout}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="md:hidden text-primary h-11 w-11 hover:bg-primary/5 rounded-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                                    <Button variant="ghost" size="icon" className="md:hidden text-primary h-10 w-10 ml-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
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
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{
                                                    isAdmin ? "Admin" : isMentor ? "Mentor" : "Customer"
                                                }</p>
                                            </div>
                                        </div>
                                        {isAdmin ? (
                                            <Link href="/dashboard/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between w-full p-4 rounded-2xl bg-background text-primary font-black text-lg border border-black/5">
                                                Panel Admin <ChevronRight size={20} className="text-accent" />
                                            </Link>
                                        ) : (
                                            <>
                                                <Link href="/explore" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between w-full p-4 rounded-2xl bg-background text-primary font-black text-lg border border-black/5">
                                                    {t.shared.explore} <ChevronRight size={20} className="text-accent" />
                                                </Link>
                                                <Link href={isMentor ? "/dashboard/mentor" : "/dashboard/customer"} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between w-full p-4 rounded-2xl bg-background text-primary font-black text-lg border border-black/5">
                                                    {t.shared.schedule} <ChevronRight size={20} className="text-accent" />
                                                </Link>
                                            </>
                                        )}
                                        <Link href="/agents" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between w-full p-4 rounded-2xl bg-background text-primary font-black text-lg border border-black/5">
                                            <span className="flex items-center gap-2"><Sparkles size={18} className="text-accent" /> AI Agents</span> <ChevronRight size={20} className="text-accent" />
                                        </Link>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button onClick={() => { setShowModal(true); setIsMenuOpen(false); }} variant="outline" className="h-14 rounded-2xl font-black text-lg">{t.shared.login}</Button>
                                        <Button onClick={() => { setShowModal(true); setIsMenuOpen(false); }} className="h-14 rounded-2xl font-black text-lg bg-accent text-white">{t.shared.register}</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Auth Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-8 text-center">
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all">
                                <X size={20} />
                            </button>
                            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles size={32} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-white mb-1">{t.shared.welcomeModal}</h2>
                            <p className="text-white/70 text-lg">{t.shared.loginDesc}</p>
                        </div>

                        <div className="p-8">
                            {/* Tab Switcher (only if Supabase configured) */}
                            {isSupabaseMode && (
                                <div className="flex bg-background rounded-2xl p-1 mb-6">
                                    <button onClick={() => setActiveTab('real')} className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'real' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                                        Akun Nyata
                                    </button>
                                    <button onClick={() => setActiveTab('demo')} className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'demo' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                                        Demo
                                    </button>
                                </div>
                            )}

                            {/* REAL AUTH TAB */}
                            {activeTab === 'real' && (
                                <>
                                    {/* Login / Signup toggle */}
                                    <div className="flex gap-2 mb-5">
                                        <button onClick={() => { setAuthMode('login'); setAuthError(null); setAuthSuccess(null); }} className={`flex-1 py-2 rounded-xl text-sm font-black border-2 transition-all ${authMode === 'login' ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground'}`}>
                                            Masuk
                                        </button>
                                        <button onClick={() => { setAuthMode('signup'); setAuthError(null); setAuthSuccess(null); }} className={`flex-1 py-2 rounded-xl text-sm font-black border-2 transition-all ${authMode === 'signup' ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground'}`}>
                                            Daftar
                                        </button>
                                    </div>

                                    {authSuccess && (
                                        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium">
                                            {authSuccess}
                                        </div>
                                    )}
                                    {authError && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                                            {authError}
                                        </div>
                                    )}

                                    <form onSubmit={handleEmailAuth} className="space-y-4">
                                        {authMode === 'signup' && (
                                            <div>
                                                <label className="block text-sm font-bold text-primary mb-1.5">Nama Lengkap</label>
                                                <div className="relative">
                                                    <User2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                                                    <input
                                                        type="text"
                                                        value={fullName}
                                                        onChange={e => setFullName(e.target.value)}
                                                        placeholder="Nama kamu"
                                                        className="w-full border-2 border-border rounded-2xl pl-11 pr-4 py-3.5 text-base font-medium focus:outline-none focus:border-primary transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-bold text-primary mb-1.5">Email</label>
                                            <div className="relative">
                                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder="kamu@email.com"
                                                    className="w-full border-2 border-border rounded-2xl pl-11 pr-4 py-3.5 text-base font-medium focus:outline-none focus:border-primary transition-colors"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-primary mb-1.5">Password</label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30" />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    placeholder="Min. 8 karakter"
                                                    className="w-full border-2 border-border rounded-2xl pl-11 pr-12 py-3.5 text-base font-medium focus:outline-none focus:border-primary transition-colors"
                                                    required
                                                    minLength={8}
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary/60 transition-colors">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <Button type="submit" disabled={authSubmitting} className="w-full h-13 text-lg bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
                                            {authSubmitting ? (
                                                <><Loader2 size={20} className="animate-spin" /> Memproses...</>
                                            ) : authMode === 'login' ? (
                                                <><LogIn size={20} /> Masuk</>
                                            ) : (
                                                <><UserPlus size={20} /> Buat Akun</>
                                            )}
                                        </Button>
                                    </form>
                                </>
                            )}

                            {/* DEMO TAB */}
                            {activeTab === 'demo' && (
                                <>
                                    <form onSubmit={handleDemoSubmit} className="mb-6">
                                        <label className="block text-lg font-bold text-primary mb-3">{t.shared.nameLabel}</label>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={demoName}
                                            onChange={e => setDemoName(e.target.value)}
                                            placeholder={t.shared.namePlaceholder}
                                            className="w-full border-2 border-border rounded-2xl px-5 py-4 text-xl font-medium focus:outline-none focus:border-primary transition-colors mb-4"
                                        />
                                        <Button type="submit" disabled={!demoName.trim()} className="w-full h-14 text-xl bg-accent hover:bg-accent/90 text-white rounded-2xl font-bold disabled:opacity-40 flex items-center justify-center gap-2">
                                            <LogIn size={22} /> {t.shared.login}
                                        </Button>
                                    </form>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex-1 h-px bg-border"></div>
                                        <span className="text-muted-foreground text-sm font-medium px-2">{t.shared.demoLabel}</span>
                                        <div className="flex-1 h-px bg-border"></div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {DEMO_ACCOUNTS.map(acc => (
                                            <button key={acc.name} onClick={() => performLoginAndRoute(acc.name)} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group text-left">
                                                <span className="text-3xl">{acc.emoji}</span>
                                                <div>
                                                    <p className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{acc.name}</p>
                                                    <p className="text-muted-foreground text-sm">{acc.role}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
