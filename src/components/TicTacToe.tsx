import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useGameSession } from '../lib/GameSessionContext';
import { RefreshCw, User, Users } from 'lucide-react';
import xPic from '../assets/X-pic.png';
import oPic from '../assets/opic.png';

type CellValue = 'X' | 'O' | null;
type GameMode = 'single' | 'two-player';

const TicTacToe: React.FC = () => {
  const { state, addPoints, completeGame } = useGameSession();
  const [board, setBoard] = useState<CellValue[]>([null, null, null, null, null, null, null, null, null]);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('single');
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const formattedTime = `${Math.floor(state.timeLeft / 60).toString().padStart(2, '0')}:${(state.timeLeft % 60).toString().padStart(2, '0')}`;

  const winPatterns = useMemo(() => [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ], []);

  const checkWinner = useCallback((cells: CellValue[]): 'X' | 'O' | 'Draw' | null => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a]!;
      }
    }
    if (cells.every(cell => cell !== null)) {
      return 'Draw';
    }
    return null;
  }, [winPatterns]);

  const getAIMove = useCallback(() => {
    const emptyCells = board.map((cell, idx) => cell === null ? idx : -1).filter(idx => idx !== -1);
    if (emptyCells.length > 0) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    return -1;
  }, [board]);

  const resetBoard = () => {
    setBoard([null, null, null, null, null, null, null, null, null]);
    setCurrentPlayer('X');
    setGameOver(false);
    setWinner(null);
    // scores are kept cumulatively
  };

  useEffect(() => {
    if (gameMode === 'single' && currentPlayer === 'O' && !gameOver && board.filter(c => c === null).length > 0) {
      const timeout = setTimeout(() => {
        const aiMove = getAIMove();
        if (aiMove !== -1) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          const result = checkWinner(newBoard);
          if (result) {
            setWinner(result);
            setGameOver(true);
            if (result === 'X') {
              addPoints('tic-tac-toe', 100);
              completeGame();
            } else if (result === 'O') {
              addPoints('tic-tac-toe', 20);
              completeGame();
            } else {
              // Draw - allow replay
              addPoints('tic-tac-toe', 50);
              // no completeGame, user can play again
            }
          } else {
            setCurrentPlayer('X');
          }
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, gameMode, gameOver, board, getAIMove, checkWinner, addPoints, completeGame]);

  const handleCellClick = (index: number) => {
    if (board[index] !== null || gameOver || (gameMode === 'single' && currentPlayer === 'O')) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      setGameOver(true);
      if (gameMode === 'single') {
        if (result === 'X') {
          addPoints('tic-tac-toe', 100);
          completeGame();
        } else if (result === 'O') {
          addPoints('tic-tac-toe', 20);
          completeGame();
        } else {
          // Draw
          addPoints('tic-tac-toe', 50);
          // no completeGame, allow replay
        }
      } else {
        if (result === 'Draw') {
          addPoints('tic-tac-toe', 50);
          // no completeGame, allow replay
        } else {
          addPoints('tic-tac-toe', 100);
          completeGame();
        }
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    resetBoard();
  };

  const toggleMode = () => {
    setGameMode(prev => prev === 'single' ? 'two-player' : 'single');
    resetGame();
  };

  if (!state.sessionActive) {
    return (
      <div className="min-h-screen w-full bg-[#2d005e] flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Session Ended</h2>
        <p className="text-white/70">Redirecting to countdown...</p>
      </div>
    );
  }

  const renderCell = (index: number) => {
    const value = board[index];
    const isWinningCell = winner && winPatterns.some(pattern =>
      pattern.includes(index) && board[pattern[0]] === winner && board[pattern[1]] === winner && board[pattern[2]] === winner
    );

    return (
      <button
        key={index}
        onClick={() => handleCellClick(index)}
        disabled={!!value || gameOver}
        className={`w-24 h-24 sm:w-32 sm:h-32 border-2 transition-all duration-300 flex items-center justify-center
          ${value === 'X' ? 'border-pink-500 bg-pink-500/20' : value === 'O' ? 'border-purple-500 bg-purple-500/20' : 'border-gray-600 bg-transparent'}
          ${isWinningCell ? 'animate-pulse shadow-lg shadow-pink-500/50' : ''}
          ${!value && !gameOver ? 'hover:bg-white/10 cursor-pointer' : 'cursor-default'}
        `}
      >
        {value === 'X' && <img src={xPic} alt="X" className="w-16 h-16 object-contain" />}
        {value === 'O' && <img src={oPic} alt="O" className="w-16 h-16 object-contain" />}
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#2d005e] to-black flex flex-col items-center justify-center p-4 relative overflow-x-hidden">
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 bg-[#2a0e45]/90 backdrop-blur-md border border-[#FF00B2]/50 rounded-full shadow-[0_0_15px_rgba(255,0,178,0.3)]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF00B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase text-[#AD15B5] font-bold tracking-widest leading-none mb-1">Time Left</span>
          <span className="text-white font-mono font-bold text-lg leading-none">{formattedTime}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-white text-3xl font-bold uppercase tracking-widest drop-shadow-lg">Tic-Tac-Toe</h1>
          <div className="flex gap-3">
            <button
              onClick={toggleMode}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                gameMode === 'single'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-purple-800 text-purple-200'
              }`}
            >
              {gameMode === 'single' ? <User size={16} className="inline mr-2" /> : <Users size={16} className="inline mr-2" />}
              {gameMode === 'single' ? 'Single Player' : 'Two Player'}
            </button>
            <button
              onClick={resetGame}
              className="px-4 py-2 rounded-lg font-bold text-sm bg-purple-800 text-purple-200 hover:bg-purple-700 transition-all"
            >
              <RefreshCw size={16} className="inline mr-2" /> Reset
            </button>
          </div>
        </div>

        <div className="flex gap-8 text-white font-bold">
          <div>Player X: {scores.X}</div>
          <div>Player O: {scores.O}</div>
        </div>

        {!gameOver && (
          <p className="text-purple-300 text-xl font-bold animate-pulse">
            {currentPlayer === 'X' ? "Player X's Turn" : gameMode === 'single' ? "AI's Turn..." : "Player O's Turn"}
          </p>
        )}

        <div className="bg-purple-900/50 p-6 rounded-2xl border-2 border-purple-500">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(renderCell)}
          </div>
        </div>

        {gameOver && (
          <div className="flex flex-col items-center gap-4">
            <p className={`text-2xl font-black ${
              winner === 'X' ? 'text-pink-400' : winner === 'O' ? 'text-purple-400' : 'text-yellow-400'
            }`}>
              {winner === 'Draw' ? "IT'S A DRAW!" : `${winner} WINS!`}
            </p>
            {winner === 'Draw' && state.timeLeft > 0 && (
              <button
                onClick={resetBoard}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                Play Again
              </button>
            )}
            {winner !== 'Draw' && (
              <p className="text-white/70 text-sm">Great move! Moving to next game...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
