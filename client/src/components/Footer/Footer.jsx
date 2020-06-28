import React from 'react';
import './Footer.css';
import logo from '../../assets/images/logo-1.png'

const Footer = () => {
    const companyName = "Mastermind.Inc";
    const today = new Date();
    const year = today.getFullYear();

    return (
        <div className="footer-main">
            <div className="footer-container">
                <div><img src={logo} alt="footer-logo" /></div>
                <div className="copyright">Copyright &copy; {year} {companyName}</div>
            </div>
        </div>
    );
}
export default Footer;