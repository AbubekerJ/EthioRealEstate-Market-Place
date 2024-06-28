import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const getSearchFromUrl = urlParams.get('searchTerm');
    if (getSearchFromUrl) {
      setSearchTerm(getSearchFromUrl);
    }
  }, [window.location.search]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-row items-center justify-between mx-auto p-4 max-w-7xl">
        <Link to="/">
          <h1 className="flex items-center font-bold text-lg sm:text-2xl p-5">
            <span className="text-amber-400 border-2 border-x-amber-400 border-y-amber-500 px-2 py-1 rounded-md transition duration-300">
              Ethio
            </span>
            <span className="text-white border-white border-2 px-2 py-1 rounded-md ml-2 transition duration-300">
              RealEstate
            </span>
          </h1>
        </Link>
        {/* Search Form */}
        <div className="hidden sm:flex flex-grow items-center justify-end sm:flex-grow-0 sm:w-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 flex items-center p-2 shadow-inner rounded-lg focus-within:ring-2 focus-within:ring-amber-500 transition duration-300 w-full sm:w-auto"
          >
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none flex-grow sm:flex-grow-0 text-white placeholder-gray-400 transition duration-300 w-full sm:w-64"
              type="text"
              placeholder="Search..."
              value={searchTerm}
            />
            <button className="ml-2">
              <FaSearch className="text-white" />
            </button>
          </form>
        </div>
        {/* Hamburger Icon for Small Screens */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
        {/* Navigation Links */}
        <ul className={`sm:flex sm:gap-5 text-white items-center ${isMenuOpen ? 'flex flex-col gap-3 sm:flex-row justify-between bg-black bg-opacity-60 border-b-2 absolute top-full left-0 right-0 p-6 rounded-b-lg shadow-lg' : 'hidden'}`}>
          <Link to="/">
            <li className="sm:inline bg-gray-800 border-2 border-x-amber-400 border-y-amber-500 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-amber-500 hover:text-gray-900 transition duration-300">
              Home
            </li>
          </Link>
          <Link to="/About">
            <li className="sm:inline bg-gray-800 border-2 border-x-amber-400 border-y-amber-500 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-amber-500 hover:text-gray-900 transition duration-300">
              About
            </li>
          </Link>
          <Link to="/Profile">
            {currentUser ? (
              <img
                className="h-10 w-10 rounded-full border-2 border-amber-500 object-cover"
                src={currentUser?.avatar ||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} 
                alt="Profile"
              />
            ) : (
              <li className="sm:inline bg-gray-800 border-2 border-amber-400 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-amber-500 hover:text-gray-900 transition duration-300">
                Sign In
              </li>
            )}
          </Link>
          {/* Mobile Search Form */}
          {isMenuOpen && (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800 flex items-center p-2 shadow-inner rounded-lg focus-within:ring-2 focus-within:ring-amber-500 transition duration-300 w-full"
            >
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent focus:outline-none flex-grow text-white placeholder-gray-400 transition duration-300"
                type="text"
                placeholder="Search..."
                value={searchTerm}
              />
              <button className="ml-2">
                <FaSearch className="text-white" />
              </button>
            </form>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
