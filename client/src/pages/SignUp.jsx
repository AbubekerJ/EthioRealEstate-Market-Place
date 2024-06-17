import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import OAuth from '../componenets/OAuth';

const SignUp = () => {
     const [form , setForm]=useState({})
     const [loading , setLoading ]=useState(false)
     const [error, setError ]=useState(null)
     const navigate = useNavigate()
   
     const handleChange = (e)=>{
         
       setForm({...form , [e.target.id]:e.target.value})
        console.log(form)
     }
     
     const handleSubmit = async (e)=>{
     e.preventDefault()
     
      try {
        setLoading(true)
        const res = await fetch('http://localhost:3000/api/auth/signUp',{
          method :'POST',
          headers:{
           'Content-Type':'application/json'
          },
          body:JSON.stringify(form)
   
          })
          const data= await res.json()
          console.log(data)
          setLoading(false)
          setError(null)
          alert(data)
          navigate('/signIn')
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }

      
    
     }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-white mb-8">Sign Up</h1>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="border p-3 rounded-lg bg-gray-800 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            {loading ? 'Loading....' : 'Sign Up'}
          </button>
          <OAuth />
        </form>
        
        <div className="flex mt-3 gap-1">
          <p className="text-gray-300">Have an Account?</p>
          <Link to="/signIn">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
        {error && <span className="text-sm text-red-600 mt-3">{error}</span>}
      </div>
    </div>
  );
}

export default SignUp;
