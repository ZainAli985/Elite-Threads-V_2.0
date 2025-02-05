import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function Sidemenu() {
    const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(`/adminpanel/${path}`);
    };
    const handleOrderNavigation = () => {
      navigate(`/orderspanel`);
    };
    
  
    return (
      <div className="panelsidemenu">
        <h2><a onClick={() => handleNavigation('create')}>CREATE</a></h2>
        <h2><a onClick={() => handleNavigation('products')}>PRODUCTS</a></h2>
        <h2><a onClick={handleOrderNavigation}>ORDERS</a></h2>
        <h2><a onClick={() => handleNavigation('profile')}>PROFILE</a></h2>
      </div>
    );
  }
  
  export default Sidemenu;
  
