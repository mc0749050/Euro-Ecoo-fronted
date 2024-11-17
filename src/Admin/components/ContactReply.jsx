import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "../../components/Loader2";
import toast, { Toaster } from "react-hot-toast";
import Loader from '../../components/Loader';
import buttonLoader from '../../assets/buttonLoader.gif'


const ContactReply = () => {
    const [formuser, setformuser] = useState();
    const {id} = useParams();
    const [sendmessage, setsendmessage] = useState();
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const fetchUserData = async () => {
        try {
          const res = await axios.post(`https://euro-node-backend.onrender.com/getuserformdata`, {id});
          if (res && res.data) {
            setformuser(res.data.userformdata);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchUserData();
      }, []);

      // api call for send message

      const sendReply = async (e) => {

        e.preventDefault();

        if (!sendmessage || sendmessage === '') {
            toast.error('Text message is required');
        } else {
            try {
              setloading(true);
                const res = await axios.post(`https://euro-node-backend.onrender.com/sendReplyContactform`, {email:formuser.email, sendmessage})

                if(res.status === 201) {
                  setloading(false);
                    toast.success(res.data.message)
                    setsendmessage('')
                    navigate('/admin/receivedmessages')
                }
                else{
                  setloading(false);
                    toast.error(res.data.message)
                }
            } catch (error) {
                console.log(error);
                
            }   
        }
      }
    


  return (
    <div>
        {
            !formuser ? (<Loader />) : (<div className='main w-full h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat ' style={{backgroundImage:"url('https://png.pngtree.com/background/20220723/original/pngtree-background-biru-keren-dan-kosong-abstract-untuk-template-desain-powerpoint-ppt-picture-image_1738466.jpg')"}}>
                <div className="w-[80%] sm:w-[30%] shadow-xl h-[75%] p-8">
                <h1 className='text-[18px] font-[500] mt-4'>Reply to: <span className="text-[15x] font-normal">{formuser.name}</span></h1>
                <p className='text-[18px] font-[500] mt-4'>Email: <span className="text-[15x] font-normal">{formuser.email}</span></p>
                <p className='text-[18px] font-[500] mt-4'>Title:  <span className="text-[15x] font-normal">{formuser.title}</span></p>
                <p className='text-[18px] font-[500] mt-4'>Problem:  <span className="text-[15x] font-normal">{formuser.message}</span></p>
                <form>
                    <div className="mt-6">
                        <label htmlFor="replymessage" className='font-[600] text-[18px]'>Reply to {formuser.name}</label><br />
                        <textarea value={sendmessage} onChange={(e) => setsendmessage(e.target.value)} className='mt-6' rows={6} cols={40} name="replymessage" id='replymessage' placeholder='Enter your message !'></textarea><br />
                      <button onClick={sendReply} className={`w-[100%] ${!loading ? 'bg-orange-600 py-2 px-12' : null} flex justify-center items-center  font-[500] text-white mt-6`}>{loading ? <img className='w-24' src={buttonLoader} alt='Loading...' /> : 'Send'}</button>
                    </div>
                </form>
                </div>
                <Toaster />
            </div>) 
        }
        
    </div>
  )
  
}

export default ContactReply