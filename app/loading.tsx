export default function Loading() {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-[#FAF9F6] gap-5">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#1A365D]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#D97706] animate-spin" />
      </div>
      <p className="text-[#1A365D]/50 font-bold tracking-[0.3em] uppercase text-sm">
        Sowan.id
      </p>
    </div>
  );
}
