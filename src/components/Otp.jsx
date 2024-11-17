import React from 'react'

const Otp = ({handleOtp, otpVerification, resendOtp}) => {
  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
    <div className="signup-container border-[1.5px] rounded-[10px] sm:w-[25vw] sm:h-[80vh] w-[90vw] h-[70vh] text-center font-sans" >
   <h1 className='font-bold text-[30px] mt-8'>OTP Verification</h1>
   <p className='mt-12 w-[70%] ml-[15%]'>otp is send to your email address, please cheack your email.</p>

   <div className="field-container mt-16">
     <form>
        <label htmlFor="otp" className='font-[500]' >Enter your OTP</label>
       <input className='w-[80%] p-2 border-2 mt-4 rounded-[5px]' onChange={handleOtp} id='otp' type="text" name='inputotp' />

       <button className='w-[80%] p-2 bg-orange-600 font-bold text-white border-2 mt-4 rounded-[5px] pointer hover:bg-orange-700' type='submit' onClick={otpVerification}>Signup</button>
     </form>
     <p className="mt-4 text-[15px]">Not receved any otp ?<button className='underline text-blue-600' onClick={resendOtp}>resend</button></p>
   </div>
 </div>
 </div>
  )
}

export default Otp