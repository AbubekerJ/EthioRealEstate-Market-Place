import React, { useState ,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase';
import {getStorage , ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null)
  const [file , setFile]=useState(undefined)
  const [formData , setFormData]=useState({})
  const [errorUpload , setErrorUpload]=useState(false)  
  const [uploadProgress , setUploadProgress]=useState(0)

  console.log(file)
  console.log(formData)

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
  
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-2xl mt-10">
        <h1 className="font-bold text-center text-4xl text-white mb-6">Profile</h1>
        <form className="flex flex-col items-center">
          <div className="relative mb-6">

            <input onChange={(e)=>setFile(e.target.files[0])} 
            type="file" 
             ref={fileRef}
             hidden  
             accept='image/*'/>
            
            <img
              className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-gray-800 shadow-md"
              src={currentUser.avatar}
              alt="Profile"
              onClick={()=>fileRef.current.click()}
              
            />
            <button    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600">
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
          {errorUpload?<span className='text-red-600'>Error while uploading</span>:
          uploadProgress>0&&uploadProgress<100?<span >Uploading Image {uploadProgress} %</span>:
          uploadProgress===100?<span className='text-green-600'>upload completd</span>:''
          }
          <div className="w-full mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Username"
              value={currentUser.username} // Ensure this is connected to your state
              readOnly
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="Email"
              value={currentUser.email} // Ensure this is connected to your state
              readOnly
            />
          </div>
          <div className="w-full mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password" // Ensure to handle password field properly for security
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Update Profile
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Delete Account
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
