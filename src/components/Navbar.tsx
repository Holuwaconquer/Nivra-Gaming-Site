import React from 'react'
import NivraLogo from '../assets/nivra-logo.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full bg-[#210736d6] flex items-center justify-between py-[30px] px-[48px] z-100 sticky top-0 left-0' style={{
        backdropFilter: 'blur(2px)'
      }}>
      <div>
        <img src={NivraLogo} alt="nivra-logo" />
      </div>
      <div className='flex gap-4 items-center'>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/services'>Services</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/about-us'>About Us</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/contact'>Contact Us</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[16px] font-semibold bg-[#0982FE]' : 'hover:bg-[#0982FE] border border-[#FF00B2] py-[12px] px-[32px] text-white' } ` } to='/play-now'>Play Now</NavLink>
      </div>
    </div>
  )
}

export default Navbar