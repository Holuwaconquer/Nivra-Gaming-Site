import React, { useState, useEffect, useCallback } from "react";
import { Timer, Trophy, Trash2, Swords, Zap } from "lucide-react";
import RockImg from "../assets/rock.webp";
import PaperImg from "../assets/paper.webp";
import ScissorImg from "../assets/scissors.webp";

const REDIRECT_URL = "https://nivragamingsite.vercel.app/services";
const INITIAL_TIME = 240;

type Choice = "rock" | "paper" | "scissors" | null;
type GamePhase = "idle" | "countdown" | "reveal" | "result";
type GameResult = "win" | "lose" | "draw" | null;

interface ScoreBoard {
  wins: number;
  losses: number;
  draws: number;
}

const CHOICES = [
  {
    id: "rock" as Choice,
    label: "Rock",
    img: RockImg,
    beats: "scissors" as Choice,
  },
  {
    id: "paper" as Choice,
    label: "Paper",
    img: PaperImg,
    beats: "rock" as Choice,
  },
  {
    id: "scissors" as Choice,
    label: "Scissors",
    img: ScissorImg,
    beats: "paper" as Choice,
  },
];

const getResult = (player: Choice, opponent: Choice): GameResult => {
  if (!player || !opponent) return null;
  if (player === opponent) return "draw";
  return CHOICES.find((c) => c.id === player)?.beats === opponent
    ? "win"
    : "lose";
};

const RESULT_CONFIG = {
  win: {
    headline: "YOU WIN!",
    sub: "Flawless victory",
    colorClass: "text-emerald-400",
    shadowColor: "rgba(52,211,153,0.7)",
  },
  lose: {
    headline: "YOU LOSE",
    sub: "Better luck next time",
    colorClass: "text-rose-400",
    shadowColor: "rgba(251,113,133,0.7)",
  },
  draw: {
    headline: "DRAW!",
    sub: "Great minds...",
    colorClass: "text-yellow-400",
    shadowColor: "rgba(250,204,21,0.7)",
  },
};

