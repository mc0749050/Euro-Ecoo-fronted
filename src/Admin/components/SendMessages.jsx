import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import buttonLoader from "../../assets/buttonLoader.gif";
const SendMessages = () => {
  const [htmlMessage, setHtmlMessage] = useState();
  const [loading, setloading] = useState(false);
  // send message || call api

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!htmlMessage || htmlMessage === "") {
      toast.error("Enter message !");
    } else {
      try {
        setloading(true);
        const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/sendEmailFromAdmin`, { htmlMessage });

        if (res.status === 201 && res.data.success) {
          setloading(false);
          toast.success(res.data.message);
          setHtmlMessage("");
        } else {
          setloading(false);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2noNTN-GtWoiZHKGcLzsoKVdQayyZZ-0usOCbekM48EmRKmjtJ16eBpdxsXo1_7Z2xNA&usqp=CAU')",
      }}
    >
      <div className="sm:w-[30%]  sm:h-[75%]  w-[90%] h-[80%]   shadow-xl flex justify-center items-center text-center">
        <form>
          <h1 className="font-[500] text-[22px] mb-8">
            Send Message to All users !
          </h1>
          <textarea
            className="w-[100%]"
            value={htmlMessage}
            onChange={(e) => setHtmlMessage(e.target.value)}
            cols={40}
            rows={7}
            placeholder="Enter message"
          ></textarea>{" "}
          <br />
          <button
            onClick={sendEmail}
            className={`w-[100%] mt-8 ${
              !loading ? "py-2 bg-orange-600 shadow" : null
            } py-2 font-[500] text-white flex justify-center items-center text-center`}
          >
            {loading ? (
              <img
                className="relative w-24"
                src={buttonLoader}
                alt="Loading.."
              />
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default SendMessages;
