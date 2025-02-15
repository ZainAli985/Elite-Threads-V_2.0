import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './HomeBanner.css';
import HomeNav from "./HomeNav";
import Category from "./CategoryBox";
import AboutUS from "./AboutUs";
import Notification from "./Notfication";
import API_BASE_URL from "../../config/ApiBaseUrl";

// Importing Banner Images 
import covertext from "/assets/covertext.png";
import covertext2 from "/assets/covertext2.png";
import covertext3 from "/assets/covertext3.png";
import covertext4 from "/assets/covertext4.png";
import model1 from "/assets/model1.png";
import model2 from "/assets/model2.png";
import model3 from "/assets/model3.png";
import model4 from "/assets/model4.png";

function HomeBanner() {
    const navigate = useNavigate();
    const [notificationMessage, setNotificationMessage] = useState("");
    const checkAuthorization = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setNotification('Unauthorized. Redirecting to login.')
            setTimeout(() => {
                setNotification('');
            }, 6000);
            navigate('/login');
            return;
        }

        try {
            // Validate token with the backend
            const response = await fetch(`${API_BASE_URL}/home`, {
                headers: {
                    method: 'GET',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setNotificationMessage('Invalid or expired token');
                setTimeout(() => {
                    setNotificationMessage('')
                }, 6000);
            }

            const data = await response.json();
            console.log(data.message); // Welcome message from the backend

        } catch (err) {
            console.error(err);
            alert('Session expired. Please login again.');
            navigate('/login');
        }
    };
    // Image data
    const textImages = [covertext, covertext2, covertext3, covertext4];
    const modelImages = [model1, model2, model3, model4];

    // Refs for the image elements
    const textImg = useRef(null);
    const modelImg = useRef(null);

    // Index to track current images
    let currentIndex = 0;

    // Function to update images
    const updateBanner = () => {
        // Apply "slide-out" animations
        textImg.current.classList.remove("slide-in-left");
        textImg.current.classList.add("slide-out-left");

        modelImg.current.classList.remove("slide-in-right");
        modelImg.current.classList.add("slide-out-right");

        // Wait for slide-out animation to complete before updating the images
        setTimeout(() => {
            // Remove "slide-out" animations
            textImg.current.classList.remove("slide-out-left");
            modelImg.current.classList.remove("slide-out-right");

            // Update images
            currentIndex = (currentIndex + 1) % textImages.length;
            textImg.current.src = textImages[currentIndex];
            modelImg.current.src = modelImages[currentIndex];

            // Apply "slide-in" animations
            textImg.current.classList.add("slide-in-left");
            modelImg.current.classList.add("slide-in-right");
        }, 1000); // Match the duration of the slide-out animation
    };

    // Initial setup (runs only once when component mounts)
    useEffect(() => {
        textImg.current.src = textImages[currentIndex];
        modelImg.current.src = modelImages[currentIndex];
        textImg.current.classList.add("slide-in-left");
        modelImg.current.classList.add("slide-in-right");

        // Change images every 5 seconds
        const interval = setInterval(updateBanner, 5000);

        checkAuthorization()
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);

    }, [navigate]);

    return (
        <>
        <HomeNav/>
        <div className="banner">
            <div className="banner-content">
                <div className="text">
                    <img ref={textImg} alt="Text Banner" />
                </div>
                <div className="model-img">
                    <img ref={modelImg} alt="Model" />
                </div>
            </div>
        </div>
        <hr  className="hr" />

        <Category/>
        <AboutUS/>
        {notificationMessage && <Notification message={notificationMessage} />}
        </>
    );
}

export default HomeBanner;
