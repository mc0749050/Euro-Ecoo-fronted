import React, { useEffect, useState } from 'react'
import img1 from '../assets/sliderimg1.jpg'
import img2 from '../assets/sliderimg2.jpg'
import img3 from '../assets/sliderimg3.jpg'
import img4 from '../assets/sliderimg4.jpg'


const Slider = () => {
    const Slides = [
        {url: img1},
        {url: img2},
        {url: img3},
        {url: img4}
    ]
    
    const [index, setindex] = useState(0);

const limit = Slides.length;

useEffect(() => {
    const interval = setInterval(() => {
        setindex((prevValue) => {
            return prevValue + 1 >= limit ? 0 : prevValue + 1;
        });
    }, 3500);

    return () => {
        clearInterval(interval);
    }
}, [])


  return (
        <div className={`flex justify-center items-center sm:m-14 flex-wrap  text-center relative w-[100vw] mb-14 sm:w-auto sm:h-[45vh] h-[28vh]`}>
        
        {
            Slides.map((item, idx) => ( <img key={idx} className={`sm:w-[80vw] sm:h-[45vh] rounded-[10px] shadow-xl w-[95vw] h-[26vh] mt-12  ${index === idx ? null : 'hidden'}`} src={item.url} alt='loading..'/>))
        }
       

            <div className="w-[100vw] absolute bottom-[-40px]">
                {
            Slides.map((item, idx) => (<button key={idx} onClick={() => setindex(idx)} className={`${index === idx ? 'text-black' : 'text-gray-600'} text-[50px] font-[900] text-center opacity-[0.4]`}>.</button>))

                }
            </div>
        
    </div>
  )
}

export default Slider