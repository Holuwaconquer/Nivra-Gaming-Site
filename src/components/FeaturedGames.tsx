import { motion } from 'framer-motion';
import Polygon from '../assets/Polygon.png'
import { FaRegStar} from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import CallOfDuty from '../assets/callOfDuty.png'
import BlockBuster from '../assets/blockBluster.png'
import DeltaForce from '../assets/deltaForce.png'
import Surfers from '../assets/surfers.png'
import Triggers from '../assets/triggers.png'
import Eclipse from '../assets/eclipse.png'

const FeaturedGames = () => {
  const cards = [
    {title: "CALL OF DUTY", averageRating: 4.0, Image: CallOfDuty, reviews: "4/5 - 159K REVIEWS"},
    {title: "BLOCK BUSTER", averageRating: 4.0, Image: BlockBuster, reviews: "4/5 - 159K REVIEWS"},
    {title: "DELTA FORCE", averageRating: 4.0, Image: DeltaForce, reviews: "4/5 - 159K REVIEWS"},
    {title: "SUBWAY SURFERS", averageRating: 4.0, Image: Surfers, reviews: "4/5 - 159K REVIEWS"},
    {title: "DEAD TRIGGERS", averageRating: 4.0, Image: Triggers, reviews: "4/5 - 159K REVIEWS"},
  ];

  // Height configuration
  const getBaseHeight = (index: number) => {
    const heights = {
      0: '350px', // First card
      1: '400px', // Second card  
      2: '450px', // Center card
      3: '400px', // Fourth card
      4: '350px'  // Fifth card
    };
    return heights[index as keyof typeof heights];
  };
  
  return (
    <div
     className='min-h-screen w-full bg-[#210736] flex flex-col items-center justify-center py-5 relative'>
      {/* Header Section */}
      <div className='w-full flex items-center text-center justify-center gap-4 relative mb-8'>
        <span><img src={Polygon} className='rotate-180' alt="" /></span>
        <h1 className='text-[56px] font-semibold text-[#DA07E0]'>Featured Games</h1>
        <span><img src={Polygon} alt="" /></span>
      </div>

      {/* Cards Container - Fixed height to prevent overlap */}
      <div className="w-full flex items-center justify-center relative" style={{ height: '500px' }}>
        {cards.map((card, index) => {
          const isCenter = index === 2;
          const offset = (index - 2) * 180;
          const baseHeight = getBaseHeight(index);
          
          // Z-index logic
          let zIndex;
          if (isCenter) {
            zIndex = 30;
          } else if (index === 1 || index === 3) { // Cards 2 and 4
            zIndex = 25;
          } else { // Cards 1 and 5
            zIndex = 20;
          }
          
          return (
            <motion.div
              key={index}
              className={`absolute bg-gradient-to-b from-[#411366] to-[#2A0B47] rounded-[20px] border-4 border-white hover:shadow-[0_12px_20px_5px_rgba(255,0,178,0.3)] backdrop-blur-sm cursor-pointer ${
                isCenter ? 'w-[320px]' : 'w-[280px]'
              } overflow-hidden`}
              style={{ 
                x: offset,
                y: isCenter ? 0 : 10,
                zIndex: zIndex,
                height: baseHeight
              }}
              whileHover={{ 
                scale: isCenter ? 1.05 : 1.1,
                zIndex: 50,
                y: 0,
                height: '480px'
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                height: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <div className="p-6 text-white h-full flex flex-col gap-6 items-center justify-between">
                {/* Image Container */}
                <div className='w-full h-[55%] overflow-hidden rounded-[12px] bg-black/20'>
                  <img 
                    src={card.Image} 
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' 
                    alt={card.title} 
                  />
                </div>
                
                {/* Content Container */}
                <div className='w-full h-[45%]'>
                  <div className='text-center flex flex-col items-center justify-between gap-2'>
                    <h3 className="text-[1.4em] font-bold text-white">{card.title}</h3>
                    <div className='flex items-center justify-center gap-2'>
                      {[...Array(5)].map((_, i) =>
                        i < Math.round(card.averageRating) ? (
                          <FaStar key={i} size={18} className="text-[#FFF600]" />
                        ) : (
                          <FaRegStar key={i} size={18} className="text-[#ADB7BC]" />
                        )
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{card.reviews}</p>
                    <NavLink className={({ isActive }) => `cursor-pointer text-[16px] transition font-semibold ${isActive ? 'text-[16px] font-semibold bg-[#0982FE]' : 'hover:bg-[#0982FE] border border-[#FF00B2] py-[12px] px-[32px] text-white' } ` } to='/play-now'>Play Now</NavLink>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          );
        })}
      <img src={Eclipse} className='absolute right-0 bottom-0' alt="" />
      <img src={Eclipse} className='absolute left-0 bottom-[-40px]' alt="" />
      </div>
      <img src={Eclipse} className='absolute right-[0%] top-[-50px] opacity-50' alt="" />
      <img src={Eclipse} className='absolute left-[-10%] top-0 opacity-50' alt="" />
    </div>
  );
};

export default FeaturedGames;