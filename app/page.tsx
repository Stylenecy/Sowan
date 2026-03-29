"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, Sparkles, User2, ShieldCheck, Award, Globe, Video, Calendar, HeartHandshake } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { user, setShowLoginModal } = useAuth();
  const { t } = useLanguage();

  const featuredMentors = [
    {
      id: 1,
      name: "Opa Adriel",
      title: "Pakar Sejarah Jawa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Ibu Ratna",
      title: "Mantan Diplomat Internasional",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Bapak Dodi",
      title: "Pebisnis Kuliner & Budayawan",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Opa Yohanes",
      title: "Musisi Kerocong",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Ibu Sri",
      title: "Pengrajin Batik",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Bapak Hasan",
      title: "Pakar Pertanian",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#FAF9F6] text-[#1A365D] overflow-hidden">
      {/* 
        Hero Section Container 
        Using extensive padding (py-24 to py-32) for a breathable, premium feel.
      */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Text Content (Left Side) */}
        <div className="flex-1 text-center lg:text-left space-y-10 z-10">

          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm mb-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold text-lg tracking-wide">
              {t.home.sparkle}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-primary leading-[1.2] lg:leading-[1.1] tracking-tight transition-all">
            <span className="opacity-90">{t.home.welcomeHome},</span><br />
            {t.home.welcome} <span className="text-accent relative inline-block mt-2 italic">
              Sowan.id
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            {t.home.desc}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start items-center">
            <Button asChild size="lg" className="bg-[#D97706] hover:bg-[#D97706]/90 text-white text-lg sm:text-2xl py-6 sm:py-8 px-8 sm:px-12 rounded-full shadow-[0_8px_30px_rgb(217,119,6,0.3)] hover:shadow-[0_8px_30px_rgb(217,119,6,0.5)] hover:-translate-y-1 transition-all duration-300 h-auto font-bold min-h-[50px] sm:min-h-[60px] w-full sm:w-auto">
              <Link href="/explore">
                {t.home.findBtn}
              </Link>
            </Button>

            {user ? (
              <Button asChild variant="ghost" size="lg" className="text-primary hover:bg-primary/5 text-lg sm:text-2xl py-4 sm:py-8 px-8 rounded-full transition-all h-auto font-medium min-h-[50px] sm:min-h-[60px]">
                <Link href={user.name === "Opa Adriel" ? "/dashboard/mentor" : "/dashboard/customer"}>
                  {t.home.scheduleBtn}
                </Link>
              </Button>
            ) : (
              <Button onClick={() => setShowLoginModal(true)} variant="ghost" size="lg" className="text-primary hover:bg-primary/5 text-xl sm:text-2xl py-8 px-8 rounded-full transition-all h-auto font-medium min-h-[60px]">
                {t.shared.login}
              </Button>
            )}
          </div>
        </div>

        {/* Hero Visuals (Right Side) */}
        <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10">

          {/* 
                Main Image Container with subtle rotation and premium shadow 
             */}
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
            {/* Fallback gradient if image doesn't load instantly */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D97706]/20 to-[#1A365D]/10 mix-blend-multiply z-10"></div>

            <Image
              src="/wanita_cover_tua.png"
              alt="Potret Maestro Sowan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Ultra-Deep Seamless Gradient Blend */}
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/60 to-transparent z-10"></div>
          </div>

          {/* Floating Glassmorphism Card 1: Users */}
          <div className="absolute -left-2 sm:-left-12 top-12 sm:top-24 bg-white/70 backdrop-blur-xl border border-white/50 p-3 sm:p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20 flex items-center gap-3 sm:gap-4 animate-in slide-in-from-left-8 duration-1000">
            <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
              <Users className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold text-primary font-serif">500+</p>
              <p className="text-[10px] sm:text-sm font-medium text-muted-foreground whitespace-nowrap">{t.home.friendsJoined}</p>
            </div>
          </div>

          {/* Floating Glassmorphism Card 2: Emosional  */}
          <div className="absolute -right-2 sm:-right-8 bottom-10 sm:bottom-28 bg-white/80 backdrop-blur-xl border border-white/50 p-4 sm:p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20 max-w-[180px] sm:max-w-[240px] animate-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-xl sm:text-3xl mt-1">👵</div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Heart className="w-3 h-3 text-destructive fill-destructive" />
                  <Heart className="w-3 h-3 text-destructive fill-destructive" />
                  <Heart className="w-3 h-3 text-destructive fill-destructive" />
                </div>
                <p className="text-xs sm:text-base font-semibold text-primary leading-tight">
                  "{t.home.bottomQuote}."
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        </div>

      </section>

      {/* Horizontal Trust Banner (HelloTalk Inspired) */}
      <div className="w-full bg-primary py-8 sm:py-12 border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">

            {/* Trust Point 1 */}
            <div className="flex items-center gap-5 justify-center md:justify-start group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                <Globe className="w-8 h-8 text-accent animate-pulse" />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">Berbagai Bahasa</p>
                <p className="text-white/60 text-sm font-medium tracking-wide">& Keahlian</p>
              </div>
            </div>

            {/* Trust Point 2 */}
            <div className="flex items-center gap-5 justify-center md:justify-start group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">Kurasi Maestro</p>
                <p className="text-white/60 text-sm font-medium tracking-wide">Ketat & Profesional</p>
              </div>
            </div>

            {/* Trust Point 3 */}
            <div className="flex items-center gap-5 justify-center md:justify-start group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">Transaksi Escrow</p>
                <p className="text-white/60 text-sm font-medium tracking-wide">100% Aman & Terjamin</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* About Section - MasterClass Split Layout */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden border-t border-black/5 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left Column (Typography Focus) */}
            <div className="flex-1 space-y-8 z-10 w-full text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.15] tracking-tight font-serif relative inline-block">
                {t.home.aboutTitle}
                <div className="absolute -bottom-4 left-0 lg:left-0 right-0 lg:right-auto w-24 h-2 bg-accent rounded-full mx-auto lg:mx-0"></div>
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
                {t.home.aboutDesc}
              </p>

              {/* Enhanced Feature List (Value Proposition) */}
              <div className="mt-12 space-y-8">

                {/* Feature 1: Video */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Video className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">Panggilan Video Eksklusif 1-on-1</h4>
                    <p className="text-muted-foreground text-lg leading-snug">Belajar dan bercerita secara privat dan intensif.</p>
                  </div>
                </div>

                {/* Feature 2: Schedule */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Calendar className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">Jadwal Sangat Fleksibel</h4>
                    <p className="text-muted-foreground text-lg leading-snug">Pilih waktu Sowan yang paling pas untuk Anda.</p>
                  </div>
                </div>

                {/* Feature 3: Social Impact */}
                <div className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <HeartHandshake className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">Dampak Sosial Nyata</h4>
                    <p className="text-muted-foreground text-lg leading-snug">Mengurangi rasa kesepian pada lansia melalui Geronteknologi.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column (Visual Overlapping) */}
            <div className="flex-1 w-full max-w-xl mx-auto lg:max-w-none relative z-10 mt-10 lg:mt-0">

              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl z-0">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
                  alt="Maestro Sowan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Ultra-Deep Seamless Gradient Blend */}
                <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/60 to-transparent z-[5]"></div>
                <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-sm text-[8px] text-white/80 px-2 py-1 rounded-md uppercase tracking-widest pointer-events-none z-10">
                  Source: Unsplash
                </div>
              </div>

              {/* Floating Card 1 (Top Left) */}
              <div className="absolute -left-4 sm:-left-12 top-10 sm:top-20 bg-white/80 backdrop-blur-xl border border-white/50 p-4 sm:p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-20 flex items-center gap-4 animate-in slide-in-from-left-8 duration-1000 delay-100 max-w-[280px]">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base font-bold text-primary leading-tight">
                  {t.home.badgeSecure}
                </p>
              </div>

              {/* Floating Card 2 (Bottom Right) */}
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

      {/* Featured Mentors Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {featuredMentors.map((mentor) => (
              <Link
                href={`/mentor/${mentor.id}`}
                key={mentor.id}
                className="flex flex-col items-center p-8 rounded-3xl bg-[#FAF9F6] border border-black/5 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-8 border-white shadow-lg group-hover:scale-105 group-hover:ring-4 group-hover:ring-accent/50 transition-all duration-500">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-[6px] text-white/80 px-1.5 py-0.5 rounded-sm uppercase tracking-widest pointer-events-none">
                    Source
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2 text-center group-hover:text-accent transition-colors">{mentor.name}</h3>
                <p className="text-[1.1rem] text-accent font-medium mb-8 text-center px-4">{mentor.title}</p>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl border-2 border-primary text-primary group-hover:bg-primary group-hover:text-white h-14 text-lg font-bold transition-all"
                >
                  <span>
                    {t.home.viewProfile} {mentor.name}
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

    </div>
  );
}

