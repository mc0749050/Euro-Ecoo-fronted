import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.gif";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import { CgMenuLeft } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { TbDeviceMobileUp } from "react-icons/tb";
import { IoMdContacts } from "react-icons/io";
import { SiSimplelogin } from "react-icons/si";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const [active, setactive] = useState("home");
  const { auth, setauth, userdata } = useContext(AuthContext);
  const [sidenav, setsidenav] = useState(false);

  useEffect(() => {
    if (auth.user) {
      setactive("home");
    }
  }, [auth]);

  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      {/* Navbar for pc */}
      <div className="hidden sm:flex w-full h-[9vh] shadow">
      <div className="hidden sm:flex navbar w-[90vw] ml-[5vw] h-[9vh] justify-between items-center sans text-[16px]">
        <div className="left h-[80%] w-[40%]">
          <img className="h-[100%] cursor-pointer" src={logo} alt="EURO" />
        </div>
        <div className="h-[100%] right flex justify-center items-center w-[60%]">
          <ul className="w-[70%] flex justify-evenly mx-8">
            <Link
              onClick={() => setactive("home")}
              className={
                active === "home"
                  ? "font-bold border-b-2 border-orange-600"
                  : null
              }
              to="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setactive("app")}
              className={`hover:text-orange-800 hover:font-bold ${
                active === "app"
                  ? "font-bold border-b-2 border-orange-600"
                  : null
              }`}
              to="/"
            >
              Mobile App
            </Link>
            <Link
              onClick={() => setactive("contact")}
              className={
                active === "contact"
                  ? "font-bold border-b-2 border-orange-600"
                  : null
              }
              to="/contact"
            >
              Contact
            </Link>

            {!auth.user ? (
              <Link
                onClick={() => setactive("login")}
                className={
                  active === "login"
                    ? "font-bold border-b-2 border-orange-600"
                    : null
                }
                to="/login"
              >
                Login
              </Link>
            ) : (
              <Link onClick={handleLogout} className={""} to="/">
                Logout
              </Link>
            )}
          </ul>
          <div className="flex items-center justify-between w-[15%] text-[25px] pointer">

            {
              auth.user ? (<Link to="/cart" onClick={() => setactive(null)}>
                <FaOpencart className="cursor-pointer" />
              </Link>) : (<Link to="/login" onClick={() => setactive('login')}>
              <FaOpencart className="cursor-pointer" />
            </Link>)
            }
            

            {userdata ? (
              <div className="user pointer shadow-sm w-[40px] h-[40px] rounded-[50%] flex justify-center items-center bg-gray-200">
                <Link to={userdata.role === 0 ? '/profile' : '/admin'} onClick={() => setactive(null)}>
                  <div className="font-[500] text-[20px] text-blue-800">
                    {(userdata.name).charAt(0).toUpperCase()}
                  </div>
                </Link>
              </div>
            ) :  (
              <div className="user pointer text-[33px] flex justify-center items-center ">
                <Link to="/login" onClick={() => setactive('login')}>
                  <FaUserCircle />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Navbar for mobile */}

      <div className="flex w-[100vw] sticky top-0 z-50 bg-white sm:hidden shadow">
        <div className="flex navbar w-[90vw] ml-[5vw] bg-white h-[9vh] justify-between items-center sans text-[16px]">
          <div className="left h-[80%] w-[40%]">
            {/* <img className='h-[90%] cursor-pointer' src={logo} alt="EURO" /> */}
            <h1 className="font-[700] font-sans text-orange-600 text-[30px]">
              Euro
            </h1>
          </div>
          <div className="h-[100%] right flex justify-end items-center w-[60%]">

            {
              auth.user ? (<Link to="/cart" onClick={() => setactive(null)}>
                <FaOpencart className="cursor-pointer text-[35px] mr-8" />
              </Link>) : (<Link to="/login" onClick={() => setactive('login')}>
              <FaOpencart className="cursor-pointer text-[35px] mr-8" />
            </Link>)
            }

            <CgMenuLeft
              className="text-[35px]"
              onClick={() => setsidenav(true)}
            />
          </div>

          <div
            className={`side-div ${
              sidenav ? "display" : "hidden"
            } bg-white w-[100vw] fixed top-[0px] left-[0px] z-50 h-[100vh] `}
          >
            <IoCloseOutline
              className="text-[45px] absolute right-[15px] top-[15px]"
              onClick={() => setsidenav(false)}
            />
            <ul className="mt-[20vh] text-[22px] text-center">
              <Link
                onClick={() => {
                  setactive("home");
                  setsidenav(false);
                }}
                to="/"
              >
                <div className="flex my-2 w-[40vw] ml-[30vw] items-center justify-between text-[25px] gap-4">
                  <IoHome />{" "}
                  <p
                    className={`${
                      active === "home"
                        ? "font-bold border-b-2 border-orange-600"
                        : null
                    } absolute left-[50%]`}
                  >
                    Home
                  </p>
                </div>
              </Link>
              <br />
              <Link
                onClick={() => {
                  setactive("app");
                  setsidenav(false);
                }}
                to="/"
              >
                <div className="flex w-[40vw] my-2 ml-[30vw] items-center justify-between justify-center text-[25px] gap-4">
                  <TbDeviceMobileUp />{" "}
                  <p
                    className={`${
                      active === "app"
                        ? "font-bold border-b-2 border-orange-600"
                        : null
                    } absolute left-[50%]`}
                  >
                    App
                  </p>
                </div>
              </Link>
              <br />
              <Link
                onClick={() => {
                  setactive("contact");
                  setsidenav(false);
                }}
                to="/contact"
              >
                <div className="flex w-[40vw] my-2 ml-[30vw] items-center justify-between justify-center text-[25px] gap-4">
                  <IoMdContacts />{" "}
                  <p
                    className={`${
                      active === "contact"
                        ? "font-bold border-b-2 border-orange-600"
                        : null
                    } absolute left-[50%]`}
                  >
                    Contact
                  </p>
                </div>
              </Link>
              <br />

              {!auth.user ? (
                <Link
                  onClick={() => {
                    setactive("login");
                    setsidenav(false);
                  }}
                  to="/login"
                >
                  <div className="flex my-2 w-[40vw] ml-[30vw] items-center justify-between justify-center text-[25px] gap-4">
                    <SiSimplelogin />{" "}
                    <p
                      className={`${
                        active === "login"
                          ? "font-bold border-b-2 border-orange-600"
                          : null
                      } absolute left-[50%]`}
                    >
                      Login
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    handleLogout();
                    setsidenav(false);
                  }}
                  className={""}
                  to="/"
                >
                  <div className="flex my-2 w-[40vw] ml-[30vw] items-center justify-between text-[25px] gap-4">
                    <IoLogOut />
                    <p
                      className={`${
                        active === "login"
                          ? "font-bold border-b-2 border-orange-600"
                          : null
                      } absolute left-[50%]`}
                    >
                    Logout
                    </p>
                  </div>
                </Link>
              )}

