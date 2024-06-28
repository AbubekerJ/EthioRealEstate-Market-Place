import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInFail, signInSuccess } from '../redux/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import OAouth from '../componenets/OAuth';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
       
    const res = await fetch('http://localhost:3000/api/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include', 
    });
    const data = await res.json();
    console.log(data);
    if (data.success === 'false') {
      dispatch(signInFail(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    } catch (error) {
      dispatch(signInFail(error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-white mb-8">Sign In</h1>
        
        <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="border p-3 rounded-lg bg-gray-800 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out"
            >
          
            {loading ? 'Loading....' : 'Sign In'}
          </button>
          <OAouth />
        </form>
        
        <div className="flex mt-3 gap-1">
          <p className="text-gray-300">Don't Have an Account?</p>
          <Link to="/signUp">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
        {error && <span className="text-sm text-red-600 mt-3">{error}</span>}
      </div>
    </div>
  );
};

export default SignIn;
