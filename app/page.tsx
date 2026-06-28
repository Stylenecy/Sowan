"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles, Star } from "lucide-react";

function AnimatedCounter({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const MAESTROS = [
  {
    name: "Opa Adriel", title: "Pakar Sejarah Jawa", age: 68,
    quote: '"Setiap batik punya doa. Itu yang tak bisa diajarkan di sekolah."',
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Ibu Ratna", title: "Mantan Diplomat", age: 72,
    quote: '"Diplomasi dimulai dari senyum. Itu modal termurah tapi paling berharga."',
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Bapak Dodi", title: "Pebisnis Kuliner", age: 65,
    quote: '"Resep rahasia? Tidak ada. Yang ada hanya cinta yang tak pernah bohong."',
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
];

export default function HomePage() {
  const { user, setShowLoginModal } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-10 px-4">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <span className="vertical-text text-[10px] tracking-[0.4em] text-muted-foreground uppercase opacity-60"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
            LINTAS GENERASI • BERBAGI KEARIFAN
          </span>
        </div>
        <div className="w-full max-w-7xl mx-auto relative z-20 text-center">
          <h1 className="text-display-sm md:text-display uppercase mx-auto max-w-[1200px] font-black leading-[0.85] tracking-tighter"
            style={{
              background: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop') center/cover no-repeat`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            VOICES<br />UNITED
          </h1>
          <div className="mt-8 md:mt-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl italic text-accent font-light mb-6">
              {t.home.headline2 || "Dari yang pernah hidup di dalamnya."}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl text-center mx-auto mb-10 opacity-80">
              {t.home.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/explore">
                <Button className="bg-accent hover:bg-accent/90 text-white px-10 py-6 text-sm tracking-widest rounded-full shadow-xl flex items-center gap-3">
                  CARI TEMAN SOWAN
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Button
                onClick={() => setShowLoginModal(true)}
                variant="outline"
                className="px-10 py-6 text-sm tracking-widest rounded-full border-border hover:bg-white/40 backdrop-blur-sm"
              >
                MASUK
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-[#1a1c1a] text-[#F5F1E8] py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-20 mb-20">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-6xl md:text-7xl text-accent font-light"><AnimatedCounter target={500} suffix="+" /></p>
              <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase font-medium">Pengguna Terdaftar</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <p className="text-6xl md:text-7xl text-accent font-light"><AnimatedCounter target={14} /></p>
              <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase font-medium">Maestro Terkurasi</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <p className="text-6xl md:text-7xl text-accent font-light"><AnimatedCounter target={5} /></p>
              <p className="text-[11px] tracking-[0.2em] text-white/50 uppercase font-medium">Bahasa Pengantar</p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 space-y-10">
              <h2 className="text-4xl md:text-5xl leading-tight font-serif font-bold">
                Lebih dari Sekadar<br />
                <span className="italic text-accent">Panggilan Video.</span>
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                SOWAN adalah platform Edutech eksklusif tempat Anda menyewa waktu para Maestro
                untuk sesi mentoring personal, belajar bahasa daerah, hingga konsultasi bisnis.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "🎥", title: "Panggilan Video Eksklusif 1-on-1", desc: "Belajar dan bercerita secara privat dan intensif." },
                  { icon: "📅", title: "Jadwal Sangat Fleksibel", desc: "Pilih waktu Sowan yang paling pas untuk Anda." },
                  { icon: "🤝", title: "Dampak Sosial Nyata", desc: "Mengurangi rasa kesepian pada lansia." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <span className="text-2xl mt-0.5">{item.icon}</span>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-7 relative h-[500px] md:h-[700px] w-full">
              <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full" />
              <Image
                alt="Learning Session"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 rounded-sm"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              />
              <div className="absolute -left-6 bottom-16 w-40 h-40 bg-accent/20 backdrop-blur-xl rounded-full flex items-center justify-center p-6 text-center border border-accent/30">
                <p className="text-[10px] text-white tracking-widest leading-loose font-medium">
                  100%<br />SECURE<br />ESCROW
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAESTROS ===== */}
      <section className="py-28 relative bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold max-w-2xl leading-none">
              Kenalan dengan<br />
              <span className="italic text-accent">Maestro Kami</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs mt-6 md:mt-0 text-right leading-relaxed">
              Para lansia berpengalaman dengan beragam cerita, keahlian, dan kearifan lokal
              yang siap menjadi Teman Sowan Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-20">
            {MAESTROS.map((m, i) => (
              <div key={i} className={`relative group ${i === 1 ? "md:mt-16" : i === 2 ? "md:-mt-8" : ""}`}>
                <div className="w-full aspect-[3/4] mb-8 overflow-hidden rounded-sm relative bg-muted">
                  <Image
                    alt={m.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    src={m.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Link href={`/mentor/${i + 1}`}>
                    <Button
                      variant="outline"
                      className="absolute bottom-6 left-6 right-6 py-5 bg-white/10 backdrop-blur-md text-white border-white/30 rounded-full text-[10px] tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white/20"
                    >
                      LIHAT PROFIL
                    </Button>
                  </Link>
                </div>
                <div>
                  <p className="text-[11px] tracking-widest text-accent font-semibold mb-3 uppercase">{m.title}</p>
                  <h3 className="text-2xl font-serif font-bold mb-3">{m.name}</h3>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">{m.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI AGENTS ===== */}
      <section className="py-24 bg-[#1a1c1a] text-[#F5F1E8] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <p className="text-[10px] tracking-[0.3em] text-accent font-semibold uppercase mb-6">
            <Sparkles size={14} className="inline mr-2" />
            NEW — AI DIGNITY GUARD
          </p>
          <h2 className="text-4xl md:text-[70px] font-serif font-bold mb-6 leading-none">
            Bertemu dengan<br />
            <span className="italic text-accent">ElderAgent</span>
          </h2>
          <p className="text-base text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Mbah Karto punya Dignity Guard — AI agent yang melindungi energi beliau.
            Sampaikan niat sowan, dan ElderAgent akan merespon dengan hangat.
          </p>
          <Link href="/agents">
            <Button className="bg-accent hover:bg-accent/90 text-white px-12 py-6 text-sm tracking-[0.2em] rounded-full shadow-xl">
              JELAJAHI AI AGENTS
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-28 text-center relative">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.3em] text-accent font-semibold uppercase mb-6">MULAI PERJALANAN</p>
          <h2 className="text-4xl md:text-[80px] font-serif font-bold mb-8 leading-none">
            Mulai Perjalanan<br />
            <span className="italic text-accent">Budaya Anda</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-14 max-w-2xl mx-auto leading-relaxed">
            Dukung pelestarian warisan budaya sambil memberikan dampak sosial bagi para Maestro kami.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-5">
            <Link href="/explore">
              <Button className="bg-accent hover:bg-accent/90 text-white px-12 py-6 text-sm tracking-[0.2em] rounded-full shadow-xl">
                DAFTAR SEKARANG
              </Button>
            </Link>
            <Button variant="outline" className="px-12 py-6 text-sm tracking-[0.2em] rounded-full border-border hover:bg-muted/50">
              HUBUNGI KAMI
            </Button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-background py-20 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-12">
          <Link href="/" className="text-4xl italic text-accent font-serif font-bold">Sowan.id</Link>
          <p className="text-sm text-muted-foreground max-w-lg text-center italic leading-relaxed opacity-70">
            &ldquo;Menghormati masa lalu, Menginspirasi masa depan.&rdquo;
          </p>
          <div className="flex gap-16">
            {[4, 8, 10].map((n) => (
              <div key={n} className="text-center group cursor-help">
                <p className="text-3xl font-serif font-bold group-hover:-translate-y-1 transition-transform text-foreground">{n}</p>
                <p className="text-[9px] tracking-[0.3em] mt-2 text-muted-foreground uppercase">SDG {n}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {["Privacy", "Terms", "Maestro Application", "Press Kit"].map((l) => (
              <a key={l} href="#" className="text-[10px] tracking-[0.2em] text-muted-foreground hover:text-accent transition-all uppercase">{l}</a>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground opacity-40 uppercase tracking-[0.3em]">
            &copy; 2024 Sowan Cultural Education
          </p>
        </div>
      </footer>
    </div>
  );
}
