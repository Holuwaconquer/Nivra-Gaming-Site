import React, { useEffect, useState, useRef } from 'react'
import GameImage1 from '../assets/Game-Image-1.png'
import GameImage2 from '../assets/Game-Image-2.png'
import GameBg from '../assets/gaming-bg.png'
import DoubleSquare from '../assets/double-square.png'
import DoubleTriangle from '../assets/double-triangle.png'
import Eclipse from '../assets/eclipse.png'
import GameBg2 from '../assets/gaming-bg2.png'
import GameBg3 from '../assets/gaming-bg-3.png'

const ShowcaseGaming = () => {
  const [currentBg, setCurrentBg] = useState(GameBg)
  const [nextBg, setNextBg] = useState(GameBg2)
  const [fade, setFade] = useState(false)
  
  const backgroundImages = [GameBg, GameBg2, GameBg3]
  const currentIndexRef = useRef(0)
  
  useEffect(() => {
    // Set initial next background
    setNextBg(backgroundImages[1])
    
    const interval = setInterval(() => {
      // Start crossfade
      setFade(true)
      
      // After fade completes, update current and next background
      setTimeout(() => {
        currentIndexRef.current = (currentIndexRef.current + 1) % backgroundImages.length
        const nextIndex = (currentIndexRef.current + 1) % backgroundImages.length
        
        setCurrentBg(backgroundImages[currentIndexRef.current])
        setNextBg(backgroundImages[nextIndex])
        setFade(false)
      }, 500) // Match the transition duration
      
    }, 3000)
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [backgroundImages])
  
  return (
    <div className='w-full py-[10%] px-[7%] flex flex-col items-center justify-center lg:min-h-screen relative'>
      {/* Background layers for crossfade */}
      <div 
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `url(${currentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: fade ? 0 : 1,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      <div 
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `url(${nextBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: fade ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      
      {/* main content of the Nivra gaming site content */}
      <div className='w-full flex flex-col items-center justify-center relative z-10'>
        <h1 className='text-[28px] md:text-[2.5em] z-10 lg:text-[6.25em] font-semibold text-[#DA07E0] text-center'>Nivra Gaming Site</h1>
        <div className='relative'>
          <img src={GameImage1} alt="" />
          <img src={GameImage2} className='absolute bottom-[-50px] left-0' alt="" />
        </div>
        <p 
          className='text-center md:w-8/12 text-white text-[14px] md:text-[23.78px] mt-[-40px] z-1'
          style={{
            WebkitTextStroke: '2px #FF00B2',
            textStroke: '2px #FF00B2',
            paintOrder: 'stroke fill'
          } as React.CSSProperties}
        >
          Whether you're a casual player or a competitive gamer, Nivra is your hub for unlocking new challenges, tracking your progress, and diving deeper into the games you love.
        </p>
        <img src={DoubleSquare} className='absolute left-0 bottom-[10px] opacity-25 md:opacity-100' alt="" />
        <img src={DoubleTriangle} className='absolute right-0 bottom-[10px] opacity-25 md:opacity-100' alt="" />
      </div>
      {/* end of the main content of the Nivra gaming site content */}
      
      {/* this is for the top drop shadow */}
      <div className='absolute top-0 left-0 md:w-full vector z-5'></div>

      {/* this is for the bottom drop shadow */}
      <div className='absolute bottom-0 left-0 md:w-full rotate-180 vector2 z-5'></div>
      <img src={Eclipse} className='absolute left-0 bottom-[-90px] md:w-[200px] z-5' alt="" />
      <img src={Eclipse} className='absolute right-0 bottom-[-90px] md:w-[200px] z-5' alt="" />

      <div className='absolute bottom-0 left-0 md:h-full rotate-180 vector2 z-5'></div>
      <div className='absolute bottom-0 right-0 md:h-full rotate-180 vector2 z-5'></div>
    </div>
  )
}

export default ShowcaseGaming