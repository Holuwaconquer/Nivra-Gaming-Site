import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  duration?: number; 
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration = 180 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : duration));
    }, 1000);
    return () => clearInterval(timer);
  }, [duration]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const boxStyle = {
    borderRadius: "12px",
    background: "linear-gradient(0deg, #9B32FF, #F432FF)",
    opacity: 1,
    border: "2px solid rgba(255, 255, 255, 0.2)",
    fontFamily: "Poppins, sans-serif",
  };

  return (
    <div
      className="flex mb-6 flex-wrap sm:flex-nowrap justify-center"
      style={{ gap: "12px" }}
    >
      <div
        className="shadow-lg backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0 w-[160px] h-[180px] p-4 sm:w-[220px] sm:h-[180px] sm:p-8"
        style={boxStyle}
      >
        <h3 className="text-3xl sm:text-6xl font-bold leading-none">
          {hours.toString().padStart(2, "0")}
        </h3>
        <p className="text-xs sm:text-base uppercase mt-2 sm:mt-3 opacity-90">
          Hours
        </p>
      </div>
      <div
        className="shadow-lg backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0 w-[160px] h-[180px] p-4 sm:w-[220px] sm:h-[180px] sm:p-8"
        style={boxStyle}
      >
        <h3 className="text-3xl sm:text-6xl font-bold leading-none">
          {minutes.toString().padStart(2, "0")}
        </h3>
        <p className="text-xs sm:text-base uppercase mt-2 sm:mt-3 opacity-90">
          Minutes
        </p>
      </div>
      <div
        className="shadow-lg backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0 w-[160px] h-[180px] p-4 sm:w-[220px] sm:h-[180px] sm:p-8"
        style={boxStyle}
      >
        <h3 className="text-3xl sm:text-6xl font-bold leading-none">
          {seconds.toString().padStart(2, "0")}
        </h3>
        <p className="text-xs sm:text-base uppercase mt-2 sm:mt-3 opacity-90">
          Seconds
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
