import React from 'react'
import toast, { Toaster } from 'react-hot-toast';


const ResetPass = ({handleEmail, sendOtp}) => {
  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
    <div className="signup-container border-[1.5px] rounded-[10px] sm:w-[25vw] sm:h-[80vh] w-[90vw] h-[70vh] text-center font-sans" >
   <h1 className='font-bold text-[30px] mt-8'>Reset Password</h1>
   <div className="field-container mt-16 text-center">
     <form>
        <label htmlFor="email" className='font-[500]' >Enter your Email</label>
       <input className='w-[80%] p-2 border-2 mt-8 rounded-[5px]' onChange={handleEmail} id='email' type="text" name='reemail' />

        <button className='w-[80%] p-2 bg-orange-600 font-bold text-white border-2 mt-6 rounded-[5px] pointer hover:bg-orange-700' type='submit' onClick={sendOtp}>Send Otp</button>

     </form>
   </div>
 </div>
 <Toaster />

 </div>
  )
}

export default ResetPass