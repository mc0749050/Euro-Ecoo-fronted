import React from 'react'
import loader from '../assets/loader.gif'

const Loader = () => {
  return (
    <div className="loader w-[100vw] h-[100vh] flex justify-center items-center">
        <img className='w-[100px]' src={loader} alt="Loading..." />
    </div>
  )
}

export default Loader