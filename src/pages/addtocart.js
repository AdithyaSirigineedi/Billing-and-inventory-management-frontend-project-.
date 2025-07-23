import React, { useEffect, useState } from 'react';
import '../css/cart.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.productprice.replace('$', ''));
    return total + price;
  }, 0).toFixed(2);

  const onRazorPayClick = () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay SDK not yet loaded. Please try again.");
      return;
  }
  const options = {
  key: "rzp_test_1DP5mmOlF5G5ag", 
  amount: Math.round(totalPrice * 86 * 100),
  currency: "INR",
  name: cartItems.map(item => item.productname).join(', '),
  description: "Test Transaction",
  image: "https://your-logo-url.com",
  handler: function (response) {
    toast.success("Payment ID: " + response.razorpay_payment_id);
    toast.success("Order ID: " + response.razorpay_order_id);
    toast.success("Signature: " + response.razorpay_signature);
  },
  prefill: {
    name: "Demo User",
    email: "Demo@gmail.com",
    contact:"1234567891",
  },
  theme: {
    color: "#3399cc",
  },
};
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
}
  return (
    <div className="cart-page">
      <h2 className="cart-heading">Your Shopping Cart</h2>
      {
      cartItems && cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              {
              item.productimage && (
                <img src={item.productimage} alt={item.productname} className="cart-item-image" />
              )}
              <div className="cart-item-details">
                <h3>{item.productname}</h3>
                <p>{item.productdescription}</p>
                <p className="cart-price">{item.productprice}</p>
                <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p className="cart-total">Total: ${totalPrice}</p>
            <button className="checkout-button" onClick={onRazorPayClick}>Proceed to Checkout</button>
          </div>
        </div>
      )}
         <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
/>
    </div>

  );
};
export default Cart;
