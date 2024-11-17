import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/authContext";

const Cart = () => {
  const { userdata, fetchData } = useContext(AuthContext);
  const [quentity, setquentity] = useState(1);

  // for remove product

  const removeToCart = async (id) => {
    const userid = userdata._id;
    const productids = id;

    try {
      const res = await axios.post(`https://euro-node-backend.onrender.com/removeToCart`, { userid, productids });

      if (res && res.status === 201) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (userdata) {
        fetchData();
      }
    },
    [],
    [userdata, fetchData]
  );

  // for handle payment through razopy

  const handlePayment = async (ids, price) => {
    try {
      // Request to create a new order from the backend
      const { data } = await axios.post(`https://euro-node-backend.onrender.com/create-order`, { amount: price });
  
      const options = {
        key: "rzp_test_t1sDs7WL1eHN1V",
        amount: data.amount,
        currency: "INR",
        name: "Euro",
        description: "Payment for Euro cart",
        order_id: data.orderId,
        handler: (response) => {
          toast.success("your order has been created")
          removeToCart(ids)
        },
        theme: { color: "#3399cc" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed !")
      console.error("Payment failed:", error);
    }
  };

  const handleids = () => {
    const ids = userdata.cart.map((item) => item._id);
    const price = userdata.cart.reduce((sum, item) => sum + item.new_price, 0)
    handlePayment(ids,price)
  }

  if (!userdata) {
    <div className="">Loading</div>;
  } else {
    return (
      <div className="w-full">
        {userdata.cart.length === 0 ? (
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
              alt="Cart is Empty !"
            />
          </div>
        ) : (
          <div className="w-full">
            <p className="font-[600] text-center text-[27px] my-4 ">Cart</p>

            <div className="w-[90%] m-auto m-2 border-black shadow border-[1px] p-2">
              {userdata.cart.map((item) => (
                <div className="flex w-[90%] m-auto justify-evenly border-b-[0.5px] items-center my-2 border-black">
                  <img
                    className="w-[70px] h-[70px] shadow m-2 rounded "
                    src={item.images[0]}
                    alt=""
                  />
                  <div className="">
                    <label className="font-[500] text-[16px]">Name</label>
                    <p className="text-[12px]">{item.name}</p>
                  </div>
                  <div className="">
                    <label className="font-[500] text-[16px]">Price</label>
                    <p className="text-[12px]">{item.new_price}</p>
                  </div>
                  <div className="">
                    <label className="font-[500] text-[16px]">Quentity</label>
                    <p className="text-[12px]">{quentity}</p>
                  </div>
                  <button
                    onClick={() => removeToCart(item._id)}
                    className="bg-orange-600 font-[500] text-white py-2 text-[11px] shadow px-4"
                    s
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-[1px] border-black w-[50%] m-auto my-8 p-4">
              <p className="font-[500] text-[18px] ">
                Total Items:{" "}
                <span className="text-[17px] font-[400]">
                  {userdata.cart.length}
                </span>
              </p>
              <p className="font-[500] text-[18px] ">
                Total Price:{" "}
                <span className="text-[17px] font-[400]">
                  ₹{" "}
                  {userdata.cart.reduce((sum, item) => sum + item.new_price, 0)}
                </span>
              </p>
              <button onClick={handleids} className="bg-orange-700 text-white font-[500] py-2 w-full my-4">
                Buy
              </button>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    );
  }
};

export default Cart;