function loadScores(): ScoreBoard {
  try {
    const raw = localStorage.getItem("rps_scores");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { wins: 0, losses: 0, draws: 0 };
}
function saveScores(s: ScoreBoard) {
  localStorage.setItem("rps_scores", JSON.stringify(s));
}

export const RockPaperScissors: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [opponentChoice, setOpponentChoice] = useState<Choice>(null);
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState<GameResult>(null);
  const [scores, setScores] = useState<ScoreBoard>(loadScores);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  /* Redirect timer */
  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.href = REDIRECT_URL;
      return;
    }
    const id = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  /* Pick */
  const handlePick = useCallback(
    (choice: Choice) => {
      if (phase !== "idle") return;
      setPlayerChoice(choice);
      setOpponentChoice(null);
      setResult(null);
      setCountdown(3);
      setPhase("countdown");
    },
    [phase],
  );

  /* Countdown → reveal */
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown === 0) {
      const opp = CHOICES[Math.floor(Math.random() * 3)].id;
      setOpponentChoice(opp);
      setPhase("reveal");
      return;
    }
    const id = setTimeout(() => setCountdown((p) => p - 1), 700);
    return () => clearTimeout(id);
  }, [phase, countdown]);

  /* Reveal → result */
  useEffect(() => {
    if (phase !== "reveal" || !opponentChoice || !playerChoice) return;
    const id = setTimeout(() => {
      const r = getResult(playerChoice, opponentChoice);
      setResult(r);
      setPhase("result");
      setScores((prev) => {
        const next = {
          wins: prev.wins + (r === "win" ? 1 : 0),
          losses: prev.losses + (r === "lose" ? 1 : 0),
          draws: prev.draws + (r === "draw" ? 1 : 0),
        };
        saveScores(next);
        return next;
      });
    }, 900);
    return () => clearTimeout(id);
  }, [phase, opponentChoice, playerChoice]);

  const reset = () => {
    setPhase("idle");
    setPlayerChoice(null);
    setOpponentChoice(null);
    setResult(null);
    setCountdown(3);
  };

  const clearScores = () => {
    const fresh = { wins: 0, losses: 0, draws: 0 };
    setScores(fresh);
    saveScores(fresh);
  };

  const isRevealed = phase === "reveal" || phase === "result";
  const isBouncing = phase === "idle" || phase === "countdown";
  const resultInfo = result ? RESULT_CONFIG[result] : null;
  const playerImg = playerChoice
    ? CHOICES.find((c) => c.id === playerChoice)!.img
    : RockImg;
  const opponentImg = opponentChoice
    ? CHOICES.find((c) => c.id === opponentChoice)!.img
    : RockImg;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        @keyframes bounceHand {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-14px); }
        }
        @keyframes bounceHandFlip {
          0%   { transform: scaleX(-1) translateY(0px); }
          100% { transform: scaleX(-1) translateY(-14px); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.25); opacity: 0; }
          65%  { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes countPop {
          0%   { transform: scale(0.4); opacity: 0; }
          65%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }

        .hand-bounce      { animation: bounceHand     0.42s ease-in-out infinite alternate; }
        .hand-bounce-flip { animation: bounceHandFlip 0.42s ease-in-out infinite alternate; }
        .hand-pop         { animation: popIn  0.42s cubic-bezier(0.34,1.56,0.64,1) both; }
        .slide-up         { animation: slideUp  0.35s ease both; }
        .count-pop        { animation: countPop 0.22s ease both; }
        .bebas            { font-family: 'Bebas Neue', sans-serif; }
      `}</style>

      {/* Page */}
      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "rgba(33,7,54,1)" }}
      >
        {/* Timer Badge */}
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a0638]/90 backdrop-blur-sm border border-fuchsia-700/40 animate-pulse">
          <Timer size={15} className="text-fuchsia-500" />
          <div className="flex flex-col items-end leading-none">
            <span className="text-[8px] uppercase tracking-widest font-bold text-purple-500 mb-0.5">
              Redirecting In
            </span>
            <span className="font-mono font-bold text-white text-base">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl bg-[#1c0740]/70 backdrop-blur-xl border border-purple-800/30 shadow-2xl p-7">
          {/* Header */}
          <h1
            className="bebas text-[38px] tracking-[5px] text-center mb-1"
            style={{
              background: "linear-gradient(135deg,#d946ef,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Rock Paper Scissors
          </h1>
          <p className="text-center text-[9px] tracking-[3px] uppercase font-bold text-purple-700 mb-7">
            Choose your weapon
          </p>

          {/* Arena */}
          <div className="flex items-end justify-between gap-3 mb-5 min-h-[116px]">
            {/* Player */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-[8px] tracking-[2.5px] uppercase font-bold text-purple-700">
                You
              </span>
              <div
                className="w-24 h-24 rounded-2xl border border-purple-900/40 flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244,50,255,0.18) 0%, rgba(155,50,255,0.06) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 80%, rgba(244,50,255,0.35) 0%, rgba(155,50,255,0.08) 60%, transparent 100%)",
                  }}
                />
                <img
                  src={playerImg}
                  alt="player choice"
                  className={`w-23 h-23 object-contain relative z-10 select-none ${isBouncing ? "hand-bounce" : "hand-pop"}`}
                  style={
                    isRevealed
                      ? {
                          filter: "drop-shadow(0 0 18px rgba(52,211,153,0.65))",
                        }
                      : undefined
                  }
                />
              </div>
            </div>

            {/* VS */}
            <span className="bebas text-2xl text-purple-900/70 tracking-widest flex-shrink-0 mb-9">
              VS
            </span>

            {/* CPU */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-[8px] tracking-[2.5px] uppercase font-bold text-purple-700">
                CPU
              </span>
              <div
                className="w-24 h-24 rounded-2xl border border-purple-900/40 flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244,50,255,0.18) 0%, rgba(155,50,255,0.06) 100%)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 80%, rgba(244,50,255,0.35) 0%, rgba(155,50,255,0.08) 60%, transparent 100%)",
                  }}
                />
                <img
                  src={opponentImg}
                  alt="opponent choice"
                  className={`w-23 h-23 object-contain relative z-10 select-none ${isBouncing ? "hand-bounce-flip" : "hand-pop"}`}
                  style={{
                    transform: isBouncing ? undefined : "scaleX(-1)",
                    ...(isRevealed
                      ? {
                          filter:
                            "drop-shadow(0 0 18px rgba(251,113,133,0.65))",
                        }
                      : {}),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Countdown */}
          {phase === "countdown" && (
            <div
              key={countdown}
              className="count-pop bebas text-7xl text-center text-fuchsia-400 tracking-widest leading-none mb-5"
              style={{ textShadow: "0 0 30px rgba(217,50,254,0.85)" }}
            >
              {countdown === 0 ? "SHOOT!" : countdown}
            </div>
          )}

          {/* Result Banner */}
          {phase === "result" && resultInfo && (
            <div className="slide-up text-center mb-5">
              <div
                className={`bebas text-5xl tracking-[5px] leading-none ${resultInfo.colorClass}`}
                style={{ textShadow: `0 0 28px ${resultInfo.shadowColor}` }}
              >
                {resultInfo.headline}
              </div>
              <p className="text-[9px] tracking-[3px] uppercase font-bold text-purple-600 mt-1">
                {resultInfo.sub}
              </p>
            </div>
          )}

          {/* Idle prompt */}
          {phase === "idle" && (
            <div className="flex items-center justify-center gap-2 text-purple-700 mb-5">
              <Swords size={12} />
              <span className="text-[9px] tracking-[2px] uppercase font-bold">
                Select your move
              </span>
            </div>
          )}

          {/* Choice buttons */}
          <div className="flex gap-2 mb-4">
            {CHOICES.map((c) => (
              <button
                key={c.id}
                onClick={() => handlePick(c.id)}
                disabled={phase !== "idle"}
                className={[
                  "flex-1 flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl border text-[8px] tracking-[2px] uppercase font-bold transition-all duration-200",
                  "disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
                  playerChoice === c.id && phase !== "idle"
                    ? "border-pink-500 bg-pink-500/15 text-white"
                    : "border-purple-900/50 bg-[#0b011c]/60 text-purple-600 hover:border-fuchsia-500 hover:bg-fuchsia-500/10 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-fuchsia-950/50",
                ].join(" ")}
              >
                <img
                  src={c.img}
                  alt={c.label}
                  className="w-23 h-23 object-contain"
                />
                {c.label}
              </button>
            ))}
          </div>

          {/* Play Again */}
          {phase === "result" && (
            <button
              onClick={reset}
              className="slide-up w-full py-3 mb-4 rounded-xl text-white font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-fuchsia-950/50"
              style={{ background: "linear-gradient(135deg,#a21caf,#db2777)" }}
            >
              <Zap size={12} />
              Play Again
            </button>
          )}

          {/* Scoreboard */}
          <div className="rounded-xl bg-[#0b011c]/60 border border-purple-900/35 p-3.5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-[8px] tracking-[2.5px] uppercase font-bold text-purple-700">
                <Trophy size={10} />
                Scoreboard
              </div>
              <button
                onClick={clearScores}
                className="flex items-center gap-1 text-[8px] tracking-[1.5px] uppercase text-purple-700 hover:text-rose-400 transition-colors duration-200 bg-transparent border-none cursor-pointer font-bold"
              >
                <Trash2 size={10} />
                Clear
              </button>
            </div>
            <div className="flex gap-2">
              {[
                { label: "Wins", val: scores.wins, cls: "text-emerald-400" },
                { label: "Losses", val: scores.losses, cls: "text-rose-400" },
                { label: "Draws", val: scores.draws, cls: "text-yellow-400" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex-1 rounded-lg bg-[#06000f]/70 py-2.5 text-center"
                >
                  <div
                    className={`bebas text-3xl leading-none tracking-wide ${s.cls}`}
                  >
                    {s.val}
                  </div>
                  <div className="text-[7px] tracking-[2px] uppercase text-purple-800 mt-1 font-bold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RockPaperScissors;
