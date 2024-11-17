import toast, { Toaster } from 'react-hot-toast';
import {Link} from 'react-router-dom'
import React from 'react'

const Loginbox = ({submitLogin, userinpvalue, handleChange, setpage }) => {
  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
    <div className="signup-container border-[1.5px] rounded-[10px] sm:w-[25vw] sm:h-[80vh] w-[90vw] h-[70vh] text-center font-sans" >
   <h1 className='font-bold text-[30px] mt-8'>Login</h1>
   <p className='mt-4 font-[500] text-orange-600'>EURO</p>

   <div className="field-container mt-20">
     <form onSubmit={submitLogin}>
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' value={userinpvalue.email} onChange={handleChange} type="text" name='email' placeholder='Enter your Email' />
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' value={userinpvalue.password} onChange={handleChange}  type="password" name='password' placeholder='Enter your Password' />

       <button className='w-[80%] p-2 bg-orange-600 font-bold text-white border-2 mt-4 rounded-[5px] pointer hover:bg-orange-700' type='submit'>Login</button>
     </form>
     <p className="mt-2 text-[14px]">Forgot password ? <Link onClick={() => setpage('email')} className='text-blue-700 underline font-[500]' >reset</Link></p>
     <p className="mt-2 text-[14px]">Create your account ? <Link className='text-blue-700 underline font-[500]' to='/signup'>Signup</Link></p>
   </div>
 </div>
 <Toaster />
 
 </div>
  )
}

export default Loginbox