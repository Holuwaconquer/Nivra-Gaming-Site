import {useEffect, useState} from "react";
import Profileslide1 from "../assets/Profileslide1.png";
import Profileslide2 from "../assets/Profileslide2.png";
import Profileslide3 from "../assets/Profileslide3.png";
import Profileslide4 from "../assets/Profileslide4.png";
import Profileslide5 from "../assets/Profileslide5.png";
import Profileslide6 from "../assets/Profileslide6.png";
import Profileslide7 from "../assets/Profileslide7.png";
import Profileslide8 from "../assets/Profileslide8.png";
import Avatar1 from "../assets/avatars/Avatar1.png";
import Avatar2 from "../assets/avatars/Avatar2.png";
import Avatar3 from "../assets/avatars/Avatar3.png";
import Avatar4 from "../assets/avatars/Avatar4.png";
import Avatar5 from "../assets/avatars/Avatar5.png";
import Avatar6 from "../assets/avatars/Avatar6.png";
import Avatar7 from "../assets/avatars/Avatar7.png";
import Avatar8 from "../assets/avatars/Avatar8.png";
import Avatar9 from "../assets/avatars/Avatar9.png";
import Avatar10 from "../assets/avatars/Avatar10.png";
import Avatar11 from "../assets/avatars/Avatar11.png";
import {BiChevronDown, BiLock, BiPlus} from "react-icons/bi";
import plusImg from "../assets/double-plus.png";
import plusTriangle from "../assets/double-triangle.png";
import mousePic from '../assets/mouse.png'

const images = [
  Profileslide1,
  Profileslide2,
  Profileslide3,
  Profileslide4,
  Profileslide5,
  Profileslide6,
  Profileslide7,
  Profileslide8,
];
const avatars = [
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
];

const Profile = () => {
  const [current, setCurrent] = useState(0);
  const [toggleAvatarList, setToggleAvatarList] = useState(true);

  // Change image every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


  return (
    // #D932FE
    <div className="pb-5 bg-[#210736] ">
      <div className="relative w-full rounded-2xl">
        
        <div className="">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute w-full h-[35vh] md:h-[50vh] object-cover transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* MAIN PROFILE SECTION */}
        <div className="relative pt-40 w-full ">
             <div className="absolute right-10 md:right-[30%] bottom-0 z-[99] ">
        <img className="w-12 h-12 " src={plusTriangle} alt="plus" />
     
      </div>
       <div className="absolute left-10 md:left-[30%] -bottom-10 z-[99] ">
        <img className="scale-75 " src={mousePic} alt="plus" />
      </div>
          <div className="relative w-fit mx-auto">
            <img
              className="border-[#D932FE] mx-auto border-16 rounded-full w-40 h-40 md:w-60 md:h-60 object-cover "
              src={Avatar1}
              alt=""
            />
            <div className="bg-[#6e1db0] absolute bottom-4 right-4 md:bottom-7 md:right-7  border-[1px] border-white rounded-full p-2 w-fit text-[#e46eff]  ">
              <BiPlus size={20} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col ">
          <button onClick={()=> setToggleAvatarList(!toggleAvatarList)} className="outline-none border-none text-white py-2 px-3 my-10 bg-[#bd15ff6f] hover:bg-[#b700ff3c] mx-auto p-2 rounded-sm flex gap-x-2 items-center ">
            View Less <span><BiChevronDown className={`${toggleAvatarList? "rotate-180 " : "rotate-0"}`} size={25} /></span>
          </button>
        </div>
        <div className="relative w-[95%] sm:w-[70%] mx-auto ">
             <div className="blur-circles lg:block hidden w-[150px] absolute -bottom-30 -left-70 h-[150px] rounded-full blur-[40px] bg-[#D932FE]/60 " ></div> 
             <div className="blur-circles lg:block hidden w-[150px] absolute top-0 -right-50 h-[150px] rounded-full blur-[40px] bg-[#D932FE]/60 " ></div> 
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/20 to-transparent pointer-events-none z-10"></div>
          <div className={`avatars-list overflow-x-auto flex flex-row gap-10 sm:gap-20 scrollbar-hide ${toggleAvatarList? 'block' : "hidden" } `}>
            {/* Unlocked avatars */}
            {avatars.slice(0, 3).map((avatar, index) => (
              <img
                src={avatar}
                key={avatar + index}
                className="w-24 sm:w-32 h-24 sm:h-32 border-[#D932FE] border-4 rounded-full object-cover flex-shrink-0"
                alt="Avatar"
              />
            ))}

            {/* Locked avatars */}
            {avatars.slice(3).map((avatar, index) => (
              <div key={avatar + index} className="relative flex-shrink-0">
                <img
                  src={avatar}
                  className="w-24 sm:w-32 h-24 sm:h-32 border-[#D932FE] border-4 rounded-full object-cover"
                  alt="Avatar"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                  <BiLock size={30} className="text-[#d0cccc]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        

        <form className="w-[95%] lg:w-[50%] mx-auto mt-20 " action="">
            <div className="my-10 md:flex-row flex-col gap-y-5 flex justify-between " >
                <label htmlFor="username" className="text-white text-sm mr-10 " >User Name</label>
                <input type="text" placeholder="User Name" className="bg-[#600097] pl-5 text-[#ca38ff] outline-none border-none h-12 w-full md:w-[80%] rounded-sm  " id="username" />
            </div>
            <div className="my-10 md:flex-row flex-col gap-y-5 flex justify-between " >
                <label htmlFor="email" className="text-white text-sm mr-10 " >Email</label>
                <input type="text" placeholder="Email" className="bg-[#600097] pl-5 text-[#ca38ff] outline-none border-none h-12 w-full md:w-[80%] rounded-sm  " id="email" />
            </div>
            <div className="my-10 md:flex-row flex-col gap-y-5 flex justify-between " >
                <label htmlFor="password" className="text-white text-sm mr-10 " >Password</label>
                <input type="Password" placeholder="Password" className="bg-[#600097] pl-5 text-[#ca38ff] outline-none border-none h-12 w-full md:w-[80%] rounded-sm  " id="password" />
            </div>
           <div className="flex" >
             <button className="outline-none text-white py-2 px-3 my-10 border-4 border-[#D932FE] bg-transparent hover:bg-[#b700ff] mx-auto w-[200px] ">
            Save Changes
          </button>
           </div>
           <div className="absolute left-[80%] bottom-20 z-[99] ">
        <img className="w-12 h-12 " src={plusTriangle} alt="plus" />
      </div>
             <div className="absolute left-[10%] bottom-10 z-[99] ">
        <img className="w-12 h-12 " src={plusImg} alt="plus" />
      </div>
        </form>

       
      </div>
    </div>
  );  
};

export default Profile;
