import React from 'react'
import {Link} from 'react-router-dom'

const Signupbox = ({handleChange, verifyUserData, userinpvalue}) => {

  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
    <div className="signup-container border-[1.5px] rounded-[10px] sm:w-[25vw] sm:h-[80vh] w-[90vw] h-[80vh] text-center font-sans" >
   <h1 className='font-bold text-[30px] mt-4'>Signup</h1>
   <p className='mt-4 font-[500] text-orange-600'>EURO</p>

   <div className="field-container mt-8">
     <form>
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' type="text" name='name' value={userinpvalue.name} onChange={handleChange} placeholder='Enter your Name' />
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' type="text" name='email' value={userinpvalue.email} onChange={handleChange} placeholder='Enter your Email' />
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' type="password" name='password' value={userinpvalue.password} onChange={handleChange} placeholder='Enter your Password' />
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' type="password" name='cpassword' value={userinpvalue.cpassword} onChange={handleChange} placeholder='Conform your Password' />

       <button onClick={verifyUserData} className='w-[80%] p-2 bg-orange-600 font-bold text-white border-2 mt-4 rounded-[5px] pointer hover:bg-orange-700' type='submit'>Signup</button>
     </form>
     <p className="mt-4 text-[15px]">Already have an account ? <Link className='text-blue-700 underline font-[500]' to='/login'>Login</Link></p>
   </div>
 </div>
 
 </div>
  )
}

export default Signupbox