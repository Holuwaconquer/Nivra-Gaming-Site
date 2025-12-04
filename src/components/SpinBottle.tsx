import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Timer, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

import Bottle1 from '../assets/bottle1.png'
import Bottle2 from '../assets/bottle2.png'
import Bottle3 from '../assets/bottle3.png'

// --- Configuration ---
const REDIRECT_URL = "https://nivragamingsite.vercel.app/services"; // EDIT THIS URL
const INITIAL_TIME = 240; // Seconds

// --- Placeholder Assets ---
const BOTTLE_IMG_1 = Bottle1; // Champagne
const BOTTLE_IMG_2 = Bottle2; // Wine
const BOTTLE_IMG_3 = Bottle3; // Beer
const BOTTLE_IMG_4 = Bottle1;  // Potion
const BOTTLE_IMG_5 = Bottle2;  // Soda
const BOTTLE_IMG_6 = Bottle3; // Vodka
const BOTTLE_IMG_7 = Bottle1; // Whiskey
const BOTTLE_IMG_8 = Bottle2; // Tequila

// --- Game Data ---
const BOTTLE_OPTIONS = [
  { id: 'b1', name: 'Golden Fizz', src: BOTTLE_IMG_1 },
  { id: 'b2', name: 'Royal Red',   src: BOTTLE_IMG_2 },
  { id: 'b3', name: 'Amber Ale',   src: BOTTLE_IMG_3 },
  { id: 'b4', name: 'Love Potion', src: BOTTLE_IMG_4 },
  { id: 'b5', name: 'Neon Soda',   src: BOTTLE_IMG_5 },
  { id: 'b6', name: 'Crystal Ice', src: BOTTLE_IMG_6 },
  { id: 'b7', name: 'Aged Oak',    src: BOTTLE_IMG_7 },
  { id: 'b8', name: 'Cactus Jack', src: BOTTLE_IMG_8 },
];

const BOARD_SEGMENTS = [
  { label: "JACKPOT",   color: "#FF00B2", textColor: "white" },
  { label: "TRY AGAIN", color: "#2a0e45", textColor: "#AD15B5" },
  { label: "2X POINTS", color: "#AD15B5", textColor: "white" },
  { label: "MYSTERY",   color: "#411366", textColor: "#FF00B2" },
  { label: "BONUS",     color: "#FF00B2", textColor: "white" },
  { label: "LOSE TURN", color: "#2a0e45", textColor: "#AD15B5" },
  { label: "500 PTS",   color: "#AD15B5", textColor: "white" },
  { label: "FREE SPIN", color: "#411366", textColor: "#FF00B2" },
];

