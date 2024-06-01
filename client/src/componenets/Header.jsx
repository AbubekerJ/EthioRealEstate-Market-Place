import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-orange-200  ' >
        <div className='flex items-center justify-between mx-auto max-w-6xl p-2'>
        <Link to='/'>  <h1 className='flex flex-wrap font-bold text-sm sm:text-xl p-5 '>
      <span className='text-amber-700 text-bold '>Ethio</span>
      <span className='text-slate-800'>RealState</span>
    </h1></Link>
      
     <form className='bg-amber-100 flex p-2 shadow-md rounded-xl items-center'  >
        <input className='  bg-transparent focus:outline-none w-24  sm:w-52' type="text" placeholder='Search...' />
        <FaSearch/>
     </form>
     <ul className='flex gap-7 text-slate-900 '>
           <Link to='/'>
           <li className='hidden sm:inline hover:underline'>
          Home 
        </li></Link>
        
         <Link to='About'> <li className='hidden sm:inline hover:underline'>
          About
        </li></Link>
       
           <Link to = '/SignIn'>
        <li className='hidden sm:inline hover:underline'>
          SignIn
        </li>
        </Link>

     </ul>
        </div>
     
    </header>
  )
}

export default Header
