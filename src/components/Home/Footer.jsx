import React from "react";
import './footer.css'

function Footer() {
    return (
        <>
            <div className="footer">
                <img src="/assets/Logo.png" alt="" />
                <div className="footer-links">
                    <a href="#">CREDITS</a>
                    <a href="#">ABOUT US</a>
                    <a href="#">Terms & Conditions</a>
                </div>
                <div className="contact-links">
                    <h2>BE BOLD BE TIMELESS</h2>
                    <div className="contact-options">
                        <h5>CONTACT US</h5>
                        <div className="social-logos">
                            <a href="https://www.instagram.com/zain_s_1?igsh=MWdpdG1qdjR1MnNweQ==" target="blank"><img src="/assets/insta.png" alt="insta" /></a>
                            <a href="https://www.facebook.com/" target="blank"><img src="/assets/facebook.png" alt="facebook" /></a>
                            <a href="https://mail.google.com/" target="blank"><img src="/assets/mail.png" alt="mail" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;