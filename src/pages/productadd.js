import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/productadd.css';

const AddProduct = () => {
  const productName = useRef();
  const productPrice = useRef();
  const productDescription = useRef();
  const[form,setForm] = useState();

  const onAddProduct = (e) => {
    e.preventDefault();

    const name = productName.current.value.trim();
    const price = productPrice.current.value.trim();
    const description = productDescription.current.value.trim();

    setForm([
      {
        name,
        price,
        description
      }
    ])

    if (!name || !price || !description) {
      toast.error('Please fill in all the fields.');
      return;
    }

    toast.success('Product added successfully!');

    productName.current.value = '';
    productPrice.current.value = '';
    productDescription.current.value = '';
  };

 

  return (
    <div className="add-job-container">
      <h2>Add New Product</h2>
      <form className="job-form" onSubmit={onAddProduct}>
        <label>
          Product Name:
          <input type="text" name="productName" placeholder="Enter product name" ref={productName} />
        </label>

        <label>
          Product Price:
          <input type="number" name="productPrice" placeholder="Enter price" ref={productPrice} min="0" />
        </label>

        <label>
          Product Description:
          <textarea name="productDescription" placeholder="Enter product description" ref={productDescription} />
        </label>

        <button type="submit">Add Product</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default AddProduct;
