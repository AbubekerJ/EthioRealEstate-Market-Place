import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { signInStart , signInFail, signInSuccess } from '../redux/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';


const SignIn= () => {
 
     const navigate = useNavigate()
     const dispatch = useDispatch()
      
     const [form , setForm]=useState({})
     const {error , loading} = useSelector((state)=>state.user)
     const handleChange = (e)=>{
         
       setForm({...form , [e.target.id]:e.target.value})
        console.log(form)
     }
     
     const handelSubmit = async (e)=>{
     e.preventDefault()
     
      
        dispatch(signInStart())
        const res = await fetch('http://localhost:3000/api/auth/signIn',{
          method :'POST',
          headers:{
           'Content-Type':'application/json'
          },
          body:JSON.stringify(form)
   
          })
          const data= await res.json()
          console.log(data)
          if(data.success===false){
            dispatch(signInFail(data.message))
            return;
          }
          dispatch(signInSuccess(data))
          navigate('/')
     

      
    
     }


  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-12'>
      <h1 className='font-semibold text-center text-4xl text-gray-800 mb-8'>Sign In</h1>
      
      <form className='flex flex-col gap-6' onSubmit={handelSubmit}>
       
        <input 
          type="email" 
          placeholder='Email' 
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800' 
          id='email'
           onChange={handleChange} 
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800' 
          id='password' 
          onChange={handleChange}
        />
        <button disabled={loading}
          className='border p-3 rounded-lg bg-gray-800 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out' >
          
          {loading?'Loading....':'Sign In'}
         
        </button>
      </form>
      <div className='flex mt-3 gap-1'>
        <p>Dont Have an Account?</p>
        <Link to='/signUp'>
            <span className='text-blue-800'>Sign up</span>
        </Link>
      </div>
      {error&&<span className='text-sm text-red-600 mt-3' >{error}</span>}
    </div>
  );
}

export default SignIn;
