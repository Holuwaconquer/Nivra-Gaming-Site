import { NavLink } from 'react-router-dom'
import { FaFacebook, FaYoutube} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  return (
    <div className='w-full bg-[#210736] flex items-center justify-between py-[30px] px-[48px] z-10 relative' style={{boxShadow: '0px -10px 20px 10px #00000033'}}>
      <div className='text-white text-[16px] font-semibold'>
        <p>Copyright &copy; {currentYear} - {currentYear + 1} Nivra Gaming Site Inc.</p>
      </div>
      <div className='flex gap-4 items-center'>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/services'>Services</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/about-us'>About Us</NavLink>
        <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[#FF00B2] text-[16px] font-semibold' : 'hover:text-[#FF00B2] text-white' } ` } to='/contact-us'>Contact Us</NavLink>
      </div>
      <div className='flex items-center gap-4 text-[#D932FE] text-[30px]'>
        <FaFacebook className='hover:scale-[1.2] cursor-pointer transition-all' />
        <BsTwitterX className='hover:scale-[1.2] cursor-pointer transition-all'/>
        <FaYoutube className='hover:scale-[1.2] cursor-pointer transition-all'/>
      </div>
    </div>
  )
}

export default Footer