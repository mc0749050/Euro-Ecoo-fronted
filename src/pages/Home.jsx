import React, { useContext, useEffect } from 'react'
import Slider from '../components/Slider'
import { AuthContext } from '../context/authContext';
import Products from '../components/Products';

const Home = () => {

const {userdata, setuserdata, auth} = useContext(AuthContext);



  return (
    <div className="home w-[100vw]">
        <div className="image-slider">
            <Slider />
            <Products />
        </div>
    </div>
  )
}

export default Home