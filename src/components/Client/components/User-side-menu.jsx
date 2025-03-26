import React from 'react';
import './usersidemenu.css'
import { useNavigate } from 'react-router-dom';

const UserSideMenu = () => {
    const navigate = useNavigate();

    function handlePfpNavigation(path){
        navigate(`/profile/${path}`)
    }
    return (
        <>
            <div className="user-side-menu">
                <a className='flex a-center' href="#" onClick={()=>handlePfpNavigation('dashboard')}><img src="/assets/profile.png" alt="profile logo" />PROFILE</a>
                <a className='flex a-center' href="#"onClick={()=>handlePfpNavigation('deliveredorders')}><img src="/assets/delivered.png" alt="Delivered Logo" />DELIVERED</a>
                <a className='flex a-center' href="#"><img src="/assets/settings.png" alt="Settings Logo" />SETTINGS</a>
            </div>
        </>
    )
}

export default UserSideMenu;