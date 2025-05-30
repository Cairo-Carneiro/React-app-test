import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGoogle, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faEye, 
  faEyeSlash 
} from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import './login.css';

const Signin = () => {
  const { signin, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signin(email, password);
      if (!result.success) {
        setError(result.message);
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro durante o login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await googleSignIn();
      navigate('/home');
    } catch (error) {
      console.error('Erro no login com Google:', error);
      setError('Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-page">
      <div id="login-container">
        <div id="logo-section">
          <div className="logo-wrapper">
            <FontAwesomeIcon icon={faWhatsapp} className="logo-icon" />
            <span className="logo-text">Wappfy</span>
          </div>
          <p className="logo-subtitle">API de WhatsApp Profissional</p>
        </div>

        <form id="login-form" onSubmit={handleSubmit}>
          <label className="input-label">Email</label>
          <div className="input-group">
            <div className="input-container-row">
              <FontAwesomeIcon 
                icon={faEnvelope} 
                className="input-icon" 
              />
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
 
          <label className="input-label">Senha</label>
          <div className="input-group">
            <div className="input-container-row">
              <FontAwesomeIcon 
                icon={faLock} 
                className="input-icon" 
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">ou</span>
            <div className="divider-line"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="google-button"
          >
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Continuar com Google
          </button>

          <div className="additional-links">
            <Link 
              to="/forgot-password"
              className="forgot-password"
            >
              Esqueci minha senha
            </Link>
            <div className="signup-text">
              Não tem uma conta?{' '}
              <Link 
                to="/signup"
                className="signup-link"
              >
                Criar agora
              </Link>
            </div>
          </div>
        </form>

        {showSignupSuccess && (
          <div className="popup-success">
            Conta criada com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;