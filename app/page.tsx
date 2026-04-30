"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, Sparkles, ShieldCheck, Award, Globe, Video, Calendar, HeartHandshake, Quote, Star, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { user, setShowLoginModal } = useAuth();
  const { t } = useLanguage();
  const [headlineVisible, setHeadlineVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeadlineVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const featuredMentors = [
    {
      id: 1,
      name: "Opa Adriel",
      title: "Pakar Sejarah Jawa",
      quote: "\"Setiap batik punya doa. Itu yang tak bisa diajarkan di sekolah.\"",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      slots: 3,
    },
    {
      id: 2,
      name: "Ibu Ratna",
      title: "Mantan Diplomat",
      quote: "\"Diplomasi dimulai dari senyum. Itu modal termurah tapi paling berharga.\"",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      slots: 0,
    },
    {
      id: 3,
      name: "Bapak Dodi",
      title: "Pebisnis Kuliner",
      quote: "\"Resep rahasia? Tidak ada. Yang ada hanya cinta yang tak pernah bohong.\"",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop",
      slots: 2,
    },
    {
      id: 4,
      name: "Opa Yohanes",
      title: "Musisi Keroncong",
      quote: "\"Musik tak punya batas. Satu lagu bisa menyatukan Benua.\"",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&auto=format&fit=crop",
      slots: 1,
    },
    {
      id: 5,
      name: "Ibu Sri",
      title: "Pengrajin Batik",
      quote: "\"Kau tidak bisa terburu-buru membuat sesuatu yang bermakna seumur hidup.\"",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop",
      slots: 4,
    },
    {
      id: 6,
      name: "Bapak Hasan",
      title: "Pakar Pertanian",
      quote: "\"Tanah tidak pernah mengkhianati mereka yang sabar merawatnya.\"",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200&auto=format&fit=crop",
      slots: 0,
    },
  ];

  const testimonials = [
    {
      name: "Ahmad R.",
      country: "Netherlands",
      flag: "🇳🇱",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "Akhirnya bisa belajar Bahasa Jawa dari orang Jawa asli. Pengalaman yang tidak bisa dibeli dengan uang.",
      rating: 5,
    },
    {
      name: "Sarah M.",
      country: "United Kingdom",
      flag: "🇬🇧",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "Sesi dengan Opa Adriel mengubah cara saya memahami sejarah Indonesia. Sangat berkesan!",
      rating: 5,
    },
    {
      name: "Kenji T.",
      country: "Japan",
      flag: "🇯🇵",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      text: "Belajar budaya melalui cerita langsung dari yang pernah hidup di dalamnya. Ini pendidikan terbaik.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#FAF9F6] text-[#1A365D] overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Text Content (Left Side) */}
        <div className="flex-1 text-center lg:text-left space-y-10 z-10">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm transition-all duration-700 ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-accent font-semibold text-lg tracking-wide">
              {t.home.sparkle}
            </span>
          </div>

          {/* Animated Headline */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary leading-[1.15] tracking-tight transition-all duration-700 ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block">{t.home.headline1}</span>
            <span className="block mt-2">{t.home.headline2}</span>
            <span className="block mt-2 text-accent italic">{t.home.headline3}</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light transition-all duration-700 delay-200 ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t.home.desc}
          </p>

          {/* CTA + Trust Signal */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start items-center">
              <Button asChild size="lg" className="group bg-[#D97706] hover:bg-[#D97706]/90 text-white text-lg sm:text-2xl py-6 sm:py-8 px-8 sm:px-12 rounded-full shadow-[0_8px_30px_rgb(217,119,6,0.3)] hover:shadow-[0_8px_40px_rgb(217,119,6,0.5)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 h-auto font-bold min-h-[56px] sm:min-h-[64px] w-full sm:w-auto">
                <Link href="/explore">
                  {t.home.findBtn}
                </Link>
              </Button>

              {user ? (
                <Button asChild variant="ghost" size="lg" className="text-primary hover:bg-primary/5 text-lg sm:text-2xl py-4 sm:py-8 px-8 rounded-full transition-all h-auto font-medium min-h-[56px] sm:min-h-[64px]">
                  <Link href={user.name === "Opa Adriel" ? "/dashboard/mentor" : "/dashboard/customer"}>
                    {t.home.scheduleBtn}
                  </Link>
                </Button>
              ) : (
                <Button onClick={() => setShowLoginModal(true)} variant="ghost" size="lg" className="text-primary hover:bg-primary/5 text-xl sm:text-2xl py-8 px-8 rounded-full transition-all h-auto font-medium min-h-[64px]">
                  {t.shared.login}
                </Button>
              )}
            </div>

            {/* Trust Signal */}
            <p className="text-sm text-primary/50 font-medium flex items-center justify-center lg:justify-start gap-2">
              <span className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#FAF9F6] flex items-center justify-center text-[10px]">🇳🇱</span>
                <span className="w-6 h-6 rounded-full bg-blue-500 border-2 border-[#FAF9F6] flex items-center justify-center text-[10px]">🇬🇧</span>
                <span className="w-6 h-6 rounded-full bg-red-500 border-2 border-[#FAF9F6] flex items-center justify-center text-[10px]">🇯🇵</span>
                <span className="w-6 h-6 rounded-full bg-amber-500 border-2 border-[#FAF9F6] flex items-center justify-center text-[10px]">+</span>
              </span>
              {t.home.trustSignal}
            </p>

            {/* Demo CTA */}
            <div className="pt-2">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-all group"
              >
                <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs transition-all group-hover:bg-accent/20">▶</span>
                {t.home.tryDemo || "Coba Demo Interaktif"}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visuals (Right Side) */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10">

          {/* Main Image with Floating Animation */}
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D97706]/20 to-[#1A365D]/10 mix-blend-multiply z-10"></div>

            <Image
              src="/wanita_cover_tua.png"
              alt="Potret Maestro Sowan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/60 to-transparent z-10"></div>
          </div>

          {/* Floating Glassmorphism Card 1: Users */}
          <div className="absolute -left-2 sm:-left-8 lg:-left-12 top-8 sm:top-16 lg:top-24 bg-white/80 backdrop-blur-xl border border-white/50 p-3 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-20 flex items-center gap-3 sm:gap-4 animate-float-delayed">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary font-serif">500+</p>
              <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-muted-foreground whitespace-nowrap">{t.home.friendsJoined}</p>
            </div>
          </div>

          {/* Floating Glassmorphism Card 2: Emotional Quote */}
          <div className="absolute -right-2 sm:-right-6 lg:-right-8 bottom-8 sm:bottom-16 lg:bottom-28 bg-white/80 backdrop-blur-xl border border-white/50 p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-20 max-w-[160px] sm:max-w-[200px] lg:max-w-[240px] animate-float-delayed-2">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-lg sm:text-xl lg:text-2xl mt-0.5">👵</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Heart className="w-3 h-3 text-destructive fill-destructive" />
                  <Heart className="w-3 h-3 text-destructive fill-destructive" />
                  <Heart className="w-3 h-3 text-destructive fill-destructive" />
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-primary leading-tight">
                  "{t.home.bottomQuote}."
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 -top-8 -right-8 w-56 h-56 lg:w-64 lg:h-64 bg-accent/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 lg:w-72 lg:h-72 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="w-full bg-primary py-12 sm:py-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-white">
                  <AnimatedCounter target={500} suffix="+" />
                </span>
              </div>
              <p className="text-white/60 text-sm sm:text-base font-medium">{t.home.statsUsers}</p>
            </div>

            <div className="text-center border-x border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-white">
                  <AnimatedCounter target={14} />
                </span>
              </div>
              <p className="text-white/60 text-sm sm:text-base font-medium">{t.home.statsMaestros}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-white">
                  <AnimatedCounter target={5} />
                </span>
              </div>
              <p className="text-white/60 text-sm sm:text-base font-medium">{t.home.statsLanguages}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="w-full bg-primary py-8 sm:py-12 border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

            <div className="flex items-center gap-5 justify-center md:justify-start group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">{t.home.trustLanguages}</p>
                <p className="text-white/60 text-sm font-medium tracking-wide">{t.home.trustLanguagesSub}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 justify-center md:justify-start group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">{t.home.trustCurated}</p>
                <p className="text-white/60 text-sm font-medium tracking-wide">{t.home.trustCuratedSub}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 justify-center md:justify-start group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">{t.home.trustEscrow}</p>
                <p className="text-white/60 text-sm font-medium tracking-wide">{t.home.trustEscrowSub}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden border-t border-black/5 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            <div className="flex-1 space-y-8 z-10 w-full text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.15] tracking-tight font-serif relative inline-block">
                {t.home.aboutTitle}
                <div className="absolute -bottom-4 left-0 lg:left-0 right-0 lg:right-auto w-24 h-2 bg-accent rounded-full mx-auto lg:mx-0"></div>
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
                {t.home.aboutDesc}
              </p>

              <div className="mt-12 space-y-8">

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Video className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">{t.home.aboutExclusives}</h4>
                    <p className="text-muted-foreground text-lg leading-snug">{t.home.aboutExclusivesDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Calendar className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">{t.home.aboutFlexible}</h4>
                    <p className="text-muted-foreground text-lg leading-snug">{t.home.aboutFlexibleDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <HeartHandshake className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">{t.home.aboutImpact}</h4>
                    <p className="text-muted-foreground text-lg leading-snug">{t.home.aboutImpactDesc}</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex-1 w-full max-w-xl mx-auto lg:max-w-none relative z-10 mt-10 lg:mt-0">

              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl z-0">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                  alt="Maestro Sowan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/60 to-transparent z-[5]"></div>
                <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-sm text-[8px] text-white/80 px-2 py-1 rounded-md uppercase tracking-widest pointer-events-none z-10">
                  Source: Unsplash
                </div>
              </div>

              <div className="absolute -left-4 sm:-left-12 top-10 sm:top-20 bg-white/80 backdrop-blur-xl border border-white/50 p-4 sm:p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-20 flex items-center gap-4 animate-in slide-in-from-left-8 duration-1000 delay-100 max-w-[280px]">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base font-bold text-primary leading-tight">
                  {t.home.badgeSecure}
                </p>
              </div>

              <div className="absolute -right-4 sm:-right-10 bottom-10 sm:bottom-20 bg-white/80 backdrop-blur-xl border border-white/50 p-4 sm:p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-20 flex items-center gap-4 animate-in slide-in-from-right-8 duration-1000 delay-300 max-w-[300px]">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Award className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base font-bold text-primary leading-tight">
                  {t.home.badgeCurated}
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Featured Maestros Section */}
      <section className="w-full bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6">
              {t.home.maestroTitle}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.home.maestroDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {featuredMentors.map((mentor) => (
              <Link
                href={`/mentor/${mentor.id}`}
                key={mentor.id}
                className="group/card relative flex flex-col items-center p-8 rounded-3xl bg-[#FAF9F6] border-2 border-transparent hover:border-accent/30 hover:shadow-[0_0_30px_rgb(217,119,6,0.15)] hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                {/* Online Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold border border-black/5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-emerald-700">Online</span>
                </div>

                {/* Avatar */}
                <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover/card:scale-105 group-hover/card:ring-4 group-hover/card:ring-accent/30 transition-all duration-500">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>

                {/* Info */}
                <h3 className="text-2xl font-bold text-primary mb-1 text-center group-hover/card:text-accent transition-colors">{mentor.name}</h3>
                <p className="text-base text-accent font-medium mb-4 text-center">{mentor.title}</p>

                {/* Quote */}
                <div className="flex items-start gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-black/5 w-full mb-6">
                  <Quote className="w-4 h-4 text-accent/50 shrink-0 mt-0.5" />
                  <p className="text-sm text-primary/70 italic leading-relaxed line-clamp-3">{mentor.quote}</p>
                </div>

                {/* Slots Badge */}
                <div className="flex items-center gap-2 text-xs text-primary/50 font-medium mb-6">
                  <MapPin className="w-3 h-3" />
                  <span>{mentor.slots} {t.home.slotsAvailable}</span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl border-2 border-primary/10 text-primary hover:bg-primary hover:text-white h-12 text-base font-bold transition-all group/btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t.home.viewProfile}
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="link" className="text-xl text-accent hover:text-accent/80 font-bold">
              <Link href="/explore">{t.home.seeAll} &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#FAF9F6] py-20 lg:py-32 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6">
              {t.home.testimonialsTitle}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.home.testimonialsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg text-primary/80 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-primary/50 font-medium">{testimonial.flag} {testimonial.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-primary py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8">

            {/* Logo + Tagline */}
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-white font-serif">Sowan.id</h3>
              <p className="text-lg text-white/60 italic font-light max-w-md">
                "Menghormati masa lalu, Menginspirasi masa depan."
              </p>
            </div>

            {/* SDG Badges */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-black text-lg">4</div>
                <span className="text-xs text-white/40 font-medium">SDG 4</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-black text-lg">8</div>
                <span className="text-xs text-white/40 font-medium">SDG 8</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-black text-lg">10</div>
                <span className="text-xs text-white/40 font-medium">SDG 10</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-md h-px bg-white/10"></div>

            {/* Copyright */}
            <p className="text-sm text-white/30 font-medium">
              © 2026 Sowan.id — Trio Capybara Gaje
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1s;
        }
        .animate-float-delayed-2 {
          animation: float 6s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}