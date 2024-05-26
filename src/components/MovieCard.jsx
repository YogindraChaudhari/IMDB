import React from 'react'

function MovieCard({movieObj, poster_path, name, handleAddToWatchList, handleRemoveFromWatchList, watchlist}) {

  function doesContain(movieObj){
    for (let i = 0; i < watchlist.length; i++){
      if(watchlist[i].id == movieObj.id){
        return true
      }
    }
    return false
  }

  return (
   
    <div className='h-[45vh] w-[30vh] bg-cover bg-center rounded-2xl hover:scale-110 duration-300 hover:cursor-pointer mb-10' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`}}>



      <div className='text-white font-bold text-center text-xl w-full p-2 bg-gray-600/80 rounded-t-xl'>
      {name}
      </div>

      
      {doesContain(movieObj) 
      ? 
      (<div onClick={() => handleRemoveFromWatchList(movieObj)} 
      className='text-xl m-4 flex justify-center items-center h-8 w-8 bg-gray-900/80 rounded-3xl '> &#10060; </div>) 
      : 
      (<div onClick={() => {handleAddToWatchList(movieObj)}} 
      className='text-xl m-4 flex justify-center items-center h-8 w-8 bg-gray-900/80 rounded-3xl '> &#10133; </div>)}
    </div>
  
  )
}

export default MovieCard