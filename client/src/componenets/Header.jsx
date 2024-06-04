import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-gray-800 shadow-md'>
    <div className='flex items-center justify-between mx-auto max-w-6xl p-4'>
      <Link to='/'>
        <h1 className='flex flex-wrap font-bold text-lg sm:text-2xl p-5'>
          <span className='text-amber-500 text-bold'>Ethio</span>
          <span className='text-white'>RealState</span>
        </h1>
      </Link>

      <form className='bg-gray-700 flex p-2 shadow-inner rounded-lg items-center'>
        <input 
          className='bg-transparent focus:outline-none w-24 sm:w-52 text-white placeholder-gray-400' 
          type="text" 
          placeholder='Search...' 
        />
        <FaSearch className='text-white ml-2'/>
      </form>

      <ul className='flex gap-7 text-white'>
        <Link to='/'>
          <li className='hidden sm:inline hover:underline transition duration-200'>
            Home
          </li>
        </Link>

        <Link to='/About'>
          <li className='hidden sm:inline hover:underline transition duration-200'>
            About
          </li>
        </Link>

        <Link to='/SignIn'>
          <li className='hidden sm:inline hover:underline transition duration-200'>
            Sign In
          </li>
        </Link>
      </ul>
    </div>
  </header>
  )
}

export default Header
