import React, { useState } from "react";
import Signupbox from "../components/Signupbox";
import Otp from "../components/Otp";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [page, setpage] = useState(false);
  const [otpvalue, setotpvalue] = useState(null);
  const [otp, setotp] = useState(null);

  const [userinpvalue, setuserinpvalue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // for gatting input data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserinpvalue({
      ...userinpvalue,
      [name]: value,
    });
  };

  //for otp generate

  const otpGenreater = async () => {
    const otpvalue = Math.floor(100000 + Math.random() * 900000);
    return otpvalue;
  };

  // for verify user

  const verifyUserData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = userinpvalue;

    if (name === "" || email === "" || password === "" || cpassword === "") {
      toast.error("All fields are require !");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email !");
    } else if (password.length < 6) {
      toast.error("Choose strong password !");
    } else if (password !== cpassword) {
      toast.error("Conform password must be same !");
    } else {
      // check user already exits

      try {
        const { email } = userinpvalue;

        const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/check-user`, {
          email,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.success("otp is send to your email");
          setpage(true);

          const generatedOtp = await otpGenreater();
          setotp(generatedOtp.toString());
          try {
            const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/otp-email`, {
              otp: generatedOtp,
              email,
            });
          } catch (error) {
            console.error(error);
          }
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

  // get otp from input

  const handleOtp = (e) => {
    setotpvalue(e.target.value);
  };

  // for otp varification

  const otpVerification = async (e) => {
    e.preventDefault();

    if (otpvalue != otp) {
      toast.error("Please enter valid otp !");
    } else {
      try {
        const { name, email, password, address } = userinpvalue;
        const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/register`, {
          name,
          email,
          password,
        });

        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }

      setuserinpvalue({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      setotpvalue("");
    }
  };

  // for resend otp

  const resendOtp = async () => {
    const generatedOtp = await otpGenreater();
    setotp(generatedOtp.toString());
    try {
      const { email } = userinpvalue;
      const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/otp-email`, {
        otp: generatedOtp,
        email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {page ? (
        <Otp
          handleOtp={handleOtp}
          otpVerification={otpVerification}
          resendOtp={resendOtp}
        />
      ) : (
        <Signupbox
          handleChange={handleChange}
          verifyUserData={verifyUserData}
          userinpvalue={userinpvalue}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Signup;
