import { Accordion } from "@chakra-ui/react"
import Polygon from '../assets/Polygon.png'
import DoublePlus from '../assets/double-plus.png'
import DoubleCircle from '../assets/double-circle.png'
import DoubleSquare from '../assets/double-square.png'
import DoubleTriangle from '../assets/double-triangle.png'
import Mouse from '../assets/mouse.png'
import Eclipse from '../assets/eclipse.png'

const FAQ = () => {
  const items = [
    { value: "a", title: "What is Nivra?", text: "Nivra is an online platform that gives you access to different game levels, challenges, and experiences—all in one place. It's where gamers go to play, explore, and level up." },
    { value: "b", title: "Do i need to sign up to use Nivra?", text: "Some levels are open to everyone, but creating a free account unlocks full access, progress tracking, and exclusive featues." },
    { value: "c", title: "is Nivra free to use?", text: "Yes!Nivra offers free access to many game levels, Premium features or special content may require a subscription or one-time payment." },
    { value: "d", title: "can i save my game progress?", text: "Absolutely, Once you're signed in, your progress is automatically saved so you can pick up right where you left off." },
    { value: "e", title: "How do i report a bug or issue?", text: "You can report bugs or issues directly from your dashboard or contact us through our support page. We'll handle it as fas as possible." },
  ]

  return (
    <div className='w-full flex flex-col justify-center gap-4 relative bg-[#210736] px-[3%] md:px-[10%] py-16 z-10'>
      <div className='w-full flex items-center text-center justify-center gap-4 relative'>
        <div className="relative">
          <img src={DoublePlus} className='absolute top-[-20px] left-[0px] z-5 w-[50px] hidden md:flex' alt="" />
          <span><img src={Polygon} className='rotate-180' alt="" /></span>
        </div>
        <h1 className='text-[2em] md:text-[56px] font-semibold text-[#DA07E0]'>FAQ'S</h1>
        <span><img src={Polygon} alt="" /></span>
      </div>
      
      <Accordion.Root 
        multiple
        className='w-full flex flex-col gap-6 text-white font-semibold cursor-pointer'
      >
        {items.map((item, index) => (
          <Accordion.Item 
            key={index} 
            value={item.value} 
            className='border z-10 border-white cursor-pointer rounded-[16px] text-[18px] transition-all duration-300 data-[state=open]:shadow-[0_12px_20px_5px_rgba(255,0,178,0.3)]'
          >
            <Accordion.ItemTrigger className='w-full p-[16px] md:p-[32px] duration-200 data-[state=open]:bg-white data-[state=open]:text-[#210736] data-[state=open]:rounded-t-[16px] data-[state=open]:rounded-b-none z-10 relative'>
              <div className='flex justify-between items-center w-full data-[state=open]:border-b-3 data-[state=open]:border-[#210736] cursor-pointer'>
                <span className='text-left'>{item.title}</span>
                <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all duration-300 data-[state=open]:bg-[#210736] data-[state=open]:rotate-90'>
                  <svg 
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none" 
                    className='transition-transform duration-300 data-[state=open]:rotate-90'
                  >
                    <path 
                      d="M1 1.5L6 6.5L11 1.5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className='data-[state=open]:stroke-white stroke-[#210736] data-[state=open]:rotate-90'
                    />
                  </svg>
                </div>
              </div>
            </Accordion.ItemTrigger>
            
            <Accordion.ItemContent className='overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp'>
              <Accordion.ItemBody className='font-normal text-[#210736] bg-white p-[16px] md:p-[32px] pt-0 rounded-b-[16px]'>
                {item.text}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <img src={DoubleCircle} className='absolute left-0 bottom-0' alt="" />
      <img src={DoubleSquare} className='absolute right-0 top-[50%]' alt="" />
      <img src={Mouse} className='absolute left-[30%] bottom-[-30px]' alt="" />
      <img src={DoubleTriangle} className='absolute right-[30%] bottom-[-80px] opacity-25 md:opacity-100' alt="" />
      <img src={Eclipse} className='absolute right-0 bottom-[40px]' alt="" />
      <img src={Eclipse} className='absolute left-0 bottom-[-150px]' alt="" />
      <img src={Eclipse} className='absolute left-0 top-[40%] opacity-50' alt="" />
    </div>    
  )
}

export default FAQ