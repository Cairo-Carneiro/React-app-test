import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <span>v2.0.1</span>
          <span className="separator">•</span>
          <span>© 2025 Whatsbus. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;