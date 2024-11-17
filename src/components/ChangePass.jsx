import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ChangePass = ({changePassword, handlereset, resendOtp}) => {
  return (
    <div className="w-[100vw] h-[90vh] flex justify-center items-center">
    <div className="signup-container border-[1.5px] rounded-[10px] sm:w-[25vw] sm:h-[80vh] w-[90vw] h-[80vh] text-center font-sans" >
   <h1 className='font-bold text-[30px] mt-6'>Reset Password</h1>
   <div className="field-container mt-8 text-center">
     <form>
        <label htmlFor="userotp" className='font-[500]' >Enter Otp</label> <br />
       <input className='w-[80%] p-2 border-2 mt-8 rounded-[5px]' onChange={handlereset} id='userotp' type="text" name='userotp' />
<br />
       <label htmlFor="newpass" className='font-[500]' >Enter New Password</label>
       <input className='w-[80%] p-2 border-2 mt-8 rounded-[5px]' onChange={handlereset} id='newpass' type="text" name='newpass' />
<br />
       <label htmlFor="cpass" className='font-[500]' >Enter Conform Password</label>
       <input className='w-[80%] p-2 border-2 mt-8 rounded-[5px]' onChange={handlereset} id='cpass' type="text" name='cpass' />

        <button className='w-[80%] p-2 bg-orange-600 font-bold text-white border-2 mt-6 rounded-[5px] pointer hover:bg-orange-700' type='submit' onClick={changePassword}>Conform</button>

     </form>
     <p className="mt-2 text-[15px]">Not receved any otp ?<button className='underline text-blue-600' onClick={resendOtp}>resend</button></p>
   </div>
 </div>
 <Toaster />

 </div>
  )
}

export default ChangePass