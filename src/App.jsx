import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/Auth/RegisterForm.jsx';
import LoginForm from './components/Auth/LoginForm.jsx';
import HomeBanner from './components/Home/HomeBanner.jsx';
import AdminLogin from './components/admin/AdminLogin.jsx';
import AdminRegisterForm from './components/admin/AdminRegister.jsx';
import AdminPanel from './components/admin/AdminPanel.jsx';
import Products from './components/Products/Products.jsx';
import UserCart from './components/Cart/usercart.jsx';
import CheckoutPage from './components/Orders/CheckOutPage.jsx';
import LastPage from './components/Orders/LastPage.jsx';
import AdminTrackingPanel from './components/admin/AdminTracking.jsx';
import TrackingPage from './components/Orders/OrderTrackingPage.jsx';


function App() {

  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/home" element={<><HomeBanner /></>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products/:categoryName" element={<Products />} />
          <Route path="/usercart" element={<UserCart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/trackorders" element={<TrackingPage/>} />
          <Route path="/orderconfirmation" element={<LastPage/>} />



          {/* Admin Routes  */}
          <Route path="/adminpanel/*" element={<AdminPanel />} />
          <Route path="/adminregister" element={<AdminRegisterForm/>} />
          <Route path="/adminlogin" element={<AdminLogin />} /> 
          <Route path="/orderspanel" element={<AdminTrackingPanel/>} />


          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
