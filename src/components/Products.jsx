import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { AuthContext } from "../context/authContext";

const Products = () => {
  const [productData, setProductData] = useState();
  const [loading, setloading] = useState(true);

  const getProductsData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_LIVE_URL}/getProductsData`
      );

      if (res && res.status === 201) {
        setProductData(res.data.productsData);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // for add to cart

  const { userdata } = useContext(AuthContext);

  const addToCart = async (id) => {
    const userid = userdata._id;
    const productid = id;

    try {
      const res = await axios.post("/addToCart", { userid, productid });

      if (res && res.status === 201) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for handle payment through razopy

  const handlePayment = async (price) => {
    try {
      // Request to create a new order from the backend
      const { data } = await axios.post("/create-order", { amount: price });

      const options = {
        key: "rzp_test_t1sDs7WL1eHN1V",
        amount: data.amount,
        currency: "INR",
        name: "Euro",
        description: "Payment for Euro cart",
        order_id: data.orderId,
        handler: (response) => {
          toast.success("Your order has been created !");
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment failed");
      console.error("Payment failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="w-full p-6 ">
        {productData.length === 0 ? (
          <div className="w-full flex justify-center items-center font-[500] text-[20px] my-8">
            No products avilable !
          </div>
        ) : (
          <div className="">
            <p className="font-sans text-[27px] font-[500] my-4 text-center ">
              Products
            </p>

            <div className="w-full flex flex-wrap justify-evenly">
              {productData.map((item) => (
                <div className="m-2 w-[180px] shadow  rounded bg-white border-[1px]  ">
                  <img
                    className="w-[144px] h-[144px] rounded-t m-auto mt-4"
                    src={item.images[0]}
                    alt=""
                  />
                  <div className="m-4">
                    <p className="font-[500] text-[20px] ">{item.name}</p>
                    <p className="text-[10px] line-through">
                      ₹ {item.old_price}
                    </p>
                    <p className="text-[13px] font-[500] ">
                      ₹ {item.new_price}
                    </p>
                  </div>
                  <div className="w-full flex justify-evenly mb-4 ">
                    <button
                      onClick={() => addToCart(item._id)}
                      className="bg-black text-white font-[500] rounded text-[12px] h-8 hover:opacity-80 w-[80px]"
                    >
                      Add to cart
                    </button>
                    <button
                      className="bg-orange-600 text-white font-[500] rounded text-[12px] h-8 w-[80px] hover:opacity-80"
                      onClick={() => handlePayment(item.new_price)}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Toaster />
          </div>
        )}
      </div>
    );
  }
};

export default Products;
