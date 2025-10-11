import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SuccessMessageProps {
  message: React.ReactNode;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  onClose,
}) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 md:p-4  ">
      <Card className="w-full max-w-[500px] bg-[#050505cc] border-transparent lg:border-4 md:border-[#D932FE] px-2 py-30   lg:px-6">
        <CardContent className="py-2 px-1  sm:px-3 border-none ">
          <div className="mb-6">
            <h2
              className="text-3xl font-bold text-[#D932FE] mb-8 cursive text-center"
              style={{ fontFamily: "Purple Purse, sans-serif" }}
            >
              Congra
              <span className="relative inline-block">
                <span className="inline-block ">t</span>
                <span className="absolute -top-2 left-1 text-sm ">✨</span>
              </span>
              ulations!
            </h2>
            <p className="text-gray-300 text-center mb-8">{message}</p>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="w-[126px] h-[48px] bg-[#FF00B2] hover:bg-[#d900a0] text-white  font-semibold  transition rounded-none"
            >
              Enter Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessMessage;
