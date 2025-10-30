import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Code, Menu, Home, Users, Crown, UserPlus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const UserNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      } border-b border-gray-600`}
    >
      <div className="container max-w-screen mx-auto px-3 py-3 relative overflow-x-hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Code className="h-8 w-8 text-pink-500 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              DevMatch
            </span>
          </div>

          {/* Desktop Nav - CENTERED */}
          <div className="hidden md:flex gap-16 text-base absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/feed"
              className="flex flex-col items-center text-white hover:text-pink-400"
            >
              <Home size={20} />
              Home
            </Link>
            <Link
              to="/requests"
              className="flex flex-col items-center text-white hover:text-pink-400"
            >
              <UserPlus size={20} />
              Requests
            </Link>
            <Link
              to="/connections"
              className="flex flex-col items-center text-white hover:text-pink-400"
            >
              <Users size={20} />
              Connections
            </Link>
          </div>

          {/* Profile Dropdown - DESKTOP */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <div
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoUrl} alt="User" />
              </div>
            </div>

            {isDropdownOpen && (
              <div className="fixed inset-0 z-40 flex items-start justify-end mt-16 mr-2 bg-black/40">
                <div
                  className="bg-gray-800 rounded-lg shadow-lg w-50 p-2 text-white relative"
                  ref={dropdownRef}
                >
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                  <ul className="space-y-2 mt-6">
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-700 rounded"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col w-full bg-gray-800 rounded-md text-white shadow-lg mt-2 px-2 py-2 z-40">
            <Link
              to="/feed"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-ghost justify-start text-left"
            >
              Home
            </Link>
            <Link
              to="/requests"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-ghost justify-start text-left"
            >
              Requests
            </Link>
            <Link
              to="/connections"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-ghost justify-start text-left"
            >
              Connections
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-ghost justify-start text-left"
            >
              Profile
            </Link>
            <Link
              to="/upgrade"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 text-white w-full text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Premium</span>
              <Crown className="w-4 h-4 text-yellow-400" />
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="btn btn-ghost justify-start text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserNavBar;
