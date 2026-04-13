import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, Timer } from 'lucide-react';
import { useGameSession, GAME_NAMES } from '../lib/GameSessionContext';
import Die1 from '../assets/Die1.png';

export const DieRoller: React.FC = () => {
  const navigate = useNavigate();
  const { state, addPoints } = useGameSession();
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [hasWon, setHasWon] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Initialize game when component mounts or session starts
  useEffect(() => {
    if (state.sessionActive) {
      const newTarget = Math.floor(Math.random() * 6) + 1;
      setTargetNumber(newTarget);
      setResult(null);
      setHasWon(false);
      setAttemptsLeft(3);
      setIsResetting(false);
    }
  }, [state.sessionActive]);

  // Reset target when attempts run out or on success
  const resetTarget = useCallback(() => {
    const newTarget = Math.floor(Math.random() * 6) + 1;
    setTargetNumber(newTarget);
    setResult(null);
    setHasWon(false);
    setAttemptsLeft(3);
    setIsResetting(false);
  }, []);

  // Format time from session context
  const formattedTime = `${Math.floor(state.timeLeft / 60).toString().padStart(2, '0')}:${(state.timeLeft % 60).toString().padStart(2, '0')}`;

  const rollDice = useCallback(async () => {
    if (isRolling || attemptsLeft <= 0 || isResetting) return;

    setIsRolling(true);
    setResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newRoll = Math.floor(Math.random() * 6) + 1;
      setResult(newRoll);

      if (newRoll === targetNumber) {
        setHasWon(true);
        addPoints('die-roller', 20);
        // Reset after a short delay on success
        setIsResetting(true);
        setTimeout(() => {
          resetTarget();
        }, 1500);
      } else {
        setAttemptsLeft(prev => prev - 1);
        // Reset after a short delay if no attempts left
        if (attemptsLeft - 1 === 0) {
          setIsResetting(true);
          setTimeout(() => {
            resetTarget();
          }, 1500);
        }
      }
    } catch (error) {
      console.error("Failed to roll", error);
    } finally {
      setIsRolling(false);
    }
  }, [isRolling, targetNumber, attemptsLeft, addPoints, resetTarget, isResetting]);

  // Check if it's this game's turn (show warning if not)
  if (state.sessionActive && state.currentGameId !== 'die-roller') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#411366]">
        <div className="text-center p-4">
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Not Your Turn!</h2>
          <p className="text-white/70 mb-2">
            You should be playing: <span className="text-pink-400 font-bold">{state.currentGameId ? GAME_NAMES[state.currentGameId] : 'Unknown'}</span>
          </p>
          <button
            onClick={() => state.currentGameId && navigate(`/${state.currentGameId}`)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            Go to Current Game
          </button>
        </div>
      </div>
    );
  }

  if (!state.sessionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#411366]">
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Session Ended</h2>
        <p className="text-white/70">Redirecting to countdown...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#411366] flex flex-col relative overflow-x-hidden">
      {/* Fixed Timer */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-[#2a0e45]/90 backdrop-blur-md border border-[#FF00B2]/50 rounded-full shadow-[0_0_15px_rgba(255,0,178,0.3)]">
        <Timer className="text-[#FF00B2]" size={16} />
        <div className="flex flex-col items-end">
          <span className="text-[8px] uppercase text-[#AD15B5] font-bold tracking-widest leading-none mb-0.5">Time Left</span>
          <span className="text-white font-mono font-bold text-sm leading-none">{formattedTime}</span>
        </div>
      </div>

      {/* Score Counter */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 bg-[#2a0e45]/90 backdrop-blur-md border border-[#FF00B2]/50 rounded-full shadow-[0_0_15px_rgba(255,0,178,0.3)]">
        <div className="flex flex-col items-start">
          <span className="text-[8px] uppercase text-[#AD15B5] font-bold tracking-widest leading-none mb-0.5">Total Score</span>
          <span className="text-white font-mono font-bold text-sm leading-none">{state.totalPoints}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          {/* Target Number Display */}
          <div className="bg-[#2a0e45]/80 backdrop-blur-xl border-2 border-[#FF00B2]/50 rounded-2xl p-6 text-center shadow-lg w-full">
            <p className="text-[#AD15B5] text-xs font-bold uppercase tracking-widest mb-2">Target Number</p>
            <div className="text-5xl md:text-7xl font-black text-white tracking-wider drop-shadow-lg">
              {targetNumber}
            </div>
            <p className="text-[#FF00B2] text-xs uppercase tracking-widest opacity-70 mt-1">Attempts Left: {attemptsLeft}/3</p>
          </div>

          {/* Die Display */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-[#2a0e45] rounded-xl flex items-center justify-center border-2 border-[#AD15B5]/20 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#AD15B5]/10 to-transparent"></div>
            <div className={`transition-all duration-500 transform ${result && !isRolling ? 'scale-110' : 'scale-100'}`}>
              {isRolling ? (
                <img src={Die1} className='animate-spin scale-75' />
              ) : result ? (
                (() => {
                  const IconComponent = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][result - 1];
                  return <IconComponent size={60} className="text-[#D932FE] drop-shadow-[0_0_15px_rgba(217,50,254,0.6)]" />;
                })()
              ) : (
                <img src={Die1} className='scale-75 opacity-50' />
              )}
            </div>
          </div>

          {/* Result Message */}
          {result && hasWon && (
            <div className="text-2xl md:text-3xl font-black mb-4 animate-bounce text-center text-green-400">
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={24} />
                YOU WON! +20 POINTS
                <Sparkles size={24} />
              </span>
            </div>
          )}

          {/* Result Info */}
          {result && !isRolling && (
            <div className="text-center mb-4">
              <p className="text-white/70 text-sm">
                You rolled {result}. {result === targetNumber ? 'Correct!' : `Target was ${targetNumber}`}
              </p>
              {attemptsLeft === 0 && !hasWon && (
                <p className="text-yellow-400 text-sm mt-2 animate-pulse">Getting new target...</p>
              )}
              {hasWon && (
                <p className="text-green-400 text-sm mt-2 animate-pulse">Getting new target...</p>
              )}
            </div>
          )}

          {/* Roll Button */}
          <button
            onClick={rollDice}
            disabled={isRolling || attemptsLeft <= 0 || isResetting}
            className={`w-full max-w-md py-3 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 transform overflow-hidden
              ${isRolling || attemptsLeft <= 0 || isResetting
                ? 'bg-[#2a0e45] text-[#AD15B5] cursor-not-allowed border border-[#AD15B5]/30 opacity-60'
                : 'bg-gradient-to-r from-[#AD15B5] to-[#FF00B2] text-white hover:shadow-[0_0_30px_rgba(255,0,178,0.5)] hover:-translate-y-1 active:translate-y-0'
              }
            `}
          >
            {isRolling ? 'ROLLING...' : isResetting ? 'GETTING NEW TARGET...' : 'ROLL THE DIE'}
          </button>

          {/* Instructions */}
          <div className="mt-4 text-center text-white/50 text-xs max-w-md">
            <p>Roll the die to match the target number. You have 3 attempts per target. Match to earn 20 points!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DieRoller;
