import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, Timer } from 'lucide-react';
import { useGameSession, GAME_NAMES } from '../lib/GameSessionContext';
import Die1 from '../assets/Die1.png';

export const DieRoller: React.FC = () => {
  const navigate = useNavigate();
  const { state, addPoints, completeGame } = useGameSession();
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  // Initialize game when component mounts or session starts
  useEffect(() => {
    if (state.sessionActive) {
      const newTarget = Math.floor(Math.random() * 6) + 1;
      setTargetNumber(newTarget);
      setAttemptsLeft(5);
      setResult(null);
      setGameOver(false);
      setHasWon(false);
    }
  }, [state.sessionActive]);

  // Format time from session context
  const formattedTime = `${Math.floor(state.timeLeft / 60).toString().padStart(2, '0')}:${(state.timeLeft % 60).toString().padStart(2, '0')}`;

  const rollDice = useCallback(async () => {
    if (isRolling || attemptsLeft <= 0 || gameOver) return;

    setIsRolling(true);
    setResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newRoll = Math.floor(Math.random() * 6) + 1;
      setResult(newRoll);
      setAttemptsLeft(prev => prev - 1);

      if (newRoll === targetNumber) {
        setHasWon(true);
        setGameOver(true);
        addPoints('die-roller', 20);
        completeGame();
      } else if (attemptsLeft - 1 === 0) {
        setGameOver(true);
        completeGame();
      }
    } catch (error) {
      console.error("Failed to roll", error);
    } finally {
      setIsRolling(false);
    }
  }, [isRolling, attemptsLeft, gameOver, targetNumber, addPoints, completeGame]);

  // DEBUG: Log state on render
  console.log('DieRoller render:', {
    sessionActive: state.sessionActive,
    currentGameId: state.currentGameId,
    gameCompleted: state.gameCompleted,
    timeLeft: state.timeLeft
  });

  // Check if it's this game's turn (show warning if not)
  if (state.sessionActive && state.currentGameId !== 'die-roller') {
    console.log('DieRoller: Not my turn! Should be:', state.currentGameId);
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          {/* Target Number Display */}
          <div className="bg-[#2a0e45]/80 backdrop-blur-xl border-2 border-[#FF00B2]/50 rounded-2xl p-6 text-center shadow-lg w-full">
            <p className="text-[#AD15B5] text-xs font-bold uppercase tracking-widest mb-2">Target Number</p>
            <div className="text-5xl md:text-7xl font-black text-white tracking-wider drop-shadow-lg">
              {targetNumber}
            </div>
            <p className="text-[#FF00B2] text-xs uppercase tracking-widest opacity-70 mt-1">Roll to match!</p>
          </div>

          {/* Attempts Left */}
          <div className="text-center">
            <p className="text-white text-xs uppercase tracking-widest mb-2">Attempts Remaining</p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-base md:text-lg transition-all ${
                    num <= attemptsLeft
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-purple-900/30 text-gray-500'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
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
          {gameOver && (
            <div className={`text-2xl md:text-3xl font-black mb-4 animate-bounce text-center ${hasWon ? 'text-green-400' : 'text-red-400'}`}>
              {hasWon ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={24} />
                  YOU WON! +20 POINTS
                  <Sparkles size={24} />
                </span>
              ) : (
                <span>GAME OVER - No more attempts!</span>
              )}
            </div>
          )}

          {/* Result Info */}
          {result && !isRolling && (
            <p className="text-white/70 text-sm text-center mb-4">
              You rolled {result}. {result === targetNumber ? 'Correct!' : `Target was ${targetNumber}`}
            </p>
          )}

          {/* Roll Button */}
          <button
            onClick={rollDice}
            disabled={isRolling || attemptsLeft <= 0 || gameOver}
            className={`w-full max-w-md py-3 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 transform overflow-hidden
              ${(isRolling || attemptsLeft <= 0 || gameOver)
                ? 'bg-[#2a0e45] text-[#AD15B5] cursor-not-allowed border border-[#AD15B5]/30 opacity-60'
                : 'bg-gradient-to-r from-[#AD15B5] to-[#FF00B2] text-white hover:shadow-[0_0_30px_rgba(255,0,178,0.5)] hover:-translate-y-1 active:translate-y-0'
              }
            `}
          >
            {(isRolling || attemptsLeft <= 0 || gameOver) ? (
              <span className="flex items-center justify-center gap-2">
                {gameOver ? (hasWon ? 'WON!' : 'GAME OVER') : 'NO ATTEMPTS LEFT'}
              </span>
            ) : (
              'ROLL THE DIE'
            )}
          </button>

          {/* Instructions */}
          <div className="mt-4 text-center text-white/50 text-xs max-w-md">
            <p>Roll the die to match the target number. You have 5 attempts. Match the target to earn 20 points!</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DieRoller;
