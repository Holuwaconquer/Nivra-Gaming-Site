import Avatar1 from "../assets/avatars/Avatar1.png";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="flex items-center gap-6 mb-12">
        <div className="relative group">
          <div
            className="w-20 h-20 rounded-full bg-[#D932FE] flex items-center justify-center cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center overflow-hidden">
              <img
                src={Avatar1}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-purple-900 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap cursor-pointer"
            onClick={handleProfileClick}
          >
            <span className="text-white text-xs font-semibold">
              View Profile
            </span>
          </div>
        </div>

        <div>
          <h1
            className="text-2xl font-bold text-transparent bg-clip-text bg-[#FF00B2]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            SPYRO GEE
          </h1>
        </div>
      </div>
    </>
  );
}
