import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';


SwiperCore.use(Navigation)

function Listing() {
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [error , setError]=useState(false)
  console.log(listing)

  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      try {
        const res = await fetch(`http://localhost:3000/api/listing/myListing/${params.listingId}`)
        const data = await res.json()
        console.log(data)
        if (data.success ==='false'){
         
          setError(data.message)
          return;

        }
        setListing(data)
      } catch (error) {
        
        setError(error)
      }
    }
    fetchData()
  }, [params.listingId])

  return (
    <div>

      {error&& error}

      {listing && !error&& 
       <Swiper navigation>
        {listing.imageUrls.map((url)=>(
            <SwiperSlide key={listing._id}>
               <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
            </SwiperSlide>
        ))}
        
        </Swiper>}
    </div>
  )
}

export default Listing
