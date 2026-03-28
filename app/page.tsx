"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Users, Heart, Sparkles, User2 } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Opa Yohanes",
      title: "Musisi Kerocong",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Ibu Sri",
      title: "Pengrajin Batik",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Bapak Hasan",
      title: "Pakar Pertanian",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    }
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

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-primary leading-[1.1] tracking-tight transition-all">
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

          <div className="pt-4 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
            <Button asChild size="lg" className="bg-[#D97706] hover:bg-[#D97706]/90 text-white text-xl sm:text-2xl py-8 px-12 rounded-full shadow-[0_8px_30px_rgb(217,119,6,0.3)] hover:shadow-[0_8px_30px_rgb(217,119,6,0.5)] hover:-translate-y-1 transition-all duration-300 h-auto font-semibold min-h-[60px] min-w-[200px]">
              <Link href="/explore">
                {t.home.findBtn}
              </Link>
            </Button>

            {user ? (
              <Button asChild variant="ghost" size="lg" className="text-primary hover:bg-primary/5 text-xl sm:text-2xl py-8 px-8 rounded-full transition-all h-auto font-medium min-h-[60px]">
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
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
              alt="Potret lansia tersenyum hangat"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Floating Glassmorphism Card 1: Users */}
          <div className="absolute -left-6 sm:-left-12 top-12 sm:top-24 bg-white/70 backdrop-blur-xl border border-white/50 p-5 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20 flex items-center gap-4 animate-in slide-in-from-left-8 duration-1000">
            <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-3xl font-bold text-primary font-serif">500+</p>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">{t.home.friendsJoined}</p>
            </div>
          </div>

          {/* Floating Glassmorphism Card 2: Emosional  */}
          <div className="absolute -right-4 sm:-right-8 bottom-16 sm:bottom-28 bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20 max-w-[240px] animate-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="flex items-start gap-3">
              <div className="text-3xl mt-1">👵</div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Heart className="w-4 h-4 text-destructive fill-destructive" />
                  <Heart className="w-4 h-4 text-destructive fill-destructive" />
                  <Heart className="w-4 h-4 text-destructive fill-destructive" />
                </div>
                <p className="font-semibold text-primary leading-tight">
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

