import React, { useState, useRef } from 'react';
// import '../css/signup.css';
import VendorImage from '../images/vendor.lottie';
import CustomerImage from '../images/customer.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const [accountType, setAccountType] = useState('Employer');
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userName = userRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    let valid = true;

    if (userName === '') {
      setUserNameError('Please enter your username');
      toast.error("Please enter a valid username");
      valid = false;
    } else {
      setUserNameError('');
    }

    if (email === '') {
      setEmailError('Please enter your email');
      toast.error('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      toast.error('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      toast.error('Password too short');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      toast.success('Signup successful!');
      userRef.current.value = '';
      emailRef.current.value = '';
      passwordRef.current.value = '';
      setTimeout(() => {
        navigate('/');
      },3000);
    }
  };

  return (
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
        <label style={{ fontSize: "20px" }}>Username</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <input placeholder="Enter your username" ref={userRef} />
        </div>
        {userNameError && <p className="error">{userNameError}</p>}

        <label style={{ fontSize: "20px" }}>Email</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.912l-7.5 4.5a2.25 2.25 0 0 1-2.36 0l-7.5-4.5a2.25 2.25 0 0 1-1.07-1.912V6.75" />
          </svg>
          <input type="email" placeholder="Enter your email" ref={emailRef} />
        </div>
        {emailError && <p className="error">{emailError}</p>}

        <label style={{ fontSize: "20px" }}>New Password</label>
        <div className="input-icon-wrapper">
          <svg className="input-icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <input type="password" placeholder="Enter your password" ref={passwordRef} />
        </div>
        {passwordError && <p className="error">{passwordError}</p>}

        <button type="submit" className="login-button">Signup</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
};

export default Register;
