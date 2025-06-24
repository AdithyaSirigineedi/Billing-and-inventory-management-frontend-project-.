import react, { useState, useEffect } from 'react';
import Load from '../pages/loading.js';
import { useNavigate } from 'react-router-dom';
import '../css/customerhome.css';
import Logo from '../images/logo.lottie';
import ProfileLogo from '../images/profile.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import productDetails from '../data/data.js';
import CartLogo from '../images/shopping-cart.svg';


const CustomerHome = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [products, setProducts] = useState(productDetails);
    const [filtering, setFiltering] = useState('');
    const[count,setCount] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('Account-type');
        localStorage.removeItem('Email');
        localStorage.removeItem('Password');
        setLoading(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        setTimeout(() => {
            navigate('/profile');
        }, 3000);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    useEffect(() => {
        toggleDarkMode();
    }, [])

    if (loading) {
        return <Load />
    }
    const onAddToCart = (id) => {
        const selectedProduct = productDetails.find(item => item.id === id);
        if (!selectedProduct) return;

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...existingCart, selectedProduct];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCount(count => count+1);
    };
    const onAddProduct = () => {
        navigate('/cart');
    }

    const onApplyFilter = (event) => {
        const value = event.target.value.toLowerCase();
        setFiltering(value);

        const filteredValues = value.length > 0
            ? productDetails.filter(product =>
                product.productname.toLowerCase().includes(value)
            )
            : productDetails;
        setProducts(filteredValues);
    };
    const onRegisterClick = () => {
        navigate('/signup');
    }


    const account = localStorage.getItem('Account-type');
    const email = localStorage.getItem('Email');
    const username = localStorage.getItem('Username');
    return (
        <>
            <header className="navbar">
                <DotLottieReact
                    src={Logo}
                    loop
                    autoplay className="logo"
                />
                {/* <div className="logo"></div> */}
                <ul className="nav-links">
                    <li>Home</li>
                    <li onClick={onAddProduct} className="cart-container">
                        <img src={CartLogo} alt="image not found" /><h5>{count}</h5>
                    </li>
                    <input type="text" placeholder="Search for products ..." onChange={onApplyFilter} className="filter-input" />
                    <li className="logout-btn" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                    </li>
                    <div className="profile-dropdown">
                        <DotLottieReact
                            src={ProfileLogo} className="profilelogo" onClick={toggleDropdown}
                            loop
                            autoplay
                        />
                        {/* <img
              alt="Profile"
              className="profilelogo"
              onClick={toggleDropdown}
            /> */}
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <p><strong>{`${username || 'Username'} (${account || 'Account type not found'})`}</strong></p>
                                <p><strong>{`${email || 'Email'})`}</strong></p>
                            </div>
                        )}
                    </div>
                    <li className="dark-mode-btn" onClick={toggleDarkMode}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    </li>
                </ul>
            </header>
            <div className="products-container">
                <div className="product-list">
                    {
                        products && products.length > 0 &&
                        products.map((product) => (
                            <div className="product-item" key={product.id}>
                                <h3>{product.productname}</h3>
                                {product.productimage ? <img src={product.productimage} alt={product.productname} className="images" /> : " "}
                                <p>{product.productprice}</p>
                                <p>{product.productdescription}</p>
                                <button
                                    className="add-button"
                                    type="button"
                                    onClick={() => onAddToCart(product.id)} style={{ color: 'black;' }}
                                >Add to cart
                                </button>
                            </div>
                        ))}
                </div>
            </div>
            <section className="faq-section">
                <div className="faq-left">
                    <p className="faq-subheading">F.A.Q</p>
                    <h2 className="faq-heading">For Customers</h2>
                    <div className="faq-item">
                        <details>
                            <summary>How do I create a customer account?</summary>
                            <br />
                            <p>Click on the “Sign Up” button in the top-right corner and select “Customer” during registration.</p>
                        </details>
                        <details>
                            <summary>How do I place an order?</summary>
                            <br />
                            <p>Browse the products, add items to your cart, and proceed to checkout to place your order.</p>
                        </details>
                        <details>
                            <summary>Can I track my order status?</summary>
                            <br />
                            <p>Yes, go to your account dashboard and select “My Orders” to view the status of your orders.</p>
                        </details>
                        <details>
                            <summary>What is the return or refund policy?</summary>
                            <br />
                            <p>Returns are accepted within 14 days of delivery. Refunds are processed within 5-7 business days after return approval.</p>
                        </details>
                        <details>
                            <summary>How do I contact customer support?</summary>
                            <br />
                            <p>You can reach out through the “Help Center” or use the live chat available on the bottom-right of the screen.</p>
                        </details>
                    </div>
                </div>
                <div className="faq-right">
                </div>
            </section>
            <button onClick={onRegisterClick} id='register-btn'>Register</button>

            <br />
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>About Us</h3>
                        <p>
                            We empower vendors to showcase and manage their products seamlessly. Whether you're a small seller or a growing business — we support your journey.
                        </p>
                    </div>

                    <div className="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-section contact">
                        <h3>Contact</h3>
                        <p>Email: support@vendorhub.com</p>
                        <p>Phone: +1 (800) 123-4567</p>
                        <p>Address: 123 Vendor Lane, Commerce City, CO</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} VendorHub. All rights reserved.</p>
                </div>
            </footer>

        </>
    )
}
export default CustomerHome;