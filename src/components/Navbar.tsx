import { useState, useEffect, useRef } from "react";
import NivraLogo from "../assets/nivra-logo.png";
import { NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact Us", to: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key + outside click + body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-semibold transition-colors duration-200 ${
      isActive ? "text-[#FF00B2]" : "text-white hover:text-[#FF00B2]"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block text-base font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
      isActive
        ? "text-[#FF00B2] bg-white/10"
        : "text-white hover:text-[#FF00B2] hover:bg-white/10"
    }`;

  return (
    <>
      <nav
        className="w-full sticky top-0 left-0 z-50 flex items-center justify-between py-4 md:py-[26px] px-6 md:px-12"
        style={{
          backgroundColor: "#210736d6",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,0,178,0.12)",
        }}
      >
        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <img src={NivraLogo} alt="Nivra" className="h-8 md:h-10 w-auto" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} className={desktopLinkClass} to={to}>
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/auth/sign-up"
            className={({ isActive }) =>
              `text-[15px] font-semibold py-3 px-7 border transition-all duration-200 ${
                isActive
                  ? "bg-[#0982FE] border-[#0982FE] text-white"
                  : "border-[#FF00B2] text-white hover:bg-[#0982FE] hover:border-[#0982FE]"
              }`
            }
          >
            Play Now
          </NavLink>
        </div>

        {/* Hamburger Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className="block w-6 h-[2px] bg-white origin-center transition-all duration-300"
            style={{
              transform: isMenuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-6 h-[2px] bg-white transition-all duration-300"
            style={{ opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? "scaleX(0)" : "scaleX(1)" }}
          />
          <span
            className="block w-6 h-[2px] bg-white origin-center transition-all duration-300"
            style={{
              transform: isMenuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.65)",
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-in Panel */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-screen w-72 z-50 md:hidden flex flex-col"
        style={{
          backgroundColor: "#2D0A4E",
          borderLeft: "1px solid rgba(255,0,178,0.2)",
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-hidden={!isMenuOpen}
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,0,178,0.15)" }}
        >
          <img src={NivraLogo} alt="Nivra" className="h-7 w-auto" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white hover:text-[#FF00B2] transition-colors w-8 h-8 flex items-center justify-center text-2xl leading-none focus:outline-none"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} className={mobileLinkClass} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Play Now CTA */}
        <div
          className="px-5 py-5"
          style={{ borderTop: "1px solid rgba(255,0,178,0.15)" }}
        >
          <NavLink
            to="/auth/sign-up"
            className={({ isActive }) =>
              `block text-center text-base font-semibold py-3 px-4 w-full transition-all duration-200 ${
                isActive
                  ? "bg-[#0982FE] text-white"
                  : "border border-[#FF00B2] text-white hover:bg-[#0982FE] hover:border-[#0982FE]"
              }`
            }
          >
            Play Now
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;