import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";

import shape1 from "../assets/double-triangle.png";
import shape2 from "../assets/double-square.png";
import shape3 from "../assets/double-circle.png";
import shape4 from "../assets/double-plus.png";
import shape5 from "../assets/mouse.png";

import backgroundVideo from "../assets/background-video.mp4";
import fallbackImage from "../assets/streetRacing3d.png";

const CountdownPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [isMobile]);

  const shapes = [
    { top: "1%", left: "9%", size: 60, image: shape1, opacity: 0.6 },
    { top: "15%", right: "8%", size: 60, image: shape2, opacity: 0.5 },
    { bottom: "15%", left: "2%", size: 60, image: shape3, opacity: 0.4 },
    { top: "2%", right: "1%", size: 60, image: shape2, opacity: 0.5 },
    { top: "50%", left: "1%", size: 60, image: shape1, opacity: 0.5 },
    { top: "5%", left: "37%", size: 60, image: shape5, opacity: 0.5 },
    { top: "36%", left: "5%", size: 60, image: shape4, opacity: 0.5 },
    { bottom: "5%", right: "25%", size: 60, image: shape3, opacity: 0.4 },
  ];

  const blurSpots = [
    { bottom: "20%", left: "10%", size: 350 },
    { top: "40%", right: "15%", size: 400 },
    { top: "60%", left: "50%", size: 280 },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-white"
      style={{ backgroundColor: "#210736" }}
    >
      {blurSpots.map((spot, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            top: spot.top,
            left: spot.left,
            right: spot.right,
            bottom: spot.bottom,
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            backgroundColor: "#D932FE",
            opacity: 0.3,
          }}
        />
      ))}

      {shapes.map((shape, i) => (
        <img
          key={i}
          src={shape.image}
          alt=""
          className="absolute"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: shape.opacity,
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      ))}

      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-3xl shadow-lg p-6 sm:p-12 overflow-hidden mx-4"
        style={{
          width: "95%",
          maxWidth: "1200px",
          minHeight: isMobile ? "500px" : "600px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            overflow: "hidden",
            borderRadius: "1.5rem",
          }}
        >
          {!isMobile ? (
            <video
              ref={videoRef}
              muted
              playsInline
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                minWidth: "100%",
                minHeight: "100%",
                width: "auto",
                height: "auto",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
              }}
              onEnded={(e) => {
                e.currentTarget.pause();
              }}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          ) : (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${fallbackImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: isMobile
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-10 drop-shadow-lg relative z-10 text-center px-4">
          Stay tuned for the next Round!
        </h2>

        <div className="mb-4 sm:mb-6 relative z-10">
          <CountdownTimer duration={9059} />
        </div>

        <div className="flex flex-col items-center space-y-3 mt-4 sm:mt-8 relative z-10 w-full px-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              className="flex items-center justify-center px-6 sm:px-8 py-3 cursor-pointer rounded-md font-semibold hover:opacity-90 transition text-base sm:text-lg w-full sm:w-auto"
              style={{ background: "linear-gradient(90deg, #9B32FF, #F432FF)" }}
            >
              Get Notified
            </button>
            <button
              className="flex items-center justify-center px-4 py-3 cursor-pointer rounded-md font-semibold hover:opacity-90 transition text-base sm:text-lg w-full sm:w-auto"
              style={{ background: "linear-gradient(90deg, #9B32FF, #F432FF)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="border border-[#D932FE] cursor-pointer text-white px-6 sm:px-8 py-3 rounded-md font-semibold hover:bg-[#D932FE] hover:text-white transition text-base sm:text-lg w-full sm:w-auto"
          >
            Back to Service Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
