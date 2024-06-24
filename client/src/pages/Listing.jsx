import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Listing() {
  const params = useParams()
  const [listing, setListing] = useState(null)
  console.log(listing)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/listing/myListing/${params.listingId}`)
        const data = await res.json()
        console.log(data)
        if (data.success ==='false'){
          console.log(data.message)
          return;

        }
        setListing(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [params.listingId])

  return (
    <div>
      {listing && 
       <img src={listing.imageUrls[0]} alt="" /> }
    </div>
  )
}

export default Listing
