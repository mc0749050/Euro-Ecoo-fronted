import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import toast, {Toaster} from 'react-hot-toast';

const Products = () => {
  const [productData, setProductData] = useState();
  const [loading, setloading] = useState(true);


  const getProductsData = async () => {
    try {
      const res = await axios.get(`https://euro-node-backend.onrender.com/getProductsData`);

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


  // for delete product

  const deleteProductFun = async (id) => {
    try {
      const res = await axios.post(`https://euro-node-backend.onrender.com/deleteProduct/${id}`);

      if(res && res.status === 201){
        toast.success(res.data.message);
      }

      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  if (loading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full bg-gray-50 p-8 grid gap-4 overflow-auto">
        {productData.length > 0 ? (
          <div>
        <h1 className="font-[700] text-center my-6 text-[25px]">All Products</h1>
         { productData.map((product, index) => (
            <div className="flex justify-around items-center bg-white shadow">
              <img className="h-[60px] w-[60px] m-2 rounded-full border-[1px] border-black shadow" src={`http://localhost:4000/${product.images[0]}`} alt="" />
              <div className="">
                <label className="font-[600]">Name</label>
                <p>{product.name}</p>
              </div>
              <div className="">
                <label className="font-[600]">Price</label>
                <p>{product.new_price}</p>
              </div>
              <div className="">
                <label className="font-[600]">InStock</label>
                <p>{product.stocknumber}</p>
              </div>
              <button onClick={() => deleteProductFun(product._id)} className="bg-orange-600 px-4 py-2 text-white font-[500] rounded">Delete</button>
            </div>
          )) } 
          </div>
        ) : (
          <div className="flex justify-center items-center text-[25px] font-[600]">No products available</div>
        )}

        <Toaster />
      </div>
    );
  }
};

export default Products;
