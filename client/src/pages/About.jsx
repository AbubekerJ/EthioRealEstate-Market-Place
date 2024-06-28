import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">About Us</h1>
          <p className="text-gray-400">Learn more about EthioRealEstate and our mission to help you find your dream home.</p>
        </div>
        <div className="flex flex-wrap justify-between mb-10">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Our Mission</h2>
            <p className="text-gray-400 mb-4">
              At EthioRealEstate, our mission is to connect you with the best properties for sale and rent in Ethiopia. We strive to provide a seamless
              and user-friendly platform to make your property search as easy and efficient as possible.
            </p>
            <p className="text-gray-400">
              Whether you are looking for a new home, an investment property, or a place to rent, we are here to help you find the perfect match. Our team
              is dedicated to offering exceptional customer service and valuable resources to guide you through every step of your real estate journey.
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <img src="https://unsplash.com/photos/white-bed-with-gray-and-white-bed-linen-nEtpvJjnPVo" alt="EthioRealEstate" className="rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-amber-400 mb-4 text-center">I am</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full sm:w-64">
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-center text-amber-400">Abubeker</h3>
              <p className="text-gray-400 text-center">CEO</p>
            </div>
           
          </div>
        </div>
        <div className="text-center">
          <Link to="/contact">
            <button className="bg-gradient-to-r from-amber-400 to-amber-900 hover:bg-amber-600 text-white text-lg font-semibold py-3 px-6 md:px-8 rounded-lg transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
