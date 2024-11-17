import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader2 from "../../components/Loader2";
import { IoNotificationsOff } from "react-icons/io5";

const Notifications = () => {
  const [formData, setformData] = useState();
  const navigate = useNavigate();

  const handleReply = (id) => {
    navigate(`/contactReply/${id}`)
  }
  const fetchFormData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_LIVE_URL}/contectNotifications`);
      if (res && res.data) {
        setformData(res.data.contactForms);

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  
      // for delete contact form

      const deleteForm = async (email) => {
        try {
          const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/delete-contactform`, {email});
    
          if(res.status === 201 && res.data.success){
            toast.success(res.data.message)
            window.location.reload();
          }
          else{
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error);
          
        }
      } 


      return (
        <>
          {!formData ? (
            <Loader2 />
          ) : formData.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              <div>
              <IoNotificationsOff className="text-[25px] m-auto mb-2" />
              <p className="text-[20px] font-[500]">No Notifications yet</p>
              </div>
            </div>
          ) : (
            <div className="w-[100%] h-[100%] p-[50px] justify-center flex flex-wrap overflow-auto">
              {formData.reverse().map((item) => (
                <div key={item.email} className="flex sm:w-[80%] w-[100%]  h-[13%] rounded shadow justify-between px-8 items-center bg-stone-100 my-[20px]">
                  <div>
                    <p className="text-[13px] ">Name</p>
                    <h2 className="font-[600] sm:text-[20px]  text-[10px]">{item.name}</h2>
                  </div>
                  <div>
                    <p  className="text-[13px] px-2">Title</p>
                    <h3 className="font-[500] sm:text-[18px] px-2 text-[10px]">{item.title}</h3>
                  </div>
                  <div>
                    <p  className="text-[13px] px-2">Email</p>
                    <h5 className="font-[500] text-[10px] px-2 sm:text-[16px]">{item.email}</h5>
                  </div> 
                  <div className="flex justify-evenly h-[50%]">
                    <button onClick={() => deleteForm(item.email)} className=" text-[12px] bg-amber-700 font-[500] text-white px-2 h-[90%] sm:px-4 sm:py-2 mx-2">Delete</button>
                    <div className="mx-2">
                      <button onClick={() => handleReply(item._id)} disabled={item.isreplyed} className=" text-[12px] bg-amber-900 font-[500] text-white px-2 py-2 sm:px-4 sm:py-2">Reply</button>
                      {item.isreplyed && <p className="text-[8px] text-red-500">Replied already!</p>}
                    </div>
                  </div>
                </div>
              ))}
              <Toaster />
            </div>
          )}
        </>
      );
};

export default Notifications;
