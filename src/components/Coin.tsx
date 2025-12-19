
import React from 'react';

export type GameState = 'IDLE' | 'FLIPPING' | 'RESULT';
export type Side = 'ANGEL' | 'DEMON';

interface CoinProps {
  state: GameState;
  result: Side | null;
}

const AngelIcon = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-300 drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]">
    {/* Body - Minimalist inverted triangle */}
    <path d="M50 80 L 35 45 L 65 45 Z" fill="currentColor" />
    {/* Head */}
    <circle cx="50" cy="35" r="7" fill="currentColor" />
    {/* Wings - Arcs */}
    <path d="M35 45 Q 15 40, 20 65" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M65 45 Q 85 40, 80 65" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
    {/* Halo */}
    <ellipse cx="50" cy="22" rx="12" ry="3" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const DemonIcon = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
    {/* Body - Red triangle as seen in screenshot */}
    <path d="M50 45 L 35 75 L 65 75 Z" fill="currentColor" />
    {/* Head - Circle with horns */}
    <circle cx="50" cy="35" r="7" fill="currentColor" />
    {/* Horns - Points */}
    <path d="M44 30 L 40 22 L 47 29 Z" fill="currentColor" />
    <path d="M56 30 L 60 22 L 53 29 Z" fill="currentColor" />
    {/* Arms - Arcs as seen in screenshot */}
    <path d="M42 55 Q 32 55, 32 68" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M58 55 Q 68 55, 68 68" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="47" cy="34" r="1.5" fill="#2d005e" />
    <circle cx="53" cy="34" r="1.5" fill="#2d005e" />
  </svg>
);

const Coin: React.FC<CoinProps> = ({ state, result }) => {
  const getAnimationClass = () => {
    if (state === 'FLIPPING') {
      return result === 'ANGEL' ? 'coin-flip-heads' : 'coin-flip-tails';
    }
    if (state === 'RESULT') {
      return result === 'ANGEL' ? 'coin-flip-heads' : 'coin-flip-tails';
    }
    return '';
  };

  return (
    <div className={`relative w-48 h-48 transition-transform duration-500 ${getAnimationClass()}`} style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      {/* Front (Heads / Angel) */}
      <div 
        className="absolute inset-0 bg-[#1e003d] border-[3px] border-blue-400 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(96,165,250,0.2)]"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <AngelIcon />
        <div className="absolute bottom-4 font-black text-blue-400/30 text-[9px] tracking-[0.3em] uppercase">Heavenly</div>
      </div>
      
      {/* Back (Tails / Demon) */}
      <div 
        className="absolute inset-0 bg-[#1e003d] border-[3px] border-red-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        <DemonIcon />
        <div className="absolute bottom-4 font-black text-red-600/30 text-[9px] tracking-[0.3em] uppercase">Infernal</div>
      </div>
    </div>
  );
};

export default Coin;