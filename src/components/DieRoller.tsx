import React, { useState, useCallback } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles } from 'lucide-react';
import Die1 from '../assets/Die1.png'

export const DieRoller: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [statusText, setStatusText] = useState("Ready to roll");

  const rollDice = useCallback(async () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null); 
    setStatusText("Rolling...");

    // Simulate API call with 5 second delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      // Generate random number 1-6
      const newRoll = Math.floor(Math.random() * 6) + 1;
      
      setResult(newRoll);
      setStatusText(`User Rolled ${newRoll}!`);
    } catch (error) {
      console.error("Failed to roll", error);
      setStatusText("Error occurred");
    } finally {
      setIsRolling(false);
    }
  }, [isRolling]);

  const renderDieIcon = (value: number | null) => {
    const iconProps = { 
      size: 80, 
      className: "text-[#D932FE] drop-shadow-[0_0_15px_rgba(217,50,254,0.6)]" 
    };

    if (isRolling) {
      return (
        <div className="animate-spin-slow">
           {/* <Loader2 size={80} className="text-[#FF00B2] animate-spin" /> */}
           <img src={Die1} className='animate-spin scale-75 ' />
        </div>
      );
    }

    if (value === null) {
      return <img src={Die1} className=' scale-75 ' />
;
    }

    switch (value) {
      case 1: return <Dice1 {...iconProps} />;
      case 2: return <Dice2 {...iconProps} />;
      case 3: return <Dice3 {...iconProps} />;
      case 4: return <Dice4 {...iconProps} />;
      case 5: return <Dice5 {...iconProps} />;
      case 6: return <Dice6 {...iconProps} />;
      default: return <Dice1 {...iconProps} />;
    }
  };

  return (
    <div className="relative group max-w-2xl mx-auto my-5 ">
      {/* Glow effect behind the card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#AD15B5] to-[#FF00B2] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Main Card */}
      <div className="relative bg-[#411366] p-8 rounded-xl border border-[#AD15B5]/30 shadow-2xl flex flex-col items-center gap-8">
        
        {/* Status Display */}
        <div className="w-full text-center space-y-2 h-16 flex flex-col items-center justify-center">
          <span className={`text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${isRolling ? 'text-[#FF00B2] animate-pulse' : 'text-[#AD15B5]'}`}>
            Status
          </span>
          <span className="text-2xl font-bold text-white tracking-wide">
            {statusText}
          </span>
        </div>

        {/* Die Visualization Area */}
        <div className="w-40 h-40 bg-[#2a0e45] rounded-xl flex items-center justify-center border-2 border-[#AD15B5]/20 shadow-inner relative overflow-hidden">
          {/* Background decoration inside the die box */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#AD15B5]/10 to-transparent"></div>
          
          <div className={`transition-all duration-500 transform ${result && !isRolling ? 'scale-110' : 'scale-100'}`}>
            {renderDieIcon(result)}
          </div>
        </div>

        {/* Result Text Large */}
        {result && !isRolling && (
          <div className="absolute top-4 right-4 animate-bounce-short">
             <Sparkles className="text-[#FF00B2]" size={24} />
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`
            relative w-full py-3 px-6 rounded-lg font-bold text-lg uppercase tracking-wider transition-all duration-300 transform
            flex items-center justify-center gap-3 overflow-hidden
            ${isRolling 
              ? 'bg-[#2a0e45] text-[#AD15B5] cursor-not-allowed border border-[#AD15B5]/30' 
              : 'bg-gradient-to-r from-[#AD15B5] to-[#FF00B2] text-white hover:shadow-[0_0_20px_rgba(255,0,178,0.4)] hover:-translate-y-1 active:translate-y-0'
            }
          `}
        >
          {isRolling ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#FF00B2] animate-ping" />
              Rolling...
            </>
          ) : (
            <>
              Roll the Die
            </>
          )}
        </button>
      </div>
    </div>
  );
};