import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
import VendorImage from '../images/vendor.lottie';
import CustomerImage from '../images/customer.lottie';
import Load from '../pages/loading.js';


const Login = () => {
  const [accountType, setAccountType] = useState('Vendor');
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    if (localStorage.getItem('Email') && localStorage.getItem('Password')) {
      navigate('/');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      toast.error('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email');
      toast.error('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      toast.error('Password must be at least 8 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      emailRef.current.value = '';
      passwordRef.current.value = '';
      const encryptedPassword = btoa(password);
      localStorage.setItem('Account-type', accountType);
      localStorage.setItem('Email', email);
      localStorage.setItem('Password', encryptedPassword);
      toast.success(`Logged in as ${accountType}`);
      setLoading(true);
    }
      setTimeout(() => {
        accountType === 'Vendor' ? navigate('/vendor/home') : navigate('/customer/home');
      }, 3000);
    }

     if (loading) {
        return <Load />;
  }


  return (
  <>
      <div className="login-container">
        <h2>Billing & Inventory Login</h2>

        <div className="account-types">
          <div
            className={`account-option ${accountType === 'Vendor' ? 'active' : ''}`}
            onClick={() => setAccountType('Vendor')}
          >
            <DotLottieReact src={VendorImage} loop autoplay />
            <p style={{ fontSize: '22px' }}>Vendor</p>
          </div>
          <div
            className={`account-option ${accountType === 'Customer' ? 'active' : ''}`}
            onClick={() => setAccountType('Customer')}
          >
            <DotLottieReact src={CustomerImage} loop autoplay />
            <p style={{ fontSize: '25px' }}>Customer</p>
          </div>
        </div>

        <p className="greeting"><br />Please login to continue.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="input-icon-wrapper">
            <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 
                2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 
                0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 
                0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 
                1-1.07 1.912l-7.5 4.5a2.25 2.25 0 0 
                1-2.36 0l-7.5-4.5a2.25 2.25 0 0 
                1-1.07-1.912V6.75" />
            </svg>
            <input type="email" placeholder="Enter email" ref={emailRef} />
          </div>
          {emailError && <p className="error">{emailError}</p>}

          <label><b>Password</b></label>
          <div className="input-icon-wrapper">
            <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 
                0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 
                0 0 2.25-2.25v-6.75a2.25 2.25 0 0 
                0-2.25-2.25H6.75a2.25 2.25 0 0 
                0-2.25 2.25v6.75a2.25 2.25 0 0 
                0 2.25 2.25Z" />
            </svg>
            <input type="password" placeholder="Enter password" ref={passwordRef} />
          </div>
          {passwordError && <p className="error">{passwordError}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Register</span>
        </p>
        <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
      </div>
    {/* <DotLottieReact src={sideImage} className="sideimage" loop autoplay /> */}
  </>

);
}
export default Login;