import React, { useState } from 'react';   
import axios from 'axios';    //importing modules 

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [verificationType] = useState('email'); // sets the verification type variable as email that we had recieved form the earlier login page 
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = verificationType === 'email'  // checks whether the verificationtype is email or not 
      ? 'http://localhost:5000/verify-email-otp'   //if true sets endpoint equal to the url 
      : 'http://localhost:5000/verify-phone-otp';  //if false
    
    const email = localStorage.getItem('email') ;  //retrieves the email stored in our web application locally
    const phoneNumber = localStorage.getItem('phoneNumber'); 
    
    try {
      const response = await axios.post(endpoint, {
        email: verificationType === 'email' ? email : undefined, //if true then the url in endpoint is executed to the backend 
        phoneNumber: verificationType === 'phone' ? phoneNumber : undefined,
        otp
        
      });
      
      if (response.data.success) {
        if (verificationType === 'email') {
          // Redirect to PhonePage after successful email OTP verification
          window.location.href = '/phone';
        } else {
          // Redirect to HomePage after successful phone OTP verification
          window.location.href = '/home';
        }
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error', error);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}  //updates to the current value entered by user 
          placeholder={verificationType === 'email' ? 'Enter Email OTP' : 'Enter Phone OTP'}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;
