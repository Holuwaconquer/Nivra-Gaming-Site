import { PRIZE_LADDER } from "../trivia/triviaData";

interface PrizeLadderProps {
  currentQuestion: number; // 0-indexed
}

const PrizeLadder = ({ currentQuestion }: PrizeLadderProps) => {
  return (
    <div className="flex justify-center gap-1.5 flex-wrap mb-5">
      {PRIZE_LADDER.map((step, i) => {
        const isDone = i < currentQuestion;
        const isActive = i === currentQuestion;

        return (
          <div
            key={step.q}
            className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg border min-w-[58px] transition-all duration-300
              ${
                isDone
                  ? "border-green-500/30 bg-green-500/5 opacity-60"
                  : isActive
                    ? "border-yellow-400/60 bg-yellow-400/8 shadow-[0_0_14px_rgba(255,215,0,0.12)]"
                    : "border-purple-900/30 bg-[#130020] opacity-40"
              }`}
          >
            <span
              className="text-[8px] font-bold tracking-widest uppercase"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: isDone ? "#00ff88" : isActive ? "#ffd700" : "#6030aa",
              }}
            >
              Q{step.q}
            </span>
            <span
              className="text-[10px] font-bold whitespace-nowrap"
              style={{
                color: isDone ? "#00ff88" : isActive ? "#ffd700" : "#6030aa",
              }}
            >
              {step.prize}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PrizeLadder;
