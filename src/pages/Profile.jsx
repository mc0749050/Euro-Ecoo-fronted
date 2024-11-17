import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const Profile = () => {

  function isNumeric(str) {
    return !isNaN(str);
  }
  
  const { auth, userdata, setuserdata, fetchData } = useContext(AuthContext);
  const [isName, setisName] = useState(false);
  const [isEmail, setisEmail] = useState(false);
  const [isPhone, setisPhone] = useState(false);
  const [isAddress, setisAddress] = useState(false);

  useEffect(() => {
    if(userdata){
      setuserdata(userdata)
    }
  },[])
  // for db

  const [name, setname] = useState(null);
  const [phone, setphone] = useState(null);
  const [address, setaddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  // function for handle save details

  const submitName = async (e) => {
    e.preventDefault();
    if (name === "" || name === null || name === " ") {
      toast.error("Please enter name !");
    } else {
      try {
        const res = await axios.post(`https://euro-node-backend.onrender.com/change-name`, {
          name,
          email: auth.user.email,
        });

        if (res.status === 202) {
          toast.success(res.data.message);
          setisName(false);
          fetchData();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong, please try again.");
        }
      }
    }
  };

  const submitPhone = async (e) => {
    e.preventDefault();
    if (phone === " " || phone === null || phone === " ") {
      toast.error("Plesse enter phone no. !");
    }
    else if(!isNumeric(phone)) {
      toast.error('Enter valid Phone no. !')
    }
    else if ( 11 <= phone.length || phone.length < 10) {
      toast.error('Enter valid Phone no. !')
    } else {
      try {
        const res = await axios.post(`https://euro-node-backend.onrender.com/change-phone`, {
          phone,
          email: auth.user.email,
        });

        if (res.status === 202) {
          toast.success(res.data.message);
          setisPhone(false);
          fetchData();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong, please try again.");
        }
      }
    }
  };

  const submitAddress = async (e) => {
    e.preventDefault();

    if (
      address.street === " " ||
      address.city === " " ||
      address.state === "" ||
      address.country === "" ||
      address.zipcode === "" ||
      address.street === "" ||
      address.city === "" ||
      address.state === "" ||
      address.country === "" ||
      address.zipcode === "" ||
      address.street === null ||
      address.city === null ||
      address.state === null ||
      address.country === null ||
      address.zipcode === null
    ) {
      toast.error("Please enter valid address !");
    }
    else if(address.zipcode.length < 6) {
      toast.error('Enter valid zip code !')
    }
    
    else {
      try {
        const { street, city, state, country, zipcode } = address;
        const res = await axios.post(`https://euro-node-backend.onrender.com/change-address`, {
          street,
          city,
          state,
          country,
          zipcode,
          email: auth.user.email,
        });

        if (res.status === 202) {
          toast.success(res.data.message);
          setisAddress(false);
          fetchData();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong, please try again.");
        }
      }
    }
  };

  if (userdata === null) {
    return <Loader />;
  } else {
    return (
      <div className="dashboard w-[100vw] sm:w-auto h-[100vh] relative flex justify-center items-center">
        <div className="container sm:w-[30vw] h-[80vh] w-[90vw] border-2 shadow rounded-[20px] p-6">
          <div className="img w-[100px] sm:w-[150px] m-auto mt-8">
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"
              alt="img"
            />
          </div>
          <div className="data font-sans text-[20px] mt-16">
            <div className="flex justify-between items-center mt-4">
              <p className="font-[500] text-[18px] sm:text-[21px]">
                Name:
                <span className="inline font-[400] text-[15px] sm:text-[17px] px-2">
                  {userdata.name}
                </span>
              </p>
              <CiEdit
                onClick={() => {
                  setisName(true);
                  setisEmail(false);
                  setisPhone(false);
                  setisAddress(false);
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="font-[500] text-[18px] sm:text-[21px]">
                Email:
                <span className="inline font-[400] px-2 text-[15px] sm:text-[17px]">
                  {userdata.email}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="font-[500] text-[18px] sm:text-[21px]">
                Phone:{" "}
                <span className="inline font-[400] text-[15px] sm:text-[17px] px-2">
                  {userdata.address.phone === " " ? (
                    <span className="text-red-500">add phone no !</span>
                  ) : (
                    `${userdata.address.phone}`
                  )}
                </span>
              </p>
              <CiEdit
                onClick={() => {
                  setisName(false);
                  setisEmail(false);
                  setisPhone(true);
                  setisAddress(false);
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="font-[500] text-[18px] sm:text-[21px]">
                addres:{" "}
                <span className="inline font-[400] text-[15px] sm:text-[17px] px-2">
                  {userdata.address.phone === " " ? (
                    <span className="text-red-500">add address !</span>
                  ) : (
                    `${`${userdata.address.street}, ${userdata.address.city}, ${userdata.address.state}, ${userdata.address.country} `}`
                  )}
                </span>
              </p>
              <CiEdit
                onClick={() => {
                  setisName(false);
                  setisEmail(false);
                  setisPhone(false);
                  setisAddress(true);
                }}
              />
            </div>
          </div>

          {isName ? (
            <div className="edit-fields mt-8 sm:p-3 py-2 px-2 border-[1px] rounded">
              <div className="name flex justify-between items-center">
                <RxCross2
                  onClick={() => setisName(false)}
                  className="sm:text-[30px] text-[18px]"
                />
                <input
                  type="text"
                  className="sm:w-[60%] w-[70%]  sm:p-2 p-[4px] border-[2px] rounded border-gray-600"
                  name="name"
                  id="name"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter your name"
                />
                <button
                  onClick={submitName}
                  className="bg-orange-600 sm:px-4 px-[10px] py-2 rounded text-white text-[12px] sm:text-[15px] font-[500] "
                >
                  save
                </button>
              </div>
            </div>
          ) : null}
          {isPhone ? (
            <div className="edit-fields mt-8 sm:p-3 py-2 px-2 border-[1px] rounded">
              <div className="name flex justify-between items-center">
                <RxCross2
                  onClick={() => setisPhone(false)}
                  className="sm:text-[30px] text-[18px]"
                />
                <input
                  type="text"
                  className="sm:w-[60%] w-[70%]  sm:p-2 p-[4px] border-[2px] rounded border-gray-600"
                  name="name"
                  id="name"
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Enter your phone no."
                />
                <button
                  onClick={submitPhone}
                  className="bg-orange-600 sm:px-4 px-[10px] py-2 rounded text-white text-[12px] sm:text-[15px] font-[500] "
                >
                  Save
                </button>
              </div>
            </div>
          ) : null}

          {isAddress ? (
            <div className="edit-fields mt-8 absolute inset-0 flex items-center justify-center bg-white  border-[1px]">
              <div className="address sm:w-[28vw] w-[90vw] h-[80vh] border-[1px] shadow-xl border-black rounded-xl">
                <RxCross2
                  onClick={() => setisAddress(false)}
                  className="text-[30px] relative top-4 left-[88%]"
                />
                <div className="text-center">
                  <h1 className="font-[600] text-[30px] mt-4">Address</h1>
                </div>
                <form className="text-center">
                  <input
                    type="text"
                    className="w-[75%] mt-6 p-[8px] rounded border-[1px] border-gray-500"
                    onChange={(e) =>
                      setaddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="street"
                    id="name"
                    placeholder="Street"
                  />
                  <input
                    type="text"
                    className="w-[75%] mt-6 p-[8px] rounded border-[1px] border-gray-500"
                    onChange={(e) =>
                      setaddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="city"
                    id="name"
                    placeholder="city"
                  />
                  <input
                    type="text"
                    className="w-[75%] mt-6 p-[8px] rounded border-[1px] border-gray-500"
                    onChange={(e) =>
                      setaddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="state"
                    id="name"
                    placeholder="state"
                  />
                  <input
                    type="text"
                    className="w-[75%] mt-6 p-[8px] rounded border-[1px] border-gray-500"
                    onChange={(e) =>
                      setaddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="country"
                    id="name"
                    placeholder="country"
                  />
                  <input
                    type="text"
                    className="w-[75%] mt-6 p-[8px] rounded border-[1px] border-gray-500"
                    onChange={(e) =>
                      setaddress({
                        ...address,
                        [e.target.name]: e.target.value,
                      })
                    }
                    name="zipcode"
                    id="name"
                    placeholder="pin code"
                  />

                  <button
                    onClick={submitAddress}
                    className="w-[75%] mt-6 p-[10px] rounded bg-orange-600 font-[500] text-white"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
        <Toaster />
      </div>
    );
  }
};

export default Profile;