export const SpinTheBottle: React.FC = () => {
  // State
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBottleId, setSelectedBottleId] = useState(BOTTLE_OPTIONS[0].id);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [statusText, setStatusText] = useState("Tap to Spin");
  const [isDockOpen, setIsDockOpen] = useState(true);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.href = REDIRECT_URL;
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formattedTime = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  // Spin Logic
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null); // Clear previous result
    setStatusText("Spinning...");
    setIsDockOpen(false); // Auto close dock when spinning for better view

    // Random rotation: 4-8 full spins + random angle
    // IMPORTANT: To determine the result, we track the *total* rotation.
    // CSS Transform rotates clockwise. The segments are arranged clockwise starting from 0 (Top).
    // Segment 0: 0-45deg, Segment 1: 45-90deg, etc.
    
    const currentRotation = rotation % 360; // Normalize current position
    const randomAngle = Math.floor(Math.random() * 360);
    const fullSpins = 360 * (5 + Math.floor(Math.random() * 3)); // At least 5 spins
    const totalNewRotation = fullSpins + randomAngle;
    
    const finalRotation = rotation + totalNewRotation;
    setRotation(finalRotation);

    // Calculate Result
    // The bottle points to `finalRotation % 360`.
    const normalizedAngle = finalRotation % 360;
    const segmentIndex = Math.floor(normalizedAngle / (360 / BOARD_SEGMENTS.length));
    const resultLabel = BOARD_SEGMENTS[segmentIndex].label;

    // Reset state after animation (3s matches CSS duration)
    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(resultLabel);
      setStatusText(`YOU GOT ${resultLabel}!`);
    }, 3000);
  }, [isSpinning, rotation]);

  const activeBottle = BOTTLE_OPTIONS.find(b => b.id === selectedBottleId) || BOTTLE_OPTIONS[0];

  return (
    <div className="relative w-full h-[120vh] bg-[#411366] overflow-hidden flex flex-col font-sans">
      
      {/* --- Timer --- */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 bg-[#2a0e45]/90 backdrop-blur-md border border-[#FF00B2]/50 rounded-full shadow-[0_0_15px_rgba(255,0,178,0.3)] animate-pulse">
        <Timer className="text-[#FF00B2]" size={20} />
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase text-[#AD15B5] font-bold tracking-widest leading-none mb-1">Redirecting In</span>
          <span className="text-white font-mono font-bold text-lg leading-none">{formattedTime}</span>
        </div>
      </div>

      {/* --- Main Game Area --- */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full pb-20"> {/* pb-20 to make room for collapsed dock */}
        
        {/* Status Header */}
        <div className="absolute top-[8%] z-20 w-full text-center px-4 pointer-events-none">
          <h1 className={`text-3xl md:text-5xl font-black uppercase tracking-widest drop-shadow-lg transition-all duration-300 ${isSpinning ? 'text-[#FF00B2] animate-pulse scale-105' : 'text-white'}`}>
            {statusText}
          </h1>
          {spinResult && !isSpinning && (
             <div className="mt-2 text-[#FF00B2] animate-bounce font-bold tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={20} />
                <span>CONGRATULATIONS</span>
                <Sparkles size={20} />
             </div>
          )}
        </div>

        {/* --- The Board (Wheel) --- */}
        <div className="relative mt-32 w-[90vw] max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center">
          
          {/* Wheel Background (Segments) */}
          <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_50px_rgba(173,21,181,0.4)] border-8 border-[#2a0e45]">
             {/* Actual Background Gradient */}
             <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `conic-gradient(
                    ${BOARD_SEGMENTS.map((seg, i) => `${seg.color} ${i * 12.5}% ${(i + 1) * 12.5}%`).join(', ')}
                  )`
                }}
             />

             {/* Inner Wheel Decoration */}
             <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
             <div className="absolute inset-[15%] rounded-full border-2 border-white/5 border-dashed"></div>
          </div>

          {/* Wheel Labels */}
          {BOARD_SEGMENTS.map((segment, index) => {
             const angle = (index * 45) + 22.5;
             return (
               <div
                 key={`label-${index}`}
                 className="absolute w-full h-full flex justify-center pt-6 md:pt-10 pointer-events-none"
                 style={{ transform: `rotate(${angle}deg)` }}
               >
                 <span 
                    className="font-bold text-[10px] md:text-sm tracking-wider uppercase drop-shadow-md transform -translate-y-1 text-center max-w-[80px]"
                    style={{ color: segment.textColor }}
                  >
                   {segment.label}
                 </span>
               </div>
             );
          })}

          {/* Center Pin / Glow */}
          <div className="absolute w-4 h-4 bg-white rounded-full z-20 shadow-[0_0_20px_white]"></div>

          {/* --- The Bottle --- */}
          <div 
            className="absolute z-30 w-1/3 h-1/3 flex items-center justify-center cursor-pointer filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-[3000ms] cubic-bezier(0.2, 0.8, 0.2, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
            onClick={handleSpin}
          >
             <img 
               src={activeBottle.src} 
               alt={activeBottle.name}
               className="h-[140%] w-auto object-contain transform origin-center"
               style={{ pointerEvents: 'none' }} 
             />
             
             {/* Spin Effect Sparkles */}
             {/* {!isSpinning && rotation > 0 && (
                <Sparkles className="absolute -top-10 text-[#FF00B2] animate-bounce" size={40} />
             )} */}
          </div>
        </div>
      </div>

      {/* --- Collapsible Bottle Selection Dock --- */}
      <div 
        className={`absolute bottom-0 left-0 w-full bg-[#1a052e]/95 backdrop-blur-xl border-t-2 border-[#FF00B2]/30 z-40 shadow-[0_-5px_30px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out`}
        style={{ 
          transform: isDockOpen ? 'translateY(0)' : 'translateY(calc(100% - 40px))' 
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Dock Header / Toggle */}
          <button 
            onClick={() => setIsDockOpen(!isDockOpen)}
            className="w-full flex items-center justify-center gap-2 py-3 cursor-pointer hover:bg-white/5 transition-colors"
          >
            <span className="text-[#FF00B2] text-xs font-bold uppercase tracking-[0.2em]">
              {isDockOpen ? 'Hide Bottle Options' : 'Select Your Bottle'}
            </span>
            {isDockOpen ? (
              <ChevronDown size={14} className="text-[#FF00B2]" />
            ) : (
              <ChevronUp size={14} className="text-[#FF00B2]" />
            )}
          </button>
          
          {/* Scrollable Bottle List */}
          <div className="w-full flex justify-start md:justify-center gap-4 overflow-x-auto pb-6 px-4 pt-2 scrollbar-thin scrollbar-thumb-[#FF00B2] scrollbar-track-transparent">
            {BOTTLE_OPTIONS.map((bottle) => {
              const isSelected = bottle.id === selectedBottleId;

              return (
                <button
                  key={bottle.id}
                  onClick={() => {
                    if (!isSpinning) {
                      setSelectedBottleId(bottle.id);
                      setRotation(0);
                      setStatusText("Ready to Spin");
                      setSpinResult(null);
                    }
                  }}
                  disabled={isSpinning || isSelected}
                  className={`
                    group relative flex-shrink-0 w-16 h-24 md:w-20 md:h-28 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden
                    ${isSelected 
                      ? 'bg-gradient-to-t from-[#FF00B2]/30 to-transparent border-2 border-[#FF00B2] scale-105 shadow-[0_0_20px_rgba(255,0,178,0.3)]' 
                      : 'bg-[#2a0e45] border border-[#AD15B5]/20 hover:border-[#AD15B5] opacity-60 hover:opacity-100 hover:-translate-y-1'
                    }
                    ${isSpinning ? 'cursor-not-allowed opacity-30 grayscale' : 'cursor-pointer'}
                  `}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <img 
                    src={bottle.src} 
                    alt={bottle.name} 
                    className={`h-[70%] w-auto object-contain transition-transform duration-300 ${isSelected ? 'scale-110 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]' : 'grayscale-[0.5]'}`} 
                  />
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF00B2] rounded-full shadow-[0_0_5px_#FF00B2]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};