import React, { useState } from 'react';
import axios from 'axios';

const PhonePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');   //store phone number and otp entered by the user 
  const [isPhoneOtpSent, setIsPhoneOtpSent] = useState(false); //to check whether otp is sent(initially set to false)

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    try {
      await axios.post('http://localhost:5000/save-phone', { email, phoneNumber }); //the phone number is saved locally
      await axios.post('http://localhost:5000/send-phone-otp', { phoneNumber });//used to send otp to the user 
      alert('Phone number submitted successfully. OTP sent to your phone.');
      setIsPhoneOtpSent(true);
    } catch (error) {
      console.error('Phone number submission error', error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-phone-otp', { //to verify whether the entered otp by user and the otp generated are the same or not 
        phoneNumber,
        otp: phoneOtp,
      });
      if (response.data.success) {
        alert('Phone OTP verified successfully'); //if otp matches then user is redirected to home page   
        window.location.href = '/home';
      } else {
        alert('Invalid Phone OTP');
      }
    } catch (error) {
      console.error('Phone OTP verification error', error);
    }
  };

  return (
    <div>
      <h2>Phone Number</h2>   
      <form onSubmit={isPhoneOtpSent ? handleOtpSubmit : handlePhoneSubmit}> 
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
        />
        {isPhoneOtpSent && (
          <>
            <input
              type="text"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit">Verify OTP</button>
          </>
        )}
        {!isPhoneOtpSent && <button type="submit">Submit Phone Number</button>}
      </form>
    </div>
  );
};

export default PhonePage;
