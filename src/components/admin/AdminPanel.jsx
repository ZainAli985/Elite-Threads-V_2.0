import { React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidemenu from './Sidemenu';
import ProductForm from './ProductForm';
import AdminNav from './AdminNav.jsx';
import AdminInfo from './AdminInfo.jsx';
import AdminProducts from './Adminproducts.jsx';
import API_BASE_URL from '../../../config/ApiBaseUrl.js';


function AdminPanel() {
  const navigate = useNavigate();
  const checkAuthorization = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('SESSION EXPIRED PLEASE LOGIN AGAIN');
      navigate('/adminlogin');
      return;
    }

    try {
      // Validate token with the backend
      const response = await fetch(`${API_BASE_URL}/adminpanel`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        alert('Invalid or expired token');
      }

      const data = await response.json();
      console.log(data.message); // Welcome message from the backend

    } catch (err) {
      console.error(err);
      alert('Session expired. Please login again.');
      navigate('/adminlogin');
    }
  }
  useEffect(() => {
    checkAuthorization()
  });
  return (
    <>
      <AdminNav />
      <Sidemenu />
      <Routes>
        <Route path="create" element={<ProductForm />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="profile" element={<AdminInfo />} />
        {/* Default Route */}
        <Route path="*" element={<ProductForm />} />
      </Routes>
    </>
  );
}

export default AdminPanel;
