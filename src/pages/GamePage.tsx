import { useState } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import slidePic1 from '../assets/Beach Buggy.png'
import slidePic2 from '../assets/callOfDuty.png'
import slidePic3 from '../assets/blockBluster.png'
import slidePic4 from '../assets/surfers.png'
import slidePic5 from '../assets/triggers.png'


const GamePage = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: slidePic1,
      title: 'Master Chief',
      showPlayButton: true
    },
    {
      id: 2,
      image: slidePic2,
      title: 'Cyberpunk Warrior',
      showPlayButton: false
    },
    {
      id: 3,
      image: slidePic3,
      title: 'Space Marine',
      showPlayButton: false
    },
    {
      id: 4,
      image: slidePic4,
      title: 'Battle Ready',
      showPlayButton: false
    },
    {
      id: 5,
      image: slidePic5,
      title: 'Future Soldier',
      showPlayButton: true
    }
  ];
  
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[500px] lg:h-screen bg-black overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {/* Slides with fade transition */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image with overlay */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-black/50 to-black/80" />
            </div>

            {/* Conditional Play Button */}
            {slide.showPlayButton && (
              <div className="absolute bottom-[10%] sm:bottom-[20%] max-sm:scale-75 left-0 right-0 flex items-end justify-center">
                <button className="group relative px-8 py-3 border-2 border-pink-500 bg-black/40 backdrop-blur-sm hover:bg-pink-500/20 transition-all duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <Play className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      Tap to Play
                    </span>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 border-2 border-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-10 top-1/2 max-sm:scale-75 -translate-y-1/2 w-12 h-12 flex items-center justify-center  backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-300 border-2 border-purple-500/30 z-20"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-10 top-1/2 max-sm:scale-75 -translate-y-1/2 w-12 h-12 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all duration-300 border-2 border-purple-500/30 z-20"
          aria-label="Next slide"
        >
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Horizontal Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="group relative cursor-pointer "
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Indicator bar */}
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'sm:w-12 w-8 bg-pink-500' 
                    : 'sm:w-8 w-6 bg-white/40 group-hover:bg-white/60'
                }`}
              />
              {currentSlide === index && (
                <div className="absolute inset-0 bg-pink-500 blur-md opacity-50" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Purple gradient frame effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border-4 border-purple-600/30" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
};
  export default GamePage