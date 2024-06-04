import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg p-8 mt-12'>
      <h1 className='font-semibold text-center text-4xl text-gray-800 mb-8'>Sign Up</h1>
      
      <form className='flex flex-col gap-6'>
        <input 
          type="text" 
          placeholder='Username' 
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800' 
          id='userName' 
        />
        <input 
          type="email" 
          placeholder='Email' 
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800' 
          id='email' 
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800' 
          id='password' 
        />
        <button 
          className='border p-3 rounded-lg bg-gray-800 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out'>
          Sign Up
        </button>
      </form>
      <div className='flex mt-3 gap-1'>
        <p>Have an Account?</p>
        <Link to='/signIn'>
            <span className='text-blue-800'>Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
