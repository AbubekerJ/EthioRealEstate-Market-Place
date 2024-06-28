import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingCard from '../componenets/ListingCard';

export default function Search() {
  const [queryData, setQueryData] = useState({
    searchTerm: '',
    type: 'all',
    parking: true,
    furnished: false,
    sort: 'createdAt',
    order: 'desc',
    offer: false
  });

  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    const furnishedFromUrl = urlParams.get('furnished');

    if (searchTermFromUrl || typeFromUrl || parkingFromUrl || offerFromUrl || sortFromUrl || orderFromUrl || furnishedFromUrl) {
      setQueryData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true',
        furnished: furnishedFromUrl === 'true',
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
        offer: offerFromUrl === 'true'
      });
    }

    const fetchQueryUrl = async () => {
      const theQuery = urlParams.toString();
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:3000/api/listing/searchListing?${theQuery}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
        } else {
          setListings(data);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Error fetching listings');
        setLoading(false);
      }
    };

    fetchQueryUrl();
  }, [window.location.search]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === 'all' || id === 'sell' || id === 'rent') {
      setQueryData({
        ...queryData,
        type: id
      });
    } else if (id === 'searchTerm') {
      setQueryData({
        ...queryData,
        searchTerm: value
      });
    } else if (id === 'parking' || id === 'offer' || id === 'furnished') {
      setQueryData({
        ...queryData,
        [id]: type === 'checkbox' ? checked : value
      });
    } else if (id === 'sort_order') {
      setQueryData({
        ...queryData,
        sort: value.split('_')[0] || 'createdAt',
        order: value.split('_')[1] || 'desc'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', queryData.searchTerm);
    urlParams.set('type', queryData.type);
    urlParams.set('parking', queryData.parking);
    urlParams.set('offer', queryData.offer);
    urlParams.set('furnished', queryData.furnished);
    urlParams.set('sort', queryData.sort);
    urlParams.set('order', queryData.order);

    const queryParams = urlParams.toString();
    navigate(`/search?${queryParams}`);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
                className='border rounded-lg p-3 w-full bg-gray-700 text-gray-100'
              value={queryData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={queryData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={queryData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sell'
                className='w-5'
                onChange={handleChange}
                checked={queryData.type === 'sell'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={queryData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={queryData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5 '
                onChange={handleChange}
                checked={queryData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue='createdAt_desc'
              id='sort_order'
              className='border rounded-lg p-3 bg-gray-700 text-gray-100'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-gradient-to-r from-amber-400 to-amber-900 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search Listing
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && <p className='text-xl text-slate-700'>No listing found!</p>}
          {loading && <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>}
          {!loading && listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
  
}

