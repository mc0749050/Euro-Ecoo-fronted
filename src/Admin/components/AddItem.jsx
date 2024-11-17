import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddItem = () => {
  const [products, setProducts] = useState({
    name: "",
    new_price: "",
    old_price: "",
    instock: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setProducts((prevProducts) => ({
      ...prevProducts,
      images: Array.from(files),
    }));
  };

  const addProductsFun = async (e) => {
    e.preventDefault();

    if (
      products.name === "" ||
      products.new_price === "" ||
      products.old_price === "" ||
      products.instock === "" ||
      products.images.length === 0
    ) {
      toast.error("Plese enter all vields !");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", products.name);
        formData.append("new_price", products.new_price);
        formData.append("old_price", products.old_price);
        formData.append("instock", products.instock);
        products.images.forEach((file) => formData.append("images", file)); // Append each image

        const res = await axios.post(`${process.env.REACT_APP_LIVE_URL}/addProducts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.status === 201) {
          toast.success("Product added successfully!");
          setProducts({
            name: "",
            new_price: "",
            old_price: "",
            instock: "",
          });
          document.getElementById("fileInput").value = "";
        } else {
          toast.error("Product not added.");
        }
      } catch (error) {
        toast.error("Technical issue !");
      }
    }
  };

  return (
    <div className="bg-gray-50 w-full h-full flex justify-center items-center">
      <div className="bg-white w-4/5 sm:w-3/5 text-center shadow-xl rounded-xl">
        <p className="font-[600] text-[35px] my-6 ">Add products</p>
        <form onSubmit={addProductsFun} className="grid gap-6 w-4/5 m-auto">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={products.name}
            placeholder="Enter product name"
          />
          <input
            type="number"
            name="new_price"
            value={products.new_price}
            onChange={handleChange}
            placeholder="Enter product new price"
          />
          <input
            type="number"
            name="old_price"
            value={products.old_price}
            onChange={handleChange}
            placeholder="Enter product old price"
          />
          <input
            type="number"
            name="instock"
            value={products.instock}
            onChange={handleChange}
            placeholder="Enter product stock"
          />
          <input
            type="file"
            multiple
            id="fileInput"
            onChange={handleImageChange}
            name="images"
          />
          <button
            className="bg-orange-400 font-[500] text-white py-2 mb-8"
            type="submit"
          >
            Submit
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AddItem;
