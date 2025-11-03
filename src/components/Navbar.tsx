import { useState, useEffect } from "react";
import NivraLogo from "../assets/nivra-logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking on overlay or pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const hamburgerButton = document.querySelector('[aria-label="Toggle menu"]');
      
      if (mobileMenu && !mobileMenu.contains(e.target as Node) && 
          hamburgerButton && !hamburgerButton.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `cursor-pointer text-[16px] transition font-semibold ${
      isActive
        ? "text-[#FF00B2] text-[16px] font-semibold"
        : "hover:text-[#FF00B2] text-white"
    }`;

  const playNowClass = ({ isActive }: { isActive: boolean }) =>
    `cursor-pointer text-[16px] transition font-semibold ${
      isActive
        ? "text-[16px] font-semibold bg-[#0982FE] py-[12px] px-[32px]"
        : "hover:bg-[#0982FE] border border-[#FF00B2] py-[12px] px-[32px] text-white"
    }`;

  return (
    <div
      className="w-full bg-[#210736d6] flex items-center justify-between py-[15px] md:py-[30px] px-[24px] md:px-[48px] z-50 sticky top-0 left-0"
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Logo */}
      <div>
        <img src={NivraLogo} alt="nivra-logo" className="w-32 md:w-auto" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        <NavLink className={navLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={navLinkClass} to="/services">
          Services
        </NavLink>
        <NavLink className={navLinkClass} to="/about-us">
          About Us
        </NavLink>
        <NavLink className={navLinkClass} to="/contact">
          Contact Us
        </NavLink>
        <NavLink className={playNowClass} to="auth/sign-up">
          Play Now
        </NavLink>
      </div>

      {/* Hamburger Button for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transform transition duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transform transition duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-screen w-64 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "#4C1D95",
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b border-[#FF00B2] bg-[#4C1D95]">
          <button
            onClick={closeMenu}
            className="text-white text-3xl hover:text-[#FF00B2] transition focus:outline-none w-8 h-8 flex items-center justify-center"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Mobile Menu Content - Simple flex column */}
        <div className="flex flex-col h-[calc(100vh-73px)] bg-[#4C1D95]">
          {/* Menu Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-4">
              <NavLink
                className={({ isActive }) =>
                  `text-lg py-3 px-4 w-full text-left rounded transition font-semibold block ${
                    isActive
                      ? "text-[#FF00B2] bg-purple-800"
                      : "text-white hover:bg-purple-700 hover:text-[#FF00B2]"
                  }`
                }
                to="/"
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-lg py-3 px-4 w-full text-left rounded transition font-semibold block ${
                    isActive
                      ? "text-[#FF00B2] bg-purple-800"
                      : "text-white hover:bg-purple-700 hover:text-[#FF00B2]"
                  }`
                }
                to="/services"
                onClick={closeMenu}
              >
                Services
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-lg py-3 px-4 w-full text-left rounded transition font-semibold block ${
                    isActive
                      ? "text-[#FF00B2] bg-purple-800"
                      : "text-white hover:bg-purple-700 hover:text-[#FF00B2]"
                  }`
                }
                to="/about-us"
                onClick={closeMenu}
              >
                About Us
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `text-lg py-3 px-4 w-full text-left rounded transition font-semibold block ${
                    isActive
                      ? "text-[#FF00B2] bg-purple-800"
                      : "text-white hover:bg-purple-700 hover:text-[#FF00B2]"
                  }`
                }
                to="/contact"
                onClick={closeMenu}
              >
                Contact Us
              </NavLink>
            </nav>
          </div>

          {/* Play Now Button - Fixed at bottom */}
          <div className="p-6 border-t border-[#FF00B2] bg-[#4C1D95] mt-auto">
            <NavLink
              className={({ isActive }) =>
                `block text-center text-lg w-full py-3 px-4 rounded transition font-semibold ${
                  isActive
                    ? "bg-[#0982FE] text-white"
                    : "border border-[#FF00B2] text-white hover:bg-[#0982FE] hover:border-[#0982FE]"
                }`
              }
              to="auth/sign-up"
              onClick={closeMenu}
            >
              Play Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;