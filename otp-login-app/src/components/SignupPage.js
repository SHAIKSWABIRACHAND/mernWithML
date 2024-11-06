import React, { useState } from 'react'; 
import axios from 'axios'; //used to send server requests to the backend 


const SignupPage = () => {
  const [email, setEmail] = useState('');  //the usestate is used to update what the user is giving in as an input so that the correct info can be sent to the backend 
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => { // async lets the code run in backgound while the site is being loded  
    e.preventDefault(); //prevents the default or blank/empty page from being submited 
    try {
      const response = await axios.post('http://localhost:5000/signup', { //await pauses the other things until a response is obtained from the server 
        email,
        password,   //here email and password are passed to the backend 
      });
      if (response.data.success) { // if the response from the backend is recieved 
        alert('Signup successful. Please login.');
        window.location.href = '/';  // Redirect to Login after successful signup
      } else {
        alert('Signup failed.'); // Incase of signup failure 
      }
    } catch (error) {
      console.error('Signup error', error); // if the handleSignup function is showing or giving us an error 
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email"
          value={email}   //whatever the user sends in as an input in the email block it is updated and stored 
          onChange={(e) => setEmail(e.target.value)} // e.target .value gives us the current input that is given by the user 
          placeholder="Email"  //here e represents the event generated on updation of the field, so whenever the user gives in a new input a new event is generated
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // same goes for the password field too
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>  
    </div>
  );
};

export default SignupPage;  //exporting the component 
