import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';
import { useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CreateListing = () => {
  const [files , setFiles] = useState([])
  const [imageUploadError ,setImageUploadError] = useState(null)
  const [imageUploadLoadng , setImageUploadLoading] =useState(false)
  const [submitError , setSubmitError]=useState(null)
  const [submitLoading , setSubmitLoading] = useState(false)
  const {currentUser}=useSelector(state=>state.user)
  const [createSuccess , setCreateSuccess]=useState(null)
  const navigate = useNavigate()
  const [formData , setFormData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    regularPrice:1,
    discountPrice:0,
    bathrooms:1,
    bedrooms:1,
    furnished:false,
    parking:false,
    offer:false ,
    type:'sale',
    userRef: currentUser._id


  })
 
 const handleChange =(e)=> {
  if(e.target.id==='sale'||e.target.id==='rent'){
    setFormData({
      ...formData , 
       type:e.target.id
    })}
    if (e.target.id ==='parking'||e.target.id==='offer'||e.target.id==='furnished'){
       setFormData({
        ...formData,
         [e.target.id] : e.target.checked
        
       })}
       if(e.target.type ==='text'||e.target.type==='number'||e.target.type==='textarea'){
            setFormData({
              ...formData, 
               [e.target.id]:e.target.value
            })
       }

 }

  const uploadedImage=async(file)=>{
    return new Promise((resolve , reject)=>{
     const storage = getStorage(app);
     const fileName = new Date().getTime()+file.name
     const storageRef = ref(storage , fileName)
     const UploadTask = uploadBytesResumable(storageRef , file)
     UploadTask.on(
       'state_changed',
       (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    
       },
       (error)=>{
        setImageUploadError('Error Uploading image. Image Must be less than 2mb ')
        setImageUploadLoading(false)
      },
        
       async()=>{ 
        const downloadURL = await getDownloadURL(UploadTask.snapshot.ref , )
        resolve(downloadURL)
      })})}

      
  const handleImageUpload = ()=>{
    setImageUploadError(null)
    setImageUploadLoading(true)
    if(files.length>0 &&(formData.imageUrls.length + files.length) <= 6){
      
      
      const Promises=[];
      for(let i=0; i<files.length; i++){
        Promises.push(uploadedImage(files[i]))
      }
      Promise.all(Promises).then((url)=>{
          setFormData({
            ...formData , 
            imageUrls:formData.imageUrls.concat(url)
          }
            
          )
          setImageUploadLoading(false)
          setFiles(null)
      })
    }
    else{
      setImageUploadError('Image must be less than 6')
      setImageUploadLoading(false)
    }  
  }

const handleImageDelete =(deleteindex)=>{
   setFormData({
    ...formData , 
     imageUrls:formData.imageUrls.filter((_, index)=> index!==deleteindex)
   })
}

const handleSubmit = async(e)=>{
  setSubmitError(null)
  e.preventDefault();
  if (formData.imageUrls.length<1) return setSubmitError('You need to upload atleast 1 image')
  try {
     setSubmitLoading(true)
    const res = await fetch ('http://localhost:3000/api/listing/createlisting',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData)
     
    })
    const data = await res.json()
    if(data.success==='false'){
      setSubmitError('Error Submiting the form '+data.messaage)
      setSubmitLoading(false)
    }
    setSubmitLoading(false)
    setCreateSuccess('Listing Created Successfully')
    
    

    
  } catch (error) {
    setSubmitError('Error submiting the form '+error)
     setSubmitLoading(false)
  }

}


