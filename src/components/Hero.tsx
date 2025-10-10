import { FaFacebook, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Mask from '../assets/vr-ar.png';
import line from '../assets/line.png';

const Hero = () => {
  return (
    <div
      className="relative w-full py-[4%] px-[48px] overflow-hidden min-h-screen flex items-center">
      {/* Lottie Background Animation */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div className="w-full h-full scale-150"> {/* Scale container instead */}
          <DotLottieReact
            src="https://lottie.host/5806fbf4-00d5-43a8-8813-3121e8e6bb8e/VfxjEuqFG4.lottie"
            loop
            autoplay
            style={{
              width: '100%',
              height: '100%',
              minHeight: '100vh',
              transform: 'scale(1.1)'
            }}
          />
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(33, 7, 54, 0.62), rgba(33, 7, 54, 0.62))"
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="w-full grid md:grid-cols-2 items-center gap-8">
          {/* Left side - Text Content */}
          <div className="w-full flex flex-col gap-6">
            <h1 className="text-[4em] md:text-[5em] font-bold leading-[1em] relative">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                GAMING STREAMER
              </span>
              <img 
                src={line} 
                className="absolute -top-0 -left-0" 
                alt="decoration line" 
              />
            </h1>
            
            <p className="text-[1.5em] md:text-[2em] font-semibold text-white">
              The Ideal content for <span className="text-[#DA07E0]">Gamers</span>
            </p>
            
            <p className="text-[16px] font-semibold text-gray-300 leading-relaxed max-w-2xl">
              "Welcome to Nivra – where every level is a new adventure. Dive into your favorite games, 
              unlock challenges, and rise through the ranks. Ready to play?"
            </p>
            
            <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
              <button className="cursor-pointer text-white py-[12px] px-[32px] bg-[#411366] hover:bg-[#512376] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                Join Now
              </button>
              <button className="cursor-pointer text-white py-[12px] px-[32px] bg-[#D932FE] hover:bg-[#E845FF] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-pink-500/25 hover:scale-105">
                Learn About Us
              </button>
            </div>
            
            <div className='flex items-center gap-6 text-[#D932FE] text-[28px] md:text-[30px] pt-4'>
              <FaFacebook className='hover:scale-125 cursor-pointer transition-all duration-300 hover:text-[#E845FF]' />
              <BsTwitterX className='hover:scale-125 cursor-pointer transition-all duration-300 hover:text-[#E845FF]'/>
              <FaYoutube className='hover:scale-125 cursor-pointer transition-all duration-300 hover:text-[#E845FF]'/>
            </div>
          </div>
          
          {/* Right side - Image Content */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="relative max-w-[380px] md:max-w-[426px] w-full h-[380px] md:h-[426px] rounded-[50%] border-4 border-[#F432FF] bg-gradient-to-br from-[#9B32FF] to-[#D932FE] overflow-hidden shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/75 transition-all duration-500 hover:scale-105">
              <img 
                src={Mask} 
                className="w-full h-full object-cover" 
                alt="VR Gaming Experience" 
              />
              {/* Glow effect */}
            </div>
          </div>
        </div>

      </div>
              <div className='absolute bottom-[-40px] left-0 w-full rotate-180 vector'></div>
    </div>
  );
}

export default Hero;