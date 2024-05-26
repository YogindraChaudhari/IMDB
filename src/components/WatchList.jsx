import React, { useEffect, useState } from 'react'
import genreids from '../utils/genre'

function WatchList({watchlist, setWatchList, handleRemoveFromWatchList }) {

  const [search, setSearch] = useState('')
  const [genreList, setGenreList] = useState(['All Genres'])
  const [currGenre, setCurrGenre] = useState('All Genres')

  let handleSearch = (e) => {
    setSearch(e.target.value)
  }

  let handleFilter = (genre) => {
    setCurrGenre(genre)
  }

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortedIncreasing])
  }

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortedDecreasing])
  }


  let sortPopHigh = () => {
    let highPop = watchlist.sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity
    })
    setWatchList([...highPop])
  }

  let sortPopLow = () => {
    let lowPop = watchlist.sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity
    })
    setWatchList([...lowPop])
  }

  useEffect(() => {
    let temp = watchlist.map((movieObj)=> {
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenreList(['All Genres', ...temp])
  }, [watchlist])
  

  return (
    <>

    <div className='flex justify-center flex-wrap m-5'>
      {genreList.map((genre) => {
        return <div onClick={() => handleFilter(genre)} className={ currGenre==genre ? 'bg-blue-400 p-5 mr-3 rounded-xl flex justify-center items-center h-[5vh] w-[10vh] text-white font-bold mx-4 hover:cursor-pointer' : 'bg-gray-400/80 p-5 mr-3 rounded-xl flex justify-center items-center h-[5vh] w-[10vh] text-white font-bold mx-4 hover:cursor-pointer'}>{genre}</div>
      })}
      {/* <div className='bg-gray-400/80 p-2 mr-3 rounded-xl flex justify-center items-center h-[5vh] w-[10vh] text-white font-bold'>Action</div> */}
    </div>

      <div className='flex justify-center my-4 '>
        <input onChange={handleSearch} value={search} type="text" placeholder='Search Movies'  className='h-[5vh] w-[50vh] bg-gray-100 outline-none p-4 m-5 rounded-xl font-bold text-xl cursor-pointer' />
      </div>

    <div className='overflow-hidden rounded-lg border border-gray-200 m-10'>
      <table className='w-full text-center'>
        <thead className='border-b-2'>
          <tr className=' text-blue-500 text-xl'>
            <th>
              Name
            </th>
            <th className='flex gap-3 justify-center p-2'>
              <div onClick={sortIncreasing}><i class="fa-solid fa-arrow-up"></i></div>
              <div>
                Ratings
              </div>
              <div onClick={sortDecreasing}><i class="fa-solid fa-arrow-down"></i></div>
            </th>
            <th>
              <div className='flex gap-3 justify-center'>
                <div onClick={sortPopHigh}><i class="fa-solid fa-arrow-up"></i></div>
                <div>Popularity</div>
                <div onClick={sortPopLow}><i class="fa-solid fa-arrow-down"></i></div>
              </div>
            </th>
            <th>
              Genre
            </th>
          </tr>
        </thead>
        <tbody>

          {watchlist.filter((movieObj) => {
            if(currGenre == 'All Genres'){
              return true
            }else{
              return genreids[movieObj.genre_ids[0]] == currGenre
            }
          }).filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
          }).map((movieObj) => {
            return <tr className='border-b-2 font-bold'>
            <td className='flex items-center px-6 py-4'>
              <img className='h-[20vh] w-[15vh]' src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} />
              <div  className='mx-12 '>{movieObj.title}</div>
            </td>
            <td>
              {movieObj.vote_average}
            </td>
            <td>
              {movieObj.popularity}
            </td>
            <td>
              {genreids[movieObj.genre_ids[0]]}
            </td>
            <td>
              <button onClick={() => handleRemoveFromWatchList(movieObj)} className='text-white bg-red-500 rounded-lg p-2'>Delete</button>
            </td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
    </>
  )
}

export default WatchList