import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">EthioRealEstate</h2>
            <p className="text-gray-400">Discover the best properties for sale and rent in Ethiopia. Your dream home is just a click away.</p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:text-amber-500 transition duration-300">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-amber-500 transition duration-300">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/search" className="hover:text-amber-500 transition duration-300">Search Listings</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-amber-500 transition duration-300">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">Contact Info</h3>
            <ul>
              <li className="mb-2">
                <span className="text-gray-400">Address: Addis Ababa, Ethiopia</span>
              </li>
              <li className="mb-2">
                <span className="text-gray-400">Phone: +251 947366383</span>
              </li>
              <li className="mb-2">
                <span className="text-gray-400">Email: abubeker.jemal03@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" className="text-gray-400 hover:text-amber-500 transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.twitter.com" className="text-gray-400 hover:text-amber-500 transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" className="text-gray-400 hover:text-amber-500 transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com" className="text-gray-400 hover:text-amber-500 transition duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-10">
          &copy; {new Date().getFullYear()} EthioRealEstate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
