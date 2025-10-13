import { motion } from 'framer-motion';
import { useState } from 'react';
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
  const [centerIndex, setCenterIndex] = useState(2); // Start with the middle card as center
  
  const cards = [
    {title: "CALL OF DUTY", averageRating: 4.0, Image: CallOfDuty, reviews: "4/5 - 159K REVIEWS"},
    {title: "BLOCK BUSTER", averageRating: 4.0, Image: BlockBuster, reviews: "4/5 - 159K REVIEWS"},
    {title: "DELTA FORCE", averageRating: 4.0, Image: DeltaForce, reviews: "4/5 - 159K REVIEWS"},
    {title: "SUBWAY SURFERS", averageRating: 4.0, Image: Surfers, reviews: "4/5 - 159K REVIEWS"},
    {title: "DEAD TRIGGERS", averageRating: 4.0, Image: Triggers, reviews: "4/5 - 159K REVIEWS"},
  ];

  // Fixed positions for each card slot (not based on centerIndex)
  const getCardStyle = (index: number) => {
    const positions = [
      { offset: -360, y: 10, height: '350px', width: '280px', zIndex: 20 }, // Leftmost
      { offset: -180, y: 10, height: '400px', width: '280px', zIndex: 25 }, // Left middle
      { offset: 0, y: 0, height: '450px', width: '320px', zIndex: 30 },     // Center
      { offset: 180, y: 10, height: '400px', width: '280px', zIndex: 25 },  // Right middle
      { offset: 360, y: 10, height: '350px', width: '280px', zIndex: 20 }   // Rightmost
    ];
    
    return positions[index];
  };

  const handleCardClick = (clickedIndex: number) => {
    if (clickedIndex === centerIndex) return; // Don't do anything if clicking the current center
    
    setCenterIndex(clickedIndex);
  };

  // Determine which card should be in which position
  const getCardForPosition = (positionIndex: number) => {
    // If this position is the center, return the center card
    if (positionIndex === 2) {
      return centerIndex;
    }
    
    // For other positions, we need to distribute the remaining cards
    const remainingCards = cards.map((_, index) => index).filter(index => index !== centerIndex);
    
    // Map positions to remaining cards:
    // Position 0 (leftmost) gets the card at index 0 from remaining, unless it was the old center
    // Position 1 (left middle) gets the card at index 1 from remaining
    // Position 3 (right middle) gets the card at index 2 from remaining  
    // Position 4 (rightmost) gets the card at index 3 from remaining
    
    const positionMapping = {
      0: remainingCards[0], // Leftmost
      1: remainingCards[1], // Left middle
      3: remainingCards[2], // Right middle
      4: remainingCards[3]  // Rightmost
    };
    
    return positionMapping[positionIndex as keyof typeof positionMapping];
  };
  
  return (
    <div className='lg:min-h-screen hidden w-full bg-[#210736] md:flex flex-col items-center justify-center py-5 relative'>
      {/* Header Section */}
      <div className='w-full z-10 flex items-center text-center justify-center gap-4 relative mb-8'>
        <span><img src={Polygon} className='rotate-180' alt="" /></span>
        <h1 className='w-full md:w-auto leading-8 text-[2em] md:text-[56px] font-semibold text-[#DA07E0]'>Featured Games</h1>
        <span><img src={Polygon} alt="" /></span>
      </div>

      {/* Cards Container */}
      <div className="w-full flex items-center justify-center relative" style={{ height: '500px' }}>
        {/* Render each position slot */}
        {[0, 1, 2, 3, 4].map((positionIndex) => {
          const cardIndex = getCardForPosition(positionIndex);
          const card = cards[cardIndex];
          const style = getCardStyle(positionIndex);
          const isCenter = positionIndex === 2;
          
          return (
            <motion.div
              key={`${positionIndex}-${cardIndex}`} // Unique key for animation
              className={`absolute bg-gradient-to-b from-[#411366] to-[#2A0B47] rounded-[20px] border-4 border-white backdrop-blur-sm cursor-pointer overflow-hidden ${
                isCenter ? 'shadow-[0_12px_20px_5px_rgba(255,0,178,0.3)]' : ''
              }`}
              style={{ 
                x: style.offset,
                y: style.y,
                zIndex: style.zIndex,
                height: style.height,
                width: style.width
              }}
              onClick={() => handleCardClick(cardIndex)}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.5
              }}
              layoutId={`card-${cardIndex}`} // This enables smooth card movement
            >
              <div className="p-6 text-white h-full flex flex-col gap-6 items-center justify-between">
                {/* Image Container */}
                <div className='w-full h-[55%] overflow-hidden rounded-[12px] bg-black/20'>
                  <img 
                    src={card.Image} 
                    className='w-full h-full object-cover' 
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
                    <NavLink 
                      className="cursor-pointer text-[16px] transition font-semibold hover:bg-[#0982FE] border border-[#FF00B2] py-[12px] px-[32px] text-white" 
                      to='/play-now'
                      onClick={(e) => e.stopPropagation()} // Prevent card click when clicking NavLink
                    >
                      Play Now
                    </NavLink>
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