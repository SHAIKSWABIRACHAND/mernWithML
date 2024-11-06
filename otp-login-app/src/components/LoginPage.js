import React, { useState } from 'react';
import axios from 'axios';  //importing all necessary modules 
import './style.css';

const LoginPage = () => {
  const [email, setEmail] = useState(''); //used to change the email and pass as to what the user has entered 
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => { //on submission thwe function gets exicuted 
    e.preventDefault();//prevents the default or empty page to get submitted 
    try {
      const response = await axios.post('http://localhost:5000/login', { //posts a request to backend and till a response is recieved till then the web application loads or waits 
        email,
        password,
      });
      if (response.data.success) {  //if the backend successfully responds 
        localStorage.setItem('email', email); //stores the email locally in th web application so that it can be used while otp verification
        window.location.href = '/otp-verification'; //redirecting to otp verification page 
      } else {
        alert('Login failed');
      }
    } catch (error) {                       //in case of any errors from the backend 
      console.error('Login error', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input className='hii'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} //takes in the email name and stores it in email const created at start 
          placeholder="Email"
          required
        />
        <input className='hi'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}//takes in the pass and stores it in email const created at start 
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className='he'>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default LoginPage;  //exporting the login component 