return (
  <main className='p-3 max-w-4xl mx-auto rounded-lg shadow-lg m-10'>
    <h1 className='text-3xl font-semibold text-center my-7 text-gray-200'>
      Create a Listing
    </h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col gap-4 flex-1'>
        <input
          type='text'
          placeholder='Name'
          className='p-3 rounded-lg bg-gray-700 text-gray-200'
          id='name'
          maxLength='62'
          minLength='10'
          required
          onChange={handleChange}
          value={formData.name}
        />
        <textarea
          placeholder='Description'
          className='p-3 rounded-lg bg-gray-700 text-gray-200'
          id='description'
          required
          onChange={handleChange}
        ></textarea>
        <input
          type='text'
          placeholder='Address'
          className='p-3 rounded-lg bg-gray-700 text-gray-200'
          id='address'
          required
          onChange={handleChange}
        />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='sale'
              className='w-5 h-5'
              onChange={handleChange}
              checked={formData.type === 'sale'}
            />
            <span className='text-gray-200'>Sell</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='rent'
              className='w-5 h-5'
              onChange={handleChange}
              checked={formData.type === 'rent'}
            />
            <span className='text-gray-200'>Rent</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='parking'
              className='w-5 h-5'
              onChange={handleChange}
              checked={formData.parking}
            />
            <span className='text-gray-200'>Parking spot</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='furnished'
              className='w-5 h-5'
              onChange={handleChange}
              checked={formData.furnished}
            />
            <span className='text-gray-200'>Furnished</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='offer'
              className='w-5 h-5'
              onChange={handleChange}
              checked={formData.offer}
            />
            <span className='text-gray-200'>Offer</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='bedrooms'
              min='1'
              max='10'
              required
              className='p-3 rounded-lg bg-gray-700 text-gray-200'
              onChange={handleChange}
              value={formData.bedrooms}
            />
            <p className='text-gray-200'>Beds</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='bathrooms'
              min='1'
              max='10'
              required
              className='p-3 rounded-lg bg-gray-700 text-gray-200'
              onChange={handleChange}
              value={formData.bathrooms}
            />
            <p className='text-gray-200'>Baths</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='regularPrice'
              min='50'
              max='10000000'
              required
              className='p-3 rounded-lg bg-gray-700 text-gray-200'
              onChange={handleChange}
              value={formData.regularPrice}
            />
            <div className='flex flex-col items-center'>
              
              <p className='text-gray-200'>Regular price</p>
              {formData.type==='rent'&&<span className='text-xs text-gray-400'>(ETB / month)</span>}
              
            </div>
          </div>
        {formData.offer&&  <div className='flex items-center gap-2'>
            <input
              type='number'
              id='discountPrice'
              min='0'
              max='10000000'
              required
              className='p-3 rounded-lg bg-gray-700 text-gray-200'
              onChange={handleChange}
              value={formData.discountPrice}
            />
            <div className='flex flex-col items-center'>
              <p className='text-gray-200'>Discounted price</p>
              {formData.type==='rent'&&<span className='text-xs text-gray-400'>(ETB/ month)</span>}
            </div>
          </div>}
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold text-gray-200'>
          Images:
          <span className='font-normal text-gray-400 ml-2'>
            The first image will be the cover (max 6)
          </span>
        </p>
        <div className='flex gap-4'>
          <input
            onChange={(e) => setFiles(e.target.files)}
            className='p-3 rounded w-full bg-gray-700 text-gray-200'
            type='file'
            id='images'
            accept='image/*'
            multiple
          />
          <button
            disabled={imageUploadLoadng}
            onClick={handleImageUpload}
            type='button'
            className='p-3 text-white rounded-lg uppercase hover:shadow-lg bg-gradient-to-r from-amber-400 to-amber-900'
          >
            {imageUploadLoadng ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <p className='text-red-500 text-sm'>
          {imageUploadError && imageUploadError}
        </p>
        {formData.imageUrls&&
          formData.imageUrls.map((url, index) => (
            <div className='flex justify-between items-center' key={url}>
              <img className='h-16 w-16' src={url} alt='listing image' />
              <p
                onClick={() => handleImageDelete(index)}
                className='text-red-500 uppercase cursor-pointer hover:opacity-75'
              >
                delete
              </p>
            </div>
          ))}
        <button
          disabled={imageUploadLoadng}
          type='submit'
          className='p-3 text-white rounded-lg uppercase hover:shadow-lg  bg-gradient-to-r from-amber-400 to-amber-900'
        >
         {submitLoading?'Creating...':'Create Listing'} 
        </button>

        <p className='text-red-500 text-sm text-center'>
           {submitError?submitError:''}
        </p>
        <p className='text-green-400  text-lg text-center'>
           {createSuccess?createSuccess:''}
        </p>
      </div>
    </form>
  </main>
);

};

export default CreateListing;
