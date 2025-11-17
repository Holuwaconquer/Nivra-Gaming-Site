interface SliderItem {
  id: number;
  name: string;
  image: string;
}

interface HorizontalSliderProps {
  items: SliderItem[];
  direction?: "left" | "right";
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  items,
  direction = "left",
}) => {
  const scrollClass =
    direction === "right" ? "animate-scroll-right" : "animate-scroll";

  return (
    <div className="flex items-center justify-center p-5 mt">
      <div className="w-full max-w-[1178px] h-[245px] overflow-hidden relative rounded-2xl shadow-2xl md:h-[220px] sm:h-[200px]">
        <div className={`flex w-max ${scrollClass} hover:pause-animation`}>
          <div className="flex gap-4 px-4 md:gap-3 sm:gap-2">
            {items.map((item, index) => (
              <div
                key={`set1-${item.id}-${index}`}
                className="flex-shrink-0 flex-grow-0 min-w-[197px] w-[197px] h-[245px] bg-[#411366] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative md:min-w-[170px] md:w-[170px] md:h-[220px] sm:min-w-[140px] sm:w-[140px] sm:h-[180px] sm:p-2.5"
              >
                <div
                  className="absolute top-2.5 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-base lg:text-[20px] font-extrabold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#F432FF] to-[#9B32FF] md:text-sm sm:text-xs sm:px-2 sm:py-0.5"
                  style={{ fontFamily: "Podkova, serif" }}
                >
                  Top {item.id}
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[140px] h-[140px] rounded-lg object-cover mt-5 mb-2.5 shadow-md md:w-[120px] md:h-[120px] sm:w-[90px] sm:h-[90px] sm:mt-3 sm:mb-1.5"
                />
                <div className="text-sm font-semibold text-white text-center mt-1 md:text-xs sm:text-[10px]">
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 px-4 md:gap-3 sm:gap-2" aria-hidden="true">
            {items.map((item, index) => (
              <div
                key={`set2-${item.id}-${index}`}
                className="flex-shrink-0 flex-grow-0 min-w-[197px] w-[197px] h-[245px] bg-[#411366] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative md:min-w-[170px] md:w-[170px] md:h-[220px] sm:min-w-[140px] sm:w-[140px] sm:h-[180px] sm:p-2.5"
              >
                <div
                  className="absolute top-2.5 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-base lg:text-[20px] font-extrabold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#F432FF] to-[#9B32FF] md:text-sm sm:text-xs sm:px-2 sm:py-0.5"
                  style={{ fontFamily: "Podkova, serif" }}
                >
                  Top {item.id}
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[140px] h-[140px] rounded-lg object-cover mt-5 mb-2.5 shadow-md md:w-[120px] md:h-[120px] sm:w-[90px] sm:h-[90px] sm:mt-3 sm:mb-1.5"
                />
                <div className="text-sm font-semibold text-white text-center mt-1 md:text-xs sm:text-[10px]">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50%)); }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }

        @media (max-width: 1024px) {
          .animate-scroll { animation: scroll 15s linear infinite; }
        }
        @media (max-width: 768px) {
          .animate-scroll { animation: scroll 20s linear infinite; }
        }
        @media (max-width: 480px) {
          .animate-scroll { animation: scroll 25s linear infinite; }
        }

        @keyframes scroll-right {
          from { transform: translateX(calc(-50%)); }
          to { transform: translateX(0); }
        }

        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }

        @media (max-width: 1024px) {
          .animate-scroll-right { animation: scroll-right 15s linear infinite; }
        }
        @media (max-width: 768px) {
          .animate-scroll-right { animation: scroll-right 20s linear infinite; }
        }
        @media (max-width: 480px) {
          .animate-scroll-right { animation: scroll-right 25s linear infinite; }
        }
      `}</style>
    </div>
  );
};

export default HorizontalSlider;
