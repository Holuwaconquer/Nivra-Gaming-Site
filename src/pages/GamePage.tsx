import { useEffect } from 'react';
import { useGameSession } from '../lib/GameSessionContext';
import { Play } from 'lucide-react';
import { GAME_ORDER, GAME_NAMES } from '../lib/GameSessionContext';

const GamePage = () => {
  const { state, startSession } = useGameSession();

  useEffect(() => {
    if (!state.sessionActive && state.gamesQueue.length === 0) {
      startSession(GAME_ORDER);
    }
  }, [state.sessionActive, state.gamesQueue.length, startSession]);

  if (state.sessionActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black">
        <div className="bg-purple-900/50 p-8 rounded-3xl border-2 border-purple-500 w-full max-w-md">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-white text-2xl font-bold">Session in Progress</h1>
            <p className="text-purple-200 text-center">
              Current Game: {state.currentGameId ? GAME_NAMES[state.currentGameId] : 'Loading...'}
            </p>
            <div className="w-full bg-purple-800/50 h-4 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
                style={{ width: `${(state.timeLeft / 300) * 100}%` }}
              />
            </div>
            <p className="text-white font-mono text-xl">
              {Math.floor(state.timeLeft / 60)}:{(state.timeLeft % 60).toString().padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black">
      <div className="bg-purple-900/50 p-8 rounded-3xl border-2 border-purple-500 w-full max-w-md">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-white text-3xl font-bold text-center">Welcome to Nivra Gaming!</h1>
          <p className="text-purple-200 text-center">
            You will play 4 games in this session. Earn as many points as possible!
          </p>
          <div className="flex flex-col gap-3">
            {GAME_ORDER.map((gameId, index) => (
              <div key={gameId} className="flex items-center gap-3 text-white">
                <span className="font-bold text-pink-300">#{index + 1}</span>
                <span>{GAME_NAMES[gameId]}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => startSession(GAME_ORDER)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            <Play size={24} />
            Start Gaming Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
