import Input from "../components/Inputs";
import plusImg from "../assets/double-plus.png";
import {BiEnvelope, BiPhoneCall} from "react-icons/bi";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#411366] pb-10 relative ">
      <div className="absolute right-[10%] top-2 z-[99] ">
        <img className="w-12 h-12 " src={plusImg} alt="plus" />
      </div>
      <div className="w-full max-w-[300px] max-md:hidden h-full bg-[#AD15B5] absolute right-0 "></div>
      <div className="left w-[90%] md:w-[50%] mx-auto text-white p-3 sm:p-12 ">
        <p className="text-2xl py-2">Nivra Gaming Site</p>
        <p className="text-sm">
          "Welcome to Nivra - where every level is a new adventure. Dive into
          your favorite games, unlock challenges, and rise through the ranks.
          Ready to play?"
        </p>
        <form action="">
          <Input type="text" placeholder="Contact name" />
          <Input type="text" placeholder="Contact number" />
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="Lets talk about your idea" />
          <button
            className="w-full h-10 rounded-sm mt-10 hover:bg-[#DA07E0]  bg-[#DA07E0]/80 "
            type="submit"
          >
            Submit
          </button>
        </form>
         <div className="footer text-sm flex flex-row items-center gap-20 px-5 mt-20 ">
            <div className="flex flex-row gap-1 items-center" >
                <BiPhoneCall className="text-2xl" />
                <div>
                    <p>Phone</p>
                    <p>111 111 111</p>
                </div>
            </div> 
            <div className="flex flex-row gap-1 items-center" >
                <BiEnvelope className='text-2xl text-white' />
                <div>
                    <p>Email</p>
                    <p>info@company.com</p>
                </div>
            </div>
        </div>
      </div>
     
      <div className="right md:w-[50%] max-md:h-[400px] p-3 flex justify-center sm:p-10 z-1 ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.963657726921!2d3.379205015153522!3d6.524379324528828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b43e7b99a7b%3A0x8e4e4da0b19f9b2c!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1697472263876!5m2!1sen!2sng"
          width="90%"
          height="80%"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
