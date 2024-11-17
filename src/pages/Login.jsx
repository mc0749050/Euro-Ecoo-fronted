import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loginbox from "../components/Loginbox";
import ResetPass from "../components/ResetPass";
import ChangePass from "../components/ChangePass";

const Login = () => {
  // for otp genrate

  const otpGenreater = () => {
    const otpvalue = Math.floor(100000 + Math.random() * 900000);
    return otpvalue;
  };

  const navigate = useNavigate();
  const [page, setpage] = useState("login");
  const { auth, setauth, loading, setloading } = useContext(AuthContext);
  const [userinpvalue, setuserinpvalue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserinpvalue({
      ...userinpvalue,
      [name]: value,
    });
  };

  // login api

  const submitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userinpvalue;

    if (email === "" || password === "") {
      toast.error("all fields are required");
    } else {
      try {
        const { email, password } = userinpvalue;
        const res = await axios.post(`https://euro-node-backend.onrender.com/login`, {
          email,
          password,
        });

        if (res.data.success) {
          
          toast.success(res.data.message);
          await setauth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          

          localStorage.setItem("auth", JSON.stringify(res.data));

          setTimeout(() => {
            navigate("/");
          }, 2000);
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

  // for forgot password
  const [reemail, setreemail] = useState("");
  const [reotp, setreotp] = useState("");
  const handleEmail = (e) => {
    setreemail(e.target.value);
  };

  // sendOtp

  const sendOtp = async (e) => {
    e.preventDefault();

    if (reemail === "") {
      toast.error("Please enter email !");
    } else {
      try {
        const generatedOtp = otpGenreater();
        setreotp(generatedOtp);

        const res = await axios.post(
          `https://euro-node-backend.onrender.com/check-email-send-otp`,
          {
            reemail,
            reotp: generatedOtp,
          }
        );

        if (res.status === 201) {
          toast.success(res.data.message);

          setTimeout(() => {
            setpage("reset");
          }, 2000);
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

  // handle handlereset

  const [userresetdata, setuserresetdata] = useState({
    userotp: "",
    newpass: "",
    cpass: "",
  });
  const handlereset = (e) => {
    const { name, value } = e.target;

    setuserresetdata({
      ...userresetdata,
      [name]: value,
    });
  };
  // change password
  const changePassword = async (e) => {
    e.preventDefault();

    const { userotp, newpass, cpass } = userresetdata;

    if (userotp === "" || newpass === "" || cpass === "") {
      return toast.error("All fields are required !");
    } else if (newpass !== cpass) {
      toast.error("both password must be same !");
    } else {
      try {
        const res = await axios.post(`https://euro-node-backend.onrender.com/reset-pass`, {
          userotp,
          newpass,
          reotp,
          reemail,
        });

        if (res.data.status === 201 || res.data.success) {
          toast.success(res.data.message);

          setTimeout(() => {
            navigate("/");
          }, 2000);
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

  const resendOtp = async () => {


    try {
      const generatedOtp = otpGenreater();
      setreotp(generatedOtp);

      const res = await axios.post(
        `https://euro-node-backend.onrender.com/check-email-send-otp`,
        {
          reemail,
          reotp: generatedOtp,
        }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
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
  };

  if (page === "login") {
    return (
      <>
        <Loginbox
          submitLogin={submitLogin}
          userinpvalue={userinpvalue}
          handleChange={handleChange}
          setpage={setpage}
        />
      </>
    );
  } else if (page === "email") {
    return (
      <>
        <ResetPass handleEmail={handleEmail} sendOtp={sendOtp} />
      </>
    );
  } else if (page === "reset") {
    return (
      <>
        <ChangePass
          changePassword={changePassword}
          handlereset={handlereset}
          resendOtp={resendOtp}
        />
      </>
    );
  }
};

export default Login;
