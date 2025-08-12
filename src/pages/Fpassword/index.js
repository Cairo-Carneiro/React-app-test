import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope,
  faPaperPlane,
  faArrowLeft,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import './fpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica do email
    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor, insira um email válido');
      return;
    }

    // Mostra mensagem de sucesso
    setShowSuccess(true);
    
    // Redireciona após 2 segundos
    setTimeout(() => {
      navigate('/email-verification', { 
        state: { email } // Passa o email como estado
      });
    }, 2000);
  };

  return (
    <div className="password-recovery-page">
      <div className="recovery-container">
        <div className="logo-section">
          <div className="logo-wrapper">
            <FontAwesomeIcon icon={faWhatsapp} className="logo-icon" />
            <span className="logo-text">Whatsbus</span>
          </div>
          <p className="logo-subtitle">API de WhatsApp Profissional</p>
        </div>

        <div className="recovery-content">
          <div className="recovery-header">
            <h1>Recuperar senha</h1>
            <p>Digite seu e-mail para receber um link de recuperação</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-container-row">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <button type="submit" className="send-link-button">
              <FontAwesomeIcon icon={faPaperPlane} />
              Enviar link
            </button>
          </form>

          {showSuccess && (
            <div className="success-message">
              <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
              <p>Redirecionando para verificação de e-mail...</p>
            </div>
          )}

          <div className="back-to-login-container">
            <button 
              className="back-to-login-button"
              onClick={() => navigate('/')}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Voltar para o login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;