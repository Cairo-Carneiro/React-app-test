import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWhatsapp,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelopeOpen,
  faPaperPlane,
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
import './verification.css';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
  return (
    <div className="email-verification-page">
      <div className="verification-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <FontAwesomeIcon icon={faWhatsapp} className="logo-icon" />
            <span className="logo-text">Wappfy</span>
          </div>
          <p className="logo-subtitle">API de WhatsApp Profissional</p>
        </div>

        {/* Verification Content */}
        <div className="verification-content">
          <div className="envelope-icon">
            <FontAwesomeIcon icon={faEnvelopeOpen} className="envelope" />
          </div>

          <div className="verification-text">
            <h2>Verifique seu e-mail</h2>
            <p>Clique no link enviado para ativar sua conta</p>
            <p>Enviamos um e-mail para <span className="email-highlight">seu@email.com</span></p>
          </div>

          <div className="resend-section">
            <button className="resend-button">
              <FontAwesomeIcon icon={faPaperPlane} />
              Reenviar e-mail
            </button>
          </div>

          <div className="additional-info">
            <p>Não recebeu o e-mail? Verifique sua pasta de spam</p>
          </div>
          
          <div className="back-to-login">
            <Link
              to="/signin"
              className="signin-link"
              aria-label="Voltar ao Link"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;