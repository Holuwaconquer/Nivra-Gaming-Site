import { useEffect, useState, useRef } from 'react'
import GameBg from '../assets/gaming-bg.png'
import Eclipse from '../assets/eclipse.png'
import GameBg2 from '../assets/gaming-bg2.png'
import GameBg3 from '../assets/gaming-bg-3.png'
import Polygon from '../assets/Polygon.png'
import DoublePlus from '../assets/double-plus.png'
import { RxCaretDown } from "react-icons/rx";

const AboutUs = () => {
  const [currentBg, setCurrentBg] = useState(GameBg)
  const [nextBg, setNextBg] = useState(GameBg2)
  const [fade, setFade] = useState(false)
  const aboutText = "At Nivra, we believe gaming should be more than just entertainment — it should be an experience. That's why we've built a platform where gamers of all kinds can explore, access, and conquer different game levels with ease. Whether you're a casual player or a competitive gamer, Nivra is your hub for unlocking new challenges, tracking your progress, and diving deeper into the games you love. Our mission is to bring thrill, creativity, and community to your screen — one level at a time. We're passionate about creating a seamless, immersive space where every player can find their next adventure.Game on. Level up. Welcome to Nivra."
  const backgroundImages = [GameBg, GameBg2, GameBg3]
  const currentIndexRef = useRef(0)
  const [splitPoint, setsplitPoint] = useState(60)
  
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
      }, 1000) // Match the transition duration
      
    }, 3000)
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [backgroundImages])
  
  const readMore = () => {
    if(splitPoint === 60) {
      setsplitPoint(aboutText.length)
    } else {
      setsplitPoint(60)
    }
  }
  
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
      
      {/* main content of the about us section and the title */}
      <div className='w-full flex flex-col gap-4 items-center justify-center relative z-10'>
        {/* for the title and the line inbtw */}
        <div className='w-full flex items-center text-center justify-center gap-4 relative'>
          <div className="relative">
            <img src={DoublePlus} className='absolute top-[-20px] left-[0px] z-5 w-[50px]' alt="" />
            <span><img src={Polygon} className='rotate-180' alt="" /></span>
          </div>
          <h1 className='text-[56px] font-semibold text-[#DA07E0]'>About Us</h1>
          <span><img src={Polygon} alt="" /></span>
        </div>
        {/* for the text */}
        <p 
          className='text-center transition md:w-8/12 text-white md:text-[23.78px] mt-[0px] z-1'
          style={{
            WebkitTextStroke: '2px #FF00B2',
            textStroke: '2px #FF00B2',
            paintOrder: 'stroke fill'
          } as React.CSSProperties}
        >
          {aboutText.split(" ").slice(0,splitPoint).join(" ")}
        </p>
        <button onClick={readMore} className="cursor-pointer text-white py-[12px] px-[22px] bg-[#411366] hover:bg-[#512376] transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-purple-500/25 hover:scale-105 flex gap-2 items-center">
          <span>{splitPoint === aboutText.length ? 'Read Less' : 'Read More'}</span>
          <RxCaretDown className={`${splitPoint === aboutText.length ? 'rotate-180' : ''} transition-transform duration-300`} size={30}/>
        </button>
      </div>
      
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

export default AboutUs