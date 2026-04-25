interface TimerRingProps {
  timeLeft: number;
  totalTime: number;
  danger?: boolean;
}

const RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TimerRing = ({ timeLeft, totalTime, danger }: TimerRingProps) => {
  const offset = CIRCUMFERENCE * (1 - timeLeft / totalTime);
  const color = danger ? "#ff3b5c" : timeLeft <= 2 ? "#ff3b5c" : "#d400ff";

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-mono font-bold text-sm transition-colors duration-300"
        style={{ color, fontFamily: "'Orbitron', sans-serif", fontSize: 13 }}
      >
        {Math.max(0, timeLeft)}
      </div>
    </div>
  );
};

export default TimerRing;
