"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-6 bg-[#FAF9F6] text-[#1A365D]">
      <div className="w-20 h-20 rounded-full bg-[#C53030]/10 flex items-center justify-center mb-6 text-4xl">
        ⚠️
      </div>
      <h1 className="text-3xl sm:text-4xl font-black font-serif mb-4">
        Ada yang tidak beres
      </h1>
      <p className="text-lg text-[#4A5568] max-w-md mb-10 leading-relaxed">
        Maaf, terjadi kesalahan tak terduga. Coba muat ulang halaman ini —
        kalau masih bermasalah, kembali ke beranda dulu.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-8 py-4 rounded-full bg-[#D97706] text-white font-bold text-lg shadow-lg shadow-[#D97706]/20 hover:bg-[#D97706]/90 hover:-translate-y-0.5 transition-all"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="px-8 py-4 rounded-full border-2 border-[#1A365D]/10 text-[#1A365D] font-bold text-lg hover:border-[#1A365D]/30 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
