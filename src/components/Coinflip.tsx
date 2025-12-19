
import React, { useState, useCallback, useEffect } from 'react';
import Coin from './Coin';

// --- Types ---
export type GameState = 'IDLE' | 'FLIPPING' | 'RESULT';
export type Side = 'ANGEL' | 'DEMON';

export interface HistoryItem {
  timestamp: number;
  result: Side;
}

// --- Timer Component ---
interface TimerProps {
  initialSeconds: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeout }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute max-sm:top-3 max-sm:right-3 top-8 right-8 flex items-center max-sm:scale-[0.8] gap-4 bg-[#1e003d]/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-50">
      <div className="flex flex-col items-end">
        <span className="text-[9px] uppercase font-black text-[#ff00bf] tracking-[0.2em] leading-none mb-1">Redirecting in</span>
        <span className=" sm:text-2xl font-mono font-black text-white leading-tight">
          {formatTime(seconds)}
        </span>
      </div>
      <div className="w-10 h-10 rounded-full border-2 border-[#ff00bf]/30 flex items-center justify-center relative bg-[#ff00bf]/5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff00bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="absolute inset-0 rounded-full border-2 border-[#ff00bf] animate-ping opacity-10"></div>
      </div>
    </div>
  );
};

// --- Main Coinflip Component ---
const Coinflip: React.FC = () => {
  const [state, setState] = useState<GameState>('IDLE');
  const [result, setResult] = useState<Side | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [flipKey, setFlipKey] = useState(0);

  // 130 seconds = 02:10
  const INITIAL_TIME = 130;

  const flipCoin = useCallback(() => {
    if (isFlipping || isTimedOut) return;

    setIsFlipping(true);
    setState('FLIPPING');
    setFlipKey(Date.now()); // Unique key forces animation to restart
    
    const newResult: Side = Math.random() > 0.5 ? 'ANGEL' : 'DEMON';
    setResult(newResult);

    // End flip after animation duration (2s)
    setTimeout(() => {
      setState('RESULT');
      setIsFlipping(false);
      setHistory(prev => [{ timestamp: Date.now(), result: newResult }, ...prev]);
    }, 2000);
  }, [isFlipping, isTimedOut]);

  const handleTimeout = useCallback(() => {
    setIsTimedOut(true);
  }, []);

  const resetSession = () => {
    setIsTimedOut(false);
    setState('IDLE');
    setResult(null);
    setHistory([]);
  };

  if (isTimedOut) {
    return (
      <div className="min-h-screen w-full bg-[#2d005e] flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ff00bf] opacity-10 rounded-full blur-[120px]"></div>
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Time's Up!</h2>
        <button 
          onClick={resetSession}
          className="bg-[#ff00bf] text-white px-8 py-4 rounded-2xl font-black tracking-widest hover:scale-105 transition-transform"
        >
          RESTART SESSION
        </button>
        <a href="/">
        <button 
          className="bg-[#ff00bf] my-2 text-white px-8 py-4 rounded-2xl font-black tracking-widest hover:scale-105 transition-transform"
        >
          Go to home
        </button>
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col max-sm:pt-[70px] items-center justify-center py-12 relative min-h-screen">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ff00bf] opacity-10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#ff00bf] opacity-10 rounded-full blur-[120px]"></div>

      <Timer initialSeconds={INITIAL_TIME} onTimeout={handleTimeout} />

      <div className="w-full max-w-4xl px-4 flex flex-col items-center z-10">
        <div className="text-center mb-10 max-sm:mb-4">
          <span className="text-[#ff00bf] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block opacity-80">Status</span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight min-h-[60px] drop-shadow-xl">
            {state === 'IDLE' ? 'Ready to Flip' : state === 'FLIPPING' ? 'Flipping...' : `You got ${result === 'ANGEL' ? 'Angel' : 'Demon'}!`}
          </h1>
        </div>

        <div className="relative mb-14 max-sm:mb-5 flex flex-col items-center justify-center min-h-[300px]">
          {/* Key forces the component to remount and restart animations */}
          <Coin key={flipKey} state={state} result={result} />
          
          {state === 'RESULT' && (
            <div className={`mt-10 px-8 py-3 rounded-full font-black text-[11px] tracking-[0.25em] uppercase border shadow-2xl transition-all animate-pulse
              ${result === 'ANGEL' 
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-blue-500/10' 
                : 'bg-red-500/10 text-red-500 border-red-500/30 shadow-red-500/10'}`}>
              {result === 'ANGEL' ? 'Angel - Heavenly Grace' : 'Demon - Infernal Shadow'}
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-[#1e003d]/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className={`w-full py-6 max-sm:py-3 rounded-2xl font-black text-xl tracking-[0.15em] transition-all duration-300 shadow-[0_15px_35px_rgba(255,0,191,0.3)]
              ${isFlipping 
                ? 'bg-[#4a008c] text-white/30 cursor-not-allowed scale-95 shadow-none' 
                : 'bg-[#ff00bf] text-white hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,0,191,0.5)] active:scale-95'
              }`}
          >
            {isFlipping ? 'FLIPPING...' : 'FLIP THE COIN'}
          </button>

          <div className="mt-10">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-5 pl-1">Recent Fates</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {history.length === 0 ? (
                <div className="text-white/10 text-[10px] font-black tracking-widest py-2">NO DATA YET</div>
              ) : (
                history.map((item) => (
                  <div 
                    key={item.timestamp} 
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl shadow-lg transition-transform hover:scale-105 snap-center
                      ${item.result === 'ANGEL' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-blue-500/5' : 'bg-red-500/10 border-red-500/20 text-red-500 shadow-red-500/5'}`}
                  >
                    {item.result === 'ANGEL' ? '😇' : '😈'}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coinflip;
