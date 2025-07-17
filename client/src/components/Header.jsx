import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuRef]);

  const logoutHandler = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600 font-semibold bg-blue-50"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="w-[90%] max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-[#2563EB]">
                SmartResume
              </Link>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {userInfo ? (
                  <>
                    <NavLink to="/analyze" className={navLinkClass}>
                      Analyze
                    </NavLink>
                    <NavLink to="/customize" className={navLinkClass}>
                      Customize
                    </NavLink>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right side of Navbar */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {userInfo ? (
                // -- NEW: Profile Dropdown --
                <div className="ml-3 relative" ref={profileMenuRef}>
                  <div>
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="max-w-xs bg-slate-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* User Avatar Initial */}
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </div>
                    </button>
                  </div>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Links for LOGGED OUT users
                <div className="flex items-center space-x-2">
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                  <Link
                    to="/register"
                    className="bg-[#2563EB] text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu Button (for mobile) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200">
          {userInfo ? (
            <>
              <Link
                to="/analyze"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:bg-slate-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Analyze
              </Link>
              <Link
                to="/customize"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:bg-slate-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Customize
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:bg-slate-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="w-full text-left text-red-600 hover:bg-red-50 block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:bg-slate-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:bg-slate-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
