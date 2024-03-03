import React from 'react';
import './footer.css'
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p className='footp'>&copy; {currentYear} My Blog Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
