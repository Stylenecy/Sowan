'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ConnectionGlobe = dynamic(() => import('./three/ConnectionGlobe'), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

/** CSS-only glowing orb — shown on mobile, while loading, or for reduced-motion. */
function GlobeFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden>
      <div className="relative w-[78%] aspect-square max-w-[420px]">
        {/* glow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#E8920C_0%,_transparent_60%)] opacity-30 blur-2xl" />
        {/* core */}
        <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_35%_30%,_#2a221b,_#14110E)] border border-amber-500/20 shadow-[inset_0_0_60px_rgba(232,146,12,0.15)]" />
        {/* orbit rings */}
        <div className="absolute inset-0 rounded-full border border-amber-400/20 rotate-[20deg]" />
        <div className="absolute inset-[8%] rounded-full border border-amber-400/10 -rotate-[15deg] [transform:rotateX(70deg)]" />
        {/* nodes */}
        <span className="absolute left-[20%] top-[30%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(232,146,12,0.6)]" />
        <span className="absolute right-[24%] top-[44%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(232,146,12,0.6)]" />
        <span className="absolute left-[40%] bottom-[26%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_2px_rgba(232,146,12,0.6)]" />
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [webgl, setWebgl] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    setReduced(motion);
    // WebGL globe on desktop only — protect mobile perf with the CSS fallback.
    setWebgl(isDesktop);
  }, []);

  if (!webgl) return <GlobeFallback />;
  return <ConnectionGlobe reducedMotion={reduced} />;
}
