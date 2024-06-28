import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../componenets/ListingCard';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('https://ethio-realestate.onrender.com/api/listing/searchListing?offer=true&limit=6');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchRentListings = async () => {
      try {
        const res = await fetch('https://ethio-realestate.onrender.com/api/listing/searchListing?type=rent&limit=6');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('https://ethio-realestate.onrender.com/api/listing/searchListing?type=sale&limit=6');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
   <>
      {/* Hero Section */}
      <div className="relative bg-gray-800 h-screen flex items-start">
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
    <div className="mx-auto px-6 sm:px-10 lg:px-16 w-full text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fadeIn text-left">
        <span className="block">Find Your Dream</span>
        <span className="block">Home with</span>
        <span className="text-amber-400 block">EthioRealEstate</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 animate-fadeIn delay-500 text-left">
        Discover the best properties for sale and rent in Ethiopia.
      </p>
      <Link to="/search">
        <button className="bg-gradient-to-r from-amber-400 to-amber-900 hover:bg-amber-600 text-white text-base sm:text-lg md:text-xl font-semibold py-3 px-6 md:px-8 rounded-lg transition duration-300 animate-fadeIn delay-1000">
          Explore Listings
        </button>
      </Link>
    </div>
  </div>
</div>


      {/* Swiper Section */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  height: '600px',
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing Results Sections */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      {offerListings && offerListings.length > 0 && (
  <div className="p-6">
    <div className="my-3 flex flex-col gap-2 items-center">
      <h2 className="text-3xl font-semibold text-amber-400">Recent offers</h2>
      <Link className="text-sm text-amber-400 hover:text-amber-600 transition duration-300" to="/search?type=rent">
        Show more offers
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {offerListings.map((listing) => (
        <div key={listing._id} className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-white  transition-shadow duration-300">
            <ListingCard listing={listing} />
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{rentListings && rentListings.length > 0 && (
  <div className="p-6">
    <div className="my-3 flex flex-col gap-2 items-center">
      <h2 className="text-3xl font-semibold text-amber-400">Recent places for Rent</h2>
      <Link className="text-sm text-amber-400 hover:text-amber-600 transition duration-300" to="/search?type=rent">
        Show more places for Rent
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {rentListings.map((listing) => (
        <div key={listing._id} className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-white  transition-shadow duration-300">
            <ListingCard listing={listing} />
          </div>
        </div>
      ))}
    </div>
  </div>
)}




{saleListings && saleListings.length > 0 && (
  <div className="p-6">
    <div className="my-3 flex flex-col gap-2 items-center">
      <h2 className="text-3xl font-semibold text-amber-400">Recent places for Sale</h2>
      <Link className="text-sm text-amber-400 hover:text-amber-600 transition duration-300" to="/search?type=rent">
        Show more places for sale
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {saleListings.map((listing) => (
        <div key={listing._id} className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-white  transition-shadow duration-300">
            <ListingCard listing={listing} />
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      </div>
      </>
  );
}