{userdata ? (
                <Link to={userdata.role === 0 ? '/profile' : '/admin'} onClick={() => {
                  setactive(null);
                  setsidenav(false);
                }}>
                   <div className="flex my-8 w-[40vw] ml-[30vw] items-center justify-between text-[25px] gap-4">
                   <div className="user pointer shadow-sm w-[40px] h-[40px] rounded-[50%] flex justify-center items-center bg-gray-200">
                   {(userdata.name).charAt(0).toUpperCase()}
                   </div>
                  <p
                    className={`${
                      active === "account"
                        ? "font-bold border-b-2 border-orange-600"
                        : null
                    } absolute left-[50%]`}
                  >
                    {userdata.role === 0 ? 'Profile' : 'Admin'}
                  </p>
                </div>
                </Link>
            ) :  (
                <Link to="/login" onClick={() => {
                  setactive("account");
                  setsidenav(false);
                }}>
                 <div className="flex my-8 w-[40vw] ml-[30vw] items-center justify-between text-[25px] gap-4">
                  <FaUserCircle />
                  <p
                    className={`${
                      active === "account"
                        ? "font-bold border-b-2 border-orange-600"
                        : null
                    } absolute left-[50%]`}
                  >
                    Account
                  </p>
                </div>
                </Link>
             
            )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
