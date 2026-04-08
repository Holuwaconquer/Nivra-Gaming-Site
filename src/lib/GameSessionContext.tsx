import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Types ---
export type GameId = 'die-roller' | 'coinflip' | 'spin-bottle' | 'tic-tac-toe';

// Game durations in seconds
const GAME_DURATIONS: Record<GameId, number> = {
  'die-roller': 300,    // 5 minutes
  'coinflip': 300,      // 5 minutes
  'spin-bottle': 300,   // 5 minutes
  'tic-tac-toe': 90,    // 1 minute 30 seconds
};

const getGameDuration = (gameId: GameId): number => {
  return GAME_DURATIONS[gameId] || 300;
};

interface GameSessionState {
  gamesQueue: GameId[];          // Ordered queue of games to play
  currentGameIndex: number;      // Index in queue
  currentGameId: GameId | null;
  points: Record<GameId, number>; // Points per game
  totalPoints: number;
  timeLeft: number;              // Seconds remaining for current game
  sessionActive: boolean;
  gameCompleted: boolean;        // Current game finished?
}

type GameSessionAction =
  | { type: 'START_SESSION'; games: GameId[] }
  | { type: 'ADD_POINTS'; gameId: GameId; points: number }
  | { type: 'COMPLETE_GAME' }
  | { type: 'NEXT_GAME' }
  | { type: 'TICK' }
  | { type: 'END_SESSION' };

const INITIAL_STATE: GameSessionState = {
  gamesQueue: [],
  currentGameIndex: 0,
  currentGameId: null,
  points: {
    'die-roller': 0,
    'coinflip': 0,
    'spin-bottle': 0,
    'tic-tac-toe': 0,
  },
  totalPoints: 0,
  timeLeft: 300, // 5 minutes default
  sessionActive: false,
  gameCompleted: false,
};

// --- Reducer ---
function gameSessionReducer(state: GameSessionState, action: GameSessionAction): GameSessionState {
  console.log('Reducer action:', action.type, 'before:', { ...state });
  switch (action.type) {
    case 'START_SESSION': {
      const firstGame = action.games[0];
      return {
        ...INITIAL_STATE,
        gamesQueue: action.games,
        currentGameIndex: 0,
        currentGameId: firstGame || null,
        sessionActive: true,
        timeLeft: firstGame ? getGameDuration(firstGame) : 300,
      };
    }

    case 'ADD_POINTS': {
      const currentGamePoints = state.points[action.gameId] || 0;
      const newPoints = currentGamePoints + action.points;
      return {
        ...state,
        points: {
          ...state.points,
          [action.gameId]: newPoints,
        },
        totalPoints: state.totalPoints + action.points,
      };
    }

    case 'COMPLETE_GAME':
      return {
        ...state,
        gameCompleted: true,
      };

    case 'NEXT_GAME': {
      const nextIndex = state.currentGameIndex + 1;
      const hasNextGame = nextIndex < state.gamesQueue.length;
      const nextGameId = hasNextGame ? state.gamesQueue[nextIndex] : null;
      return {
        ...state,
        currentGameIndex: nextIndex,
        currentGameId: nextGameId,
        timeLeft: hasNextGame ? getGameDuration(nextGameId!) : 0,
        gameCompleted: false,
        sessionActive: hasNextGame,
      };
    }

    case 'TICK':
      if (state.timeLeft <= 1) {
        // Time's up - move to next game
        const nextIndex = state.currentGameIndex + 1;
        const hasNextGame = nextIndex < state.gamesQueue.length;
        const nextGameId = hasNextGame ? state.gamesQueue[nextIndex] : null;
        return {
          ...state,
          timeLeft: hasNextGame ? getGameDuration(nextGameId!) : 0,
          currentGameIndex: nextIndex,
          currentGameId: nextGameId,
          gameCompleted: true,
          sessionActive: hasNextGame,
        };
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case 'END_SESSION':
      return {
        ...state,
        sessionActive: false,
        currentGameId: null,
      };

    default:
      return state;
  }
}

// --- Context ---
interface GameSessionContextType {
  state: GameSessionState;
  startSession: (games: GameId[]) => void;
  addPoints: (gameId: GameId, points: number) => void;
  completeGame: () => void; // Called by game component when user finishes
  nextGame: () => void;     // Manual skip (optional)
}

const GameSessionContext = createContext<GameSessionContextType | null>(null);

// --- Provider ---
interface GameSessionProviderProps {
  children: ReactNode;
}

export function GameSessionProvider({ children }: GameSessionProviderProps) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(gameSessionReducer, INITIAL_STATE);

  // Timer tick
  useEffect(() => {
    if (!state.sessionActive || state.gameCompleted) return;

    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.sessionActive, state.gameCompleted]);

  // Redirect when session ends
  useEffect(() => {
    console.log('Session ended effect:', { sessionActive: state.sessionActive, gamesQueueLength: state.gamesQueue.length, pathname: window.location.pathname });
    if (!state.sessionActive && state.gamesQueue.length > 0) {
      // Session ended - go to countdown
      console.log('Navigating to /countdown');
      navigate('/countdown');
    }
  }, [state.sessionActive, state.gamesQueue.length, navigate]);

  // Redirect when game changes (to proper route)
  useEffect(() => {
    console.log('Game change effect:', { currentGameId: state.currentGameId, sessionActive: state.sessionActive, pathname: window.location.pathname });
    if (state.currentGameId && state.sessionActive) {
      const routePath = `/${state.currentGameId}`;
      // Only navigate if we're not already on that route
      if (window.location.pathname !== routePath) {
        console.log('Navigating to', routePath);
        navigate(routePath, { replace: true });
      } else {
        console.log('Already on correct route');
      }
    }
  }, [state.currentGameId, state.sessionActive, navigate]);

  const startSession = useCallback((games: GameId[]) => {
    dispatch({ type: 'START_SESSION', games });
    navigate(`/${games[0]}`);
  }, [dispatch, navigate]);

  const addPoints = useCallback((gameId: GameId, points: number) => {
    dispatch({ type: 'ADD_POINTS', gameId, points });
  }, [dispatch]);

  const completeGame = useCallback(() => {
    console.log('completeGame() called - dispatching COMPLETE_GAME');
    dispatch({ type: 'COMPLETE_GAME' });
    setTimeout(() => {
      console.log('Timer done - dispatching NEXT_GAME');
      dispatch({ type: 'NEXT_GAME' });
    }, 500); // 500ms delay before moving to next game
  }, [dispatch]);

  const nextGame = useCallback(() => {
    dispatch({ type: 'NEXT_GAME' });
  }, [dispatch]);

  return (
    <GameSessionContext.Provider
      value={{
        state,
        startSession,
        addPoints,
        completeGame,
        nextGame,
      }}
    >
      {children}
    </GameSessionContext.Provider>
  );
}

// --- Hook ---
export function useGameSession() {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error('useGameSession must be used within GameSessionProvider');
  }
  return context;
}

// --- Game order configuration ---
export const GAME_ORDER: GameId[] = [
  'tic-tac-toe',
  'die-roller',
  'coinflip',
  'spin-bottle',
];

export const GAME_NAMES: Record<GameId, string> = {
  'die-roller': 'Die Roller',
  'coinflip': 'Coin Flip',
  'spin-bottle': 'Spin the Bottle',
  'tic-tac-toe': 'Tic-Tac-Toe',
};

export const GAME_ROUTES: Record<GameId, string> = {
  'die-roller': '/die-roller',
  'coinflip': '/coinflip',
  'spin-bottle': '/spin-bottle',
  'tic-tac-toe': '/tic-tac-toe',
};
