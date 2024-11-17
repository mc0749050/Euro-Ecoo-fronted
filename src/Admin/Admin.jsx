import React, { useEffect, useState } from 'react'
import { Outlet, Link } from "react-router-dom";
const Admin = () => {
  const [isactive, setactive] = useState(1);
  return (
    <div className='w-full font-sans flex-block sm:flex'>
      <div className="menu text-6 bg-teal-950 text-white sm:h-screen flex sm:grid  sm:w-[20%] h-[11vh]">
        <div className="flex sm:flex-block sm:flex-wrap sm:overflow-hidden sm:text-[25px] sm:justify-none sm:h-[40vh] sm:mt-8 whitespace-nowrap space-x-4 w-[90%] p-4 overflow-x-auto justify-evenly text-[14px] items-center">
            <Link onClick={() => setactive(1)} className={`my-2 ${isactive === 1 ? 'font-medium text-orange-500' : null}`} to='allProducts'>All Products</Link>
            <Link onClick={() => setactive(2)} className={`my-2 ${isactive === 2 ? 'font-medium text-orange-500' : null}`} to='addProduct'>Add Item</Link>
            <Link onClick={() => setactive(3)} className={`my-2 ${isactive === 3 ? 'font-medium text-orange-500' : null}`} to='receivedmessages'>Notifications</Link>
            <Link onClick={() => setactive(4)} className={`my-2 ${isactive === 4 ? 'font-medium text-orange-500' : null}`} to='sendmessages'>Send message</Link> 
        </div>
      </div>
      <main className="container h-screen sm:w-[80%]">
        <Outlet />
      </main>
    </div>  
  )
}

export default Admin