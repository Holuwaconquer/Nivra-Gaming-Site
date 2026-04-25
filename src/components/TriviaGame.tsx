import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scissors,
  Zap,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
} from "lucide-react";
import TimerRing from "./TimerRing";
import PrizeLadder from "./PrizeLadder";
import {
  QUESTION_BANK,
  PRIZE_LADDER,
  pickGameQuestions,
} from "../trivia/triviaData";
import type { TriviaQuestion } from "../trivia/triviaData";

// ─── Types ─────────────────────────────────────────────────────────────────────
type GamePhase = "start" | "playing" | "feedback" | "results";
type OptionState = "idle" | "selected" | "correct" | "wrong" | "eliminated";

interface RoundResult {
  question: string;
  correct: boolean;
  timedOut: boolean;
  pts: number;
}

const TIMER_SECS = 5;
const LIFELINES_TOTAL = 3;
const OPTION_LETTERS = ["A", "B", "C", "D"];
const FEEDBACK_DELAY_MS = 1400;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Main Component ─────────────────────────────────────────────────────────────
const TriviaGame = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<GamePhase>("start");
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lifelinesLeft, setLifelinesLeft] = useState(LIFELINES_TOTAL);
  const [lifelineUsedQ, setLifelineUsedQ] = useState(false);
  const [roundResults, setRoundResults] = useState<RoundResult[]>([]);

  const [optionStates, setOptionStates] = useState<OptionState[]>([
    "idle",
    "idle",
    "idle",
    "idle",
  ]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQ = questions[currentIdx] ?? null;

  // ─── Start game ──────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const picked = pickGameQuestions(QUESTION_BANK);
    setQuestions(picked);
    setCurrentIdx(0);
    setScore(0);
    setLifelinesLeft(LIFELINES_TOTAL);
    setLifelineUsedQ(false);
    setOptionStates(["idle", "idle", "idle", "idle"]);
    setTimeLeft(TIMER_SECS);
    setLastCorrect(null);
    setRoundResults([]);
    setPhase("playing");
  }, []);

  // ─── Timer ───────────────────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(TIMER_SECS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // ─── Auto-advance after feedback ─────────────────────────────────────────────
  const scheduleAdvance = useCallback(
    (idx: number) => {
      if (advanceRef.current) clearTimeout(advanceRef.current);
      advanceRef.current = setTimeout(() => {
        const nextIdx = idx + 1;
        if (nextIdx >= questions.length) {
          setPhase("results");
        } else {
          setCurrentIdx(nextIdx);
          setLastCorrect(null);
          setOptionStates(["idle", "idle", "idle", "idle"]);
          setLifelineUsedQ(false);
          setPhase("playing");
        }
      }, FEEDBACK_DELAY_MS);
    },
    [questions.length],
  );

  // ─── Resolve a question (correct / wrong / timeout) ──────────────────────────
  const resolveQuestion = useCallback(
    (
      wasCorrect: boolean,
      timedOut: boolean,
      q: TriviaQuestion,
      idx: number,
    ) => {
      stopTimer();
      const pts = wasCorrect ? PRIZE_LADDER[idx].pts : 0;
      setScore((s) => s + pts);
      setLastCorrect(wasCorrect);
      setPhase("feedback");

      const result: RoundResult = {
        question: q.question,
        correct: wasCorrect,
        timedOut,
        pts,
      };

      setRoundResults((prev) => {
        const next = [...prev, result];
        scheduleAdvance(idx);
        return next;
      });
    }, // ← closes resolveQuestion correctly
    [stopTimer, scheduleAdvance],
  );

  // ─── Trigger timeout when timeLeft hits 0 ────────────────────────────────────
  useEffect(() => {
    if (phase === "playing" && timeLeft === 0 && currentQ) {
      const correctIdx = currentQ.options.findIndex(
        (o) => o.id === currentQ.correctOptionId,
      );
      setOptionStates((prev) => {
        const next = [...prev];
        next[correctIdx] = "correct";
        return next;
      });
      resolveQuestion(false, true, currentQ, currentIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  // ─── Start timer on new question ─────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing" && currentQ) {
      startTimer();
    }
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, phase]);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopTimer();
      if (advanceRef.current) clearTimeout(advanceRef.current);
    };
  }, [stopTimer]);

  // ─── Answer selection ────────────────────────────────────────────────────────
  const selectAnswer = (optionIdx: number) => {
    if (phase !== "playing" || !currentQ) return;
    stopTimer();

    const optionId = currentQ.options[optionIdx].id;
    const isCorrect = optionId === currentQ.correctOptionId;
    const correctIdx = currentQ.options.findIndex(
      (o) => o.id === currentQ.correctOptionId,
    );

    setOptionStates((prev) => {
      const next = [...prev];
      next[optionIdx] = isCorrect ? "correct" : "wrong";
      if (!isCorrect) next[correctIdx] = "correct";
      return next;
    });

    resolveQuestion(isCorrect, false, currentQ, currentIdx);
  };

  // ─── 50:50 lifeline ──────────────────────────────────────────────────────────
  const use5050 = () => {
    if (lifelinesLeft <= 0 || lifelineUsedQ || phase !== "playing" || !currentQ)
      return;

    const correctIdx = currentQ.options.findIndex(
      (o) => o.id === currentQ.correctOptionId,
    );
    const wrongIdxs = [0, 1, 2, 3].filter(
      (i) => i !== correctIdx && optionStates[i] !== "eliminated",
    );
    const toEliminate = shuffle(wrongIdxs).slice(0, 2);

    setOptionStates((prev) => {
      const next = [...prev];
      toEliminate.forEach((i) => {
        next[i] = "eliminated";
      });
      return next;
    });

    setLifelinesLeft((l) => l - 1);
    setLifelineUsedQ(true);
  };

  // ─── Derived ─────────────────────────────────────────────────────────────────
  const isDanger = timeLeft <= 2;
  const isAnswering = phase === "playing";
  const totalPossible = PRIZE_LADDER.reduce((sum, r) => sum + r.pts, 0);

  // ─── Option styling ───────────────────────────────────────────────────────────
  const getOptionClass = (state: OptionState): string => {
    const base =
      "flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left w-full transition-all duration-200 font-medium cursor-pointer";
    switch (state) {
      case "selected":
        return `${base} border-yellow-400/60 bg-yellow-400/10 shadow-[0_0_14px_rgba(255,215,0,0.15)]`;
      case "correct":
        return `${base} border-green-400/60 bg-green-400/10`;
      case "wrong":
        return `${base} border-red-400/50 bg-red-400/8`;
      case "eliminated":
        return `${base} border-purple-900/20 bg-[#130020] opacity-15 pointer-events-none`;
      default:
        return `${base} border-purple-900/30 bg-[#1a0030] hover:border-fuchsia-500/50 hover:bg-fuchsia-600/8 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,0,255,0.12)]`;
    }
  };

  const getLetterClass = (state: OptionState): string => {
    const base =
      "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border transition-all duration-200";
    switch (state) {
      case "selected":
        return `${base} bg-yellow-400/20 border-yellow-400/60 text-yellow-300`;
      case "correct":
        return `${base} bg-green-400/20 border-green-400/60 text-green-300`;
      case "wrong":
        return `${base} bg-red-400/15 border-red-400/50 text-red-400`;
      case "eliminated":
        return `${base} bg-purple-900/20 border-purple-900/30 text-purple-700`;
      default:
        return `${base} bg-purple-900/30 border-purple-700/30 text-purple-400`;
    }
  };

  const getTextClass = (state: OptionState): string => {
    switch (state) {
      case "selected":
        return "text-yellow-300 text-sm";
      case "correct":
        return "text-green-300 text-sm";
      case "wrong":
        return "text-red-400 text-sm";
      case "eliminated":
        return "text-purple-700 text-sm";
      default:
        return "text-purple-100 text-sm";
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0012] text-white flex flex-col items-center relative overflow-x-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[35%] bg-fuchsia-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[30%] bg-cyan-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 pb-16 flex flex-col items-center">
        {/* ── Topbar ── */}
        <div className="w-full flex items-center justify-between py-5">
          <button
            onClick={() => navigate(-1)}
            className="text-purple-400 hover:text-white transition-colors text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
          >
            ← Back
          </button>
          <div
            className="text-[10px] font-bold tracking-[0.25em] text-fuchsia-400 uppercase"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            Nivra Trivia
          </div>
          <div className="flex items-center gap-1.5 bg-fuchsia-600/15 border border-fuchsia-600/25 rounded-full px-3 py-1.5 text-xs font-bold text-fuchsia-300">
            <Zap size={11} />
            {score.toLocaleString()} pts
          </div>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* START SCREEN                                        */}
        {/* ══════════════════════════════════════════════════ */}
        {phase === "start" && (
          <div className="flex flex-col items-center text-center w-full mt-6 animate-fade-in">
            <div className="text-5xl mb-4">🎯</div>
            <h1
              className="text-3xl font-black text-white mb-1 tracking-tight"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              Who Wants To Be A
            </h1>
            <h1
              className="text-3xl font-black mb-1 tracking-tight"
              style={{ fontFamily: "'Orbitron', monospace", color: "#ffd700" }}
            >
              Millionaire?
            </h1>
            <p className="text-fuchsia-400 text-xs tracking-[0.2em] uppercase font-semibold mb-10">
              Nivra Edition · 5 Questions
            </p>

            <div className="bg-[#130020] border border-purple-900/40 rounded-xl p-5 text-left w-full max-w-md mb-8 space-y-3">
              {[
                [
                  "❓",
                  "5 questions, escalating difficulty. Each correct answer earns points.",
                ],
                [
                  "⏱",
                  "5 seconds per question. The game auto-advances when time runs out.",
                ],
                [
                  "✂",
                  "50:50 lifeline eliminates 2 wrong answers. 3 uses per game.",
                ],
                [
                  "🏁",
                  "All 5 questions are played — your final score is tallied at the end.",
                ],
              ].map(([icon, text]) => (
                <div
                  key={text}
                  className="flex items-start gap-3 text-sm text-purple-200 leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-0.5">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={startGame}
              className="w-full max-w-md bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-4 rounded-xl text-sm tracking-widest uppercase transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,0,255,0.4)]"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              Play Now
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/* PLAYING + FEEDBACK PHASES                          */}
        {/* ══════════════════════════════════════════════════ */}
        {(phase === "playing" || phase === "feedback") && currentQ && (
          <>
            <PrizeLadder currentQuestion={currentIdx} />

            {/* Lifeline strip */}
            <div className="flex items-center gap-3 mb-4 self-start">
              <span className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">
                Lifelines:
              </span>
              <button
                onClick={use5050}
                disabled={lifelinesLeft <= 0 || lifelineUsedQ || !isAnswering}
                className={`flex items-center gap-2 border rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all
                ${
                  lifelinesLeft > 0 && !lifelineUsedQ && isAnswering
                    ? "border-cyan-500/40 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 hover:-translate-y-0.5"
                    : "border-purple-900/20 text-purple-700 cursor-default opacity-40"
                }`}
              >
                <Scissors size={12} />
                50:50
                <span className="text-[10px] opacity-70">
                  (×{lifelinesLeft})
                </span>
              </button>
            </div>

            {/* Question card */}
            <div
              className={`w-full bg-[#130020] border rounded-2xl p-6 mb-4 relative overflow-hidden transition-all duration-300
              ${
                phase === "feedback"
                  ? lastCorrect
                    ? "border-green-500/50"
                    : "border-red-500/40"
                  : isDanger
                    ? "border-red-500/40"
                    : "border-purple-900/40"
              }`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #d400ff, #00e5ff, transparent)",
                }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-bold tracking-[0.2em] uppercase text-fuchsia-400 bg-fuchsia-600/15 border border-fuchsia-600/25 px-2.5 py-1 rounded-full"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <span className="text-[9px] text-purple-500 uppercase tracking-wider font-semibold">
                    {currentQ.difficulty}
                  </span>
                </div>
                <TimerRing
                  timeLeft={timeLeft}
                  totalTime={TIMER_SECS}
                  danger={phase === "feedback"}
                />
              </div>

              <p className="text-white text-lg font-semibold leading-relaxed tracking-wide">
                {currentQ.question}
              </p>

              {/* Inline feedback inside card */}
              {phase === "feedback" && (
                <div
                  className={`mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider animate-fade-in
                  ${lastCorrect ? "text-green-400" : "text-red-400"}`}
                >
                  {lastCorrect ? (
                    <>
                      <CheckCircle size={14} />
                      Correct! +{PRIZE_LADDER[currentIdx].pts} pts — next up in
                      a moment…
                    </>
                  ) : roundResults[roundResults.length - 1]?.timedOut ? (
                    <>
                      <Clock size={14} />
                      Time's up! — next up in a moment…
                    </>
                  ) : (
                    <>
                      <XCircle size={14} />
                      Wrong answer — next up in a moment…
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {currentQ.options.map((opt, i) => (
                <button
                  key={opt.id}
                  className={getOptionClass(optionStates[i])}
                  onClick={() =>
                    isAnswering &&
                    optionStates[i] !== "eliminated" &&
                    selectAnswer(i)
                  }
                  disabled={!isAnswering || optionStates[i] === "eliminated"}
                >
                  <div
                    className={getLetterClass(optionStates[i])}
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    {OPTION_LETTERS[i]}
                  </div>
                  <span className={getTextClass(optionStates[i])}>
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════ */}
        {/* RESULTS SCREEN                                      */}
        {/* ══════════════════════════════════════════════════ */}
        {phase === "results" && (
          <div className="flex flex-col items-center text-center w-full mt-6 animate-fade-in">
            <div className="text-5xl mb-4">
              {score === totalPossible ? "🏆" : score === 0 ? "💀" : "🎯"}
            </div>
            <h2
              className="text-3xl font-black mb-1"
              style={{
                fontFamily: "'Orbitron', monospace",
                color:
                  score === totalPossible
                    ? "#ffd700"
                    : score === 0
                      ? "#ff4444"
                      : "#ffffff",
              }}
            >
              {score === totalPossible
                ? "MILLIONAIRE!"
                : score === 0
                  ? "NO POINTS"
                  : "GAME DONE"}
            </h2>
            <p className="text-purple-400 text-xs tracking-[0.2em] uppercase font-semibold mb-6">
              {roundResults.filter((r) => r.correct).length} correct ·{" "}
              {roundResults.filter((r) => !r.correct).length} wrong
            </p>

            {/* Per-question breakdown */}
            <div className="w-full max-w-md bg-[#130020] border border-purple-900/40 rounded-2xl p-4 mb-6 space-y-2">
              {roundResults.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border text-xs
                  ${
                    r.correct
                      ? "border-green-500/25 bg-green-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {r.correct ? (
                      <CheckCircle
                        size={13}
                        className="text-green-400 flex-shrink-0"
                      />
                    ) : r.timedOut ? (
                      <Clock
                        size={13}
                        className="text-yellow-400 flex-shrink-0"
                      />
                    ) : (
                      <XCircle
                        size={13}
                        className="text-red-400 flex-shrink-0"
                      />
                    )}
                    <span className="text-purple-300 truncate text-left">
                      {r.question}
                    </span>
                  </div>
                  <span
                    className={`font-bold flex-shrink-0 ${
                      r.correct ? "text-green-400" : "text-purple-700"
                    }`}
                  >
                    {r.correct ? `+${r.pts}` : "0"}
                  </span>
                </div>
              ))}
            </div>

            {/* Total score */}
            <div className="bg-fuchsia-600/10 border border-fuchsia-600/25 rounded-xl px-8 py-4 mb-8 flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-fuchsia-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                <Trophy size={12} /> Final Score
              </div>
              <div
                className="text-4xl font-black"
                style={{
                  fontFamily: "'Orbitron', monospace",
                  color: "#ffd700",
                }}
              >
                {score.toLocaleString()}
              </div>
              <div className="text-purple-600 text-[10px] uppercase tracking-wider font-semibold">
                out of {totalPossible.toLocaleString()} possible pts
              </div>
            </div>

            <div className="flex gap-3 w-full max-w-sm">
              <button
                onClick={startGame}
                className="flex-1 flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(212,0,255,0.35)]"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                <RotateCcw size={13} /> Play Again
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 border border-purple-900/40 text-purple-300 hover:text-white hover:border-purple-600/40 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaGame;
