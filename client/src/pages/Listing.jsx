import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';

import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from 'react-icons/fa';

SwiperCore.use(Navigation);

function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactLandLord, setContactLandLord] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/listing/myListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === 'false') {
          setLoading(false);
          setError(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/user/getLandlord/${listing.userRef}`);
        const data = await res.json();
        if (data.success === 'false') {
          setLoading(false);
          setError(error);
          return;
        }
        setLoading(false);
        setContactLandLord(data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    
    if (listing) {
      fetchLandlord(); // Call fetchLandlord only when listing is available
    } else {
      fetchData(); // Call fetchData initially to get listing data
    }
  }, [params.listingId, listing]);

  const handleContactClick = () => {
    setContact(true);
  };

  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen py-8">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={url}
                    alt="Listing Image"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-6 my-7  gap-4">
            <p className="text-3xl font-bold">
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className="flex items-center mt-4 gap-2 text-slate-400 text-sm">
              <FaMapMarkerAlt className="text-green-500" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="  bg-gradient-to-r from-amber-400 to-amber-900
                             max-w-[200px] text-white text-center p-2 rounded-md">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className=" bg-gradient-to-r from-amber-400 to-amber-900
                            w-full max-w-[200px] text-white text-center p-2 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-300">
              <span className="font-semibold text-gray-100">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-500 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={handleContactClick}
                className="  max-w-[500px] bg-gradient-to-r from-amber-400 to-amber-900 text-white rounded-lg uppercase hover:bg-amber-600 p-5"
              >
                Contact landlord
              </button>
            )}
            {contact && (
              <div className="bg-gray-700 text-white rounded-lg p-3 mt-4">
                <p className="text-lg font-semibold">Contact Information</p>
                <p>Email: {contactLandLord.email}</p>
                {/* Add more contact details if needed */}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
