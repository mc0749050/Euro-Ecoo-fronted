import React from 'react'
import loader from '../assets/loader2.mp4'

const Loader2 = () => {
  return (
    <div className="loader w-[100%] h-[100%] flex justify-center items-center">
        {/* <img className='w-[100px]' src={loader} alt="Loading..." /> */}

        <video className='w-[300px]' src={loader} muted loop autoPlay>Loading...</video>
    </div>
  )
}

export default Loader2