import React from 'react';
import ReactDOM from 'react-dom/client'; //This is used to interact with the DOM and render your React components
import './index.css';
import App from './App'; //the app component is importde 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); //this is used to render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); // Helps measure app performance.
