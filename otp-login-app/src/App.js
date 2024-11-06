import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import OtpVerificationPage from './components/OtpVerificationPage';
import PhonePage from './components/PhonePage';  // Import the new component
import HomePage from './components/HomePage';    // Import the new component

// Authentication Context
const AuthContext = React.createContext();

// Protected Route Component
// const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
//   return isAuthenticated ? <Component {...rest} /> : <Navigate to="/home" />;
// };

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status, e.g., via a token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp-verification" element={<OtpVerificationPage />} />
          <Route path="/phone" element={<PhonePage />} />
          
          {/* Protected Route for Home Page */}
          <Route 
            path="/home" 
            element={<HomePage/>} 
            
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;