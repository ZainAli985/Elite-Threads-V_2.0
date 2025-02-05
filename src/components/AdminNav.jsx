import './LoginNavBar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AdminNav() {
// Preventing Default Behaviour Of A 
    const navigate  = useNavigate();

    const handleNavigation = (e,path)=>{
        e.preventDefault();
        navigate(path);
    }

    return (
        <>
           <nav id="LoginNav">
        <div class="logo-box">
            <img src="/assets/Logo.png" alt=""/>
        </div>
        <div class="nav-links">
            <a href="/register" onClick={(e)=>{handleNavigation(e,'/adminregister')}}>Sign Up</a>
            <a href="/login"onClick={(e)=>{handleNavigation(e,'/adminlogin')}}>Log In</a>
        </div>
    </nav>
        </>
    )
}

export default AdminNav;