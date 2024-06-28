import React, { useState ,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase';
import {getStorage , ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {updateFail , updateStart , updateSuccess, deleteFail , deleteStart , deleteSuccess , signOutFail , signOutStart  ,signOutSuccess} from '../redux/user/user.slice'
import { useDispatch } from 'react-redux';
import { useNavigate ,Link} from 'react-router-dom';

function Profile() {
  const { currentUser , error , loading} = useSelector((state) => state.user);
  
  const fileRef = useRef(null)
  const [file , setFile]=useState(undefined)
  const [formData , setFormData]=useState({})
  const [errorUpload , setErrorUpload]=useState(false)  
  const [uploadProgress , setUploadProgress]=useState(0)
  const dispath = useDispatch()
  const [showListing , setShowListing] = useState([])
  const [listingError ,setListingError]=useState(null)
  const [listingLoading ,setListingLoading]=useState(false)


 


useEffect(()=>{
  if(file){handleFileSubmit(file)}
},[file])

const handleFileSubmit = (file)=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime()+ file.name
  const storageRef = ref(storage, fileName);
  const UploadTask=  uploadBytesResumable(storageRef, file);
  UploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setUploadProgress(Math.round(progress))
    },
    (error) => {
      setErrorUpload(true)
    },
    async () => {
      const downloadURL = await getDownloadURL(UploadTask.snapshot.ref);
     setFormData({...formData , avatar:downloadURL})
     
      // You can now use this URL to update the user's profile picture in your database
    }
  );
  
  }

  const handleChange=(e)=>{
    setFormData({...formData , [e.target.id]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    try {
      dispath(updateStart())
      e.preventDefault()
      const res =await fetch(`https://ethio-realestate.onrender.com/api/user/update/${currentUser._id}`, {
        method :'POST' , 
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
        credentials: 'include', 
        
      })
      const data = await res.json()
      if (data.success==='false'){
       
        dispath(updateFail(data.message))
        return;
        
      }
      dispath(updateSuccess(data))
      setShowListing(data)

    } catch (error) {
      dispath(updateFail(error.message))
    }
}


const handleDeletUser = async()=>{
  try {
      dispath(deleteStart())
    const res = await fetch('https://ethio-realestate.onrender.com/api/user/delete/'+currentUser._id,{
      method:'DELETE', 
      headers:{'Content-Type':'application/json'},
     
      credentials: 'include', 
        
    })
    const data = res.json()
    if (data.success==='false'){
      dispath(deleteFail(data.message))
      return;
    }
    dispath(deleteSuccess())
  } catch (error) {
    dispath(deleteFail(error.message)) }
}
const handleSignOut =async ()=>{
  try {
     dispath(signOutStart())
    const res =await fetch('https://ethio-realestate.onrender.com/api/auth/signout',{
      credentials: 'include', 
    })
    const data =  res.json()
    
    if (data.success==='false'){
      dispath(signOutFail(data.message))
      return;

    }
    dispath(signOutSuccess())
    
  } catch (error) {
    dispath(signOutFail(error.message))
  }
}
const handleShowLiting = async () => {
  setListingLoading(true);
  setListingError(null);
  try {
    const res = await fetch(`https://ethio-realestate.onrender.com/api/listing/showListing/${currentUser._id}`, { credentials: 'include' });
    const data = await res.json();
    console.log(data.success);
    if (data.success === false) {
      console.log(data);
      setListingError(data.message);
       return;
     
    } else {
      setShowListing(data);
      console.log(data);
    }
  } catch (error) {
    setListingError('error showing listing');
  } finally {
    setListingLoading(false);
  }
};

  const handleDeleteListing = async(id)=>{
    try {
      const res =await fetch(`https://ethio-realestate.onrender.com/api/listing/deleteListing/${id}` ,{
        method: 'DELETE',  
        credentials: 'include', 
      })
      const data = await res.json()
      if(data.success!=='false'){
        console.log(data.message)
      }
     
      setShowListing((prev) => prev.filter((x) => x._id !== id));

    } catch (error) {
      
    }
    
      
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6 ">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-2xl mt-10">
        <h1 className="font-bold text-center text-4xl text-white mb-6">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="relative mb-6">

            <input onChange={(e)=>setFile(e.target.files[0])} 
            type="file" 
             ref={fileRef}
             hidden  
             accept='image/*'/>
            
            <img
              className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-gray-800 shadow-md"
              src={formData.avatar||currentUser.avatar ||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
              alt="Profile"
              onClick={()=>fileRef.current.click()}
              
            />
            <button    className="absolute bottom-0 right-0  bg-gradient-to-r from-amber-400 to-amber-900 text-white rounded-full p-2 shadow-md hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M16.5 7.5L7 17l-3 1 1-3L16.5 7.5z"
                />
              </svg>
            
            </button>
          </div>
          {errorUpload?<span className='text-red-400'>Image Should Be Less Than 2mb</span>:
          uploadProgress>0&&uploadProgress<100?<span >Uploading Image {uploadProgress} %</span>:
          uploadProgress===100?<span className='text-green-400'>upload completed</span>:''
          }
          <div className="w-full mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
             onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Username"
              defaultValue={currentUser.username} // Ensure this is connected to your state
              
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
            onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              defaultValue={currentUser.email} // Ensure this is connected to your state
              
            />
          </div>
          <div className="w-full mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password" // Ensure to handle password field properly for security
            />
             <button 
              className=" bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 w-full mt-2 uppercase  rounded ">
                <span>{loading?'Updating...':'Update Information'}</span>
              </button>
                <div className='   text-center  bg-gradient-to-r from-amber-400 to-amber-900 hover:bg-amber-500 text-white font-bold py-4 w-full mt-2 uppercase  rounded  '>
                <Link  to={'/CreateListing'}>
               Create Listing
                 </Link>
                </div>
             
          </div>
          
          <span className='text-red-500 text-sm'>{error?error:''}</span>
        </form>
        <div className="flex items-center justify-between mt-1">
          <button onClick={handleDeletUser}
          
            className="  text-red-600 font-bold  "
            type="button"
          >
            Delete Account
          </button>

          <button
          onClick={handleSignOut}
            className="  text-gray-500 font-bold  "
            type="button"
          >
            Sign Out
          </button>

        </div>
        <div className='items-center justify-center text-center'>
          <button className='uppercase text-lg text-amber-100 hover:text-blue-200'onClick={handleShowLiting}>
            {listingLoading? 'loading...':'Show listing'}
          </button>
      
          <div className='flex flex-col items-center'>
          <span className='text-red-400 text-sm'>{listingError&&listingError}</span> 
           { showListing&& showListing.length>0 &&  showListing.map((listing) => (
            
            <div className='flex items-center justify-between gap-4 my-2 w-full max-w-md' key={listing._id}>
              <div className='flex items-center gap-2'>
                <img className='w-20 h-20' src={listing.imageUrls[0]} alt="this is the image" />
                <Link to={`/listing/${listing._id}`}>
                <span  className=''>{listing.name}</span></Link>
                
              </div>
             
              <div className='flex flex-col items-center'>
                
                <span onClick={()=>handleDeleteListing(listing._id)} className='text-red-400 uppercase cursor-pointer'>delete </span>

                <Link to={`/update-Listing/${listing._id}`}>
                 <span  className='text-green-400 uppercase cursor-pointer'>edit</span>
                 </Link>
              </div>
     
        </div>
          ))}
        </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
