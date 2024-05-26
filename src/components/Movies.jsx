import React from 'react'
import MovieCard from './MovieCard'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Pagination from './Pagination'


function Movies({handleAddToWatchList, handleRemoveFromWatchList, watchlist}) {

  const [movies, setMovies] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const handlePrevious = () => {
    if(pageNo == 1){
      setPageNo(1)
    }else{
    setPageNo(pageNo - 1)
    }
  }

  const handleNext = () => {
    setPageNo(pageNo + 1)
  }

  useEffect(() => {
    const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNo}`)
    .then(function(res){
      setMovies(res.data.results)
      console.log(res.data.results)
    })
  }, [pageNo])

  return (
    <div className='p-5'>
        <div className='text-2xl m-5 font-bold text-center'>
            TRENDING MOVIES
        </div>

        <div className='flex flex-row flex-wrap justify-around gap-12'>
            
            {movies.map((movieObj) => {
              return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddToWatchList={handleAddToWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist}/>
            })}
            
        </div>
        <Pagination pageNo={pageNo} handleNext={handleNext} handlePrevious={handlePrevious} />
    </div>

  )
}

export default Movies

// 