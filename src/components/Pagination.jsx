import React from 'react'

function Pagination({handlePrevious, handleNext, pageNo}) {
  return (
    <div className='bg-gray-400 p-4 m-8 flex justify-center'>
        <div onClick={handlePrevious} className='px-8 text-xl'>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
            <div className='font-bold text-xl'>{pageNo}</div>
        <div onClick={handleNext} className='px-8 text-xl'>
            <i class="fa-solid fa-arrow-right"></i>
        </div>
    </div>
  )
}

export default Pagination