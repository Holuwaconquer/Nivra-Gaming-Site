import React from 'react'
import GameImage1 from '../assets/Game-Image-1.png'
import GameImage2 from '../assets/Game-Image-2.png'
import GameBg from '../assets/gaming-bg.png'
import DoubleSquare from '../assets/double-square.png'
import DoubleTriangle from '../assets/double-triangle.png'
import Eclipse from '../assets/eclipse.png'

const ShowcaseGaming = () => {
  return (
    <div 
      className='w-full py-[10%] px-[7%] flex flex-col items-center justify-center min-h-screen relative'
      style={{
        backgroundImage: `url(${GameBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* main content of the Nivra gaming site content */}
      <div className='w-full flex flex-col items-center justify-center relative'>
        <h1 className='text-[6.25em] font-semibold text-[#DA07E0] text-center'>Nivra Gaming Site</h1>
        <div className='relative'>
          <img src={GameImage1} alt="" />
          <img src={GameImage2} className='absolute bottom-[-50px] left-0' alt="" />
        </div>
        <p 
          className='text-center w-8/12 text-white text-[23.78px] mt-[-40px] z-1'
          style={{
            WebkitTextStroke: '2px #FF00B2',
            textStroke: '2px #FF00B2',
            paintOrder: 'stroke fill'
          }as React.CSSProperties}
        >
          Whether you’re a casual player or a competitive gamer, Nivra is your hub for unlocking new challenges, tracking your progress, and diving deeper into the games you love.
        </p>
      <img src={DoubleSquare} className='absolute left-0 bottom-[10px]' alt="" />
      <img src={DoubleTriangle} className='absolute right-0 bottom-[10px]' alt="" />
      </div>
      {/* end of the main content of the Nivra gaming site content */}
      {/* this is for the top drop shadow */}
      <div className='absolute top-0 left-0 w-full vector'></div>

      {/* this is for the bottom drop shadow */}
      <div className='absolute bottom-0 left-0 w-full rotate-180 vector2'></div>
      <img src={Eclipse} className='absolute left-0 bottom-[-90px] w-[200px]' alt="" />
      <img src={Eclipse} className='absolute right-0 bottom-[-90px] w-[200px]' alt="" />
    </div>
  )
}

export default ShowcaseGaming