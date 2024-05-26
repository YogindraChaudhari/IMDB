import React from 'react'

function Banner() {
  return (
    <div className='h-[20vh] md:h-[70vh] bg-cover bg-center flex items-end' style={{backgroundImage: `url(https://149512919.v2.pressablecdn.com/wp-content/uploads/2021/12/philly-movies-hero-banner.jpg)`}}>
        <div className='text-yellow-400 text-xl bg-gray-800/80 p-5 w-full text-center font-bold'>
            ⭐TOP RATED MOVIES AND SHOWS⭐
        </div>
    </div>
  )
}

export default Banner