import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicionando navegação
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import './signup.css';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate(); // Hook para redirecionamento
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(email, password);
      if (!result.success) {
        setError(result.message);
      } else {
        navigate('/'); // Redireciona para o login após cadastro bem-sucedido
      }
    } catch (err) {
      setError('Erro ao criar conta');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="logo-section">
          <div className="logo-wrapper">
            <FontAwesomeIcon icon={faWhatsapp} className="logo-icon" />
            <span className="logo-text">Wappfy</span>
          </div>
          <p className="logo-subtitle">API de WhatsApp Profissional</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label className="input-label">Nome completo</label>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Seu nome"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-wrapper">
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

          <div className="input-group">
            <label className="input-label">Senha</label>
            <div className="input-wrapper password-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Digite sua senha"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <Button type="submit" className="signup-button">
            Criar conta
          </Button>

          <div className="login-link">
            <p className="login-text">
              Já tem uma conta?{' '}
              <span className="login-link-text" onClick={() => navigate('/')}>Fazer login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
