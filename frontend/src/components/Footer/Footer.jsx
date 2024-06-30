import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='contact-us'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Discover a wide variety of delicious dishes from local restaurants, tailored to satisfy every craving. Whether you're in the mood for something new or a favorite classic, our menu has something for everyone!</p>
                    <div className="footer-social-icons">
                        <a href="https://www.linkedin.com/in/pramod-savant-535031226" target="_blank" rel="noopener noreferrer">
                            <img src={assets.linkedin_icon} alt="" />
                        </a>
                        <a href="https://x.com/PRAMODSAVA682">
                            <img src={assets.twitter_icon} alt="" />
                        </a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Apt. 917 3746 Daniela Throughway, </li>
                        <li>East Geraldoton, WI 45015.</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 8660625848</li>
                        <li>pramodsavant2001@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright {new Date().getFullYear()} &copy; Tomato.com - All right Reserved</p>
        </div>
    )
}

export default Footer
