import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Authcontext from './context/Authprovider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authcontext >
      
      <App />
    
    
    </Authcontext>
  </React.StrictMode>
);


