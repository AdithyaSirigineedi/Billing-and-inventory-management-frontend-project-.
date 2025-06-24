import React, { useEffect, useState } from 'react';
import '../css/cart.css';

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

  // i have used demo key for razor pay //

  const onRazorPayClick = () => {
    if (!razorpayLoaded) {
      alert("Razorpay SDK not yet loaded. Please try again.");
      return;
  }
   const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",  // key for testing purpose //
      amount: "50000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_TEST1234567890",
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
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
    </div>
  );
};
export default Cart;
