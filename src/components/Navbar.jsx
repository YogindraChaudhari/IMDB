import React from 'react'
import Logo from '../MovieLogo.jpg'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex border space-x-9 items-center pl-4 py-4'>
        {/* <img className='w-[50px] object-fill' src={Logo} alt="Logo" /> */}
        <p className='text-black-500 text-3xl font-bold'>IMDB 🎬</p>
        <Link to ='/'className='text-blue-500 text-3xl font-bold' >MOVIES</Link>
        <Link to ='/watchlist' className='text-red-500 text-3xl font-bold'>WATCHLIST</Link>
    </div>
  )
}

export default Navbar
