import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import nivraLogo from "@/assets/nivra-logo.png";
import SuccessMessage from "@/components/SuccessMessage";

const OTP_LENGTH = 6;
const TIMER_SECONDS = 120;

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SECONDS);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (secs: number): string => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (index: number, value: string): void => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    setErrorMsg("");
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const updated = [...otp];
      updated[index - 1] = "";
      setOtp(updated);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH);
    const updated = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => {
      updated[i] = ch;
    });
    setOtp(updated);
    const nextIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIdx]?.focus();
  };

  const handleResend = (): void => {
    // TODO: Add backend resend OTP API call here
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeLeft(TIMER_SECONDS);
    setCanResend(false);
    setErrorMsg("");
    inputRefs.current[0]?.focus();
  };

  const handleVerify = (): void => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;
    // TODO: Add backend verify OTP API call here
    console.log("OTP submitted:", code);
    setIsSuccess(true);
  };

  const isFilled = otp.every((d) => d !== "");

  if (isSuccess) {
    return (
      <SuccessMessage
        message={
          <>
            You have successfully logged into <br />
            <span className="text-[#FF00B2] font-semibold">
              Nivra Gaming Site
            </span>
          </>
        }
        onClose={() => navigate("/game")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 md:p-4">
      <Card className="w-full max-w-[500px] bg-[#050505cc] border-transparent lg:border-4 md:border-[#D932FE] px-2 lg:px-6">
        <CardContent className="py-2 px-1 sm:px-3 border-none">
          {/* Logo */}
          <div className="flex justify-center mb-1 sm:mb-2">
            <div className="border-4 border-pink-500 rounded-2xl p-3 sm:p-4 w-32 sm:w-48">
              <img src={nivraLogo} alt="Nivra Logo" className="w-full h-auto" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-4 sm:mb-6">
            <h2
              className="text-white text-lg font-semibold mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Verify Your Account
            </h2>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12
                  bg-[#411366] text-white text-center text-xl font-bold
                  rounded-sm border-0 outline-none
                  transition-shadow duration-200
                  focus:ring-[3px] focus:ring-[#FF00B2]/50 focus:ring-offset-0
                  ${digit ? "ring-2 ring-[#FF00B2]" : ""}
                `}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              />
            ))}
          </div>

          {/* Error */}
          <div className="min-h-[20px] text-center mb-2">
            {errorMsg && (
              <p
                className="text-red-500 text-xs"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {errorMsg}
              </p>
            )}
          </div>

          {/* Timer + Resend */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Expires in{" "}
              <span className="text-[#FF00B2] font-semibold">
                {formatTime(timeLeft)}
              </span>
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`text-sm transition-colors ${
                canResend
                  ? "text-white hover:text-[#FF00B2] cursor-pointer"
                  : "text-gray-600 cursor-not-allowed"
              }`}
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Resend code
            </button>
          </div>

          {/* Verify Button */}
          <div className="flex justify-center mb-2">
            <Button
              onClick={handleVerify}
              disabled={!isFilled}
              className="w-[126px] h-[48px] bg-[#FF00B2] hover:bg-[#d900a0] disabled:bg-[#7a005a] text-white font-semibold transition rounded-none"
            >
              Verify
            </Button>
          </div>

          {/* Back */}
          <div className="text-center mt-1">
            <button
              type="button"
              onClick={() => navigate("/auth/signup")}
              className="text-white text-sm hover:text-[#FF00B2] transition-colors"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              ← Back to Sign Up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerification;
