import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-6 bg-[#FAF9F6] text-[#1A365D]">
      <p className="text-[7rem] sm:text-[10rem] font-black font-serif leading-none text-[#1A365D]/10 select-none">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-black font-serif -mt-4 sm:-mt-8 mb-4">
        Halaman tidak ditemukan
      </h1>
      <p className="text-lg text-[#4A5568] max-w-md mb-10 leading-relaxed">
        Sepertinya halaman yang kamu cari sudah pindah atau memang tidak pernah ada.
        Mari kembali menemui para Maestro.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-4 rounded-full bg-[#D97706] text-white font-bold text-lg shadow-lg shadow-[#D97706]/20 hover:bg-[#D97706]/90 hover:-translate-y-0.5 transition-all"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/explore"
          className="px-8 py-4 rounded-full border-2 border-[#1A365D]/10 text-[#1A365D] font-bold text-lg hover:border-[#1A365D]/30 transition-all"
        >
          Jelajahi Maestro
        </Link>
      </div>
    </div>
  );
}
