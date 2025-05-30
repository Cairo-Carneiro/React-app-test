import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faGoogle } from "@fortawesome/free-brands-svg-icons";
import useAuth from "./hook/useAuth"; // caminho correto para o hook!
import "./signup.css";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      const result = await signup(email, password, name); // envia o nome!
      if (!result.success) throw new Error(result.message);
      setMessage("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message || "Erro ao criar conta");
    } finally {
      setIsLoading(false);
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
        <div className="signup-header">
          <h2 className="signup-title">Crie sua conta</h2>
          <p className="signup-description">
            Comece a usar a Wappfy gratuitamente.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <label className="input-label">Nome completo</label>
          <div className="input-group">
            <div
              className="input-container-row"
              style={{ position: "relative" }}
            >
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Seu nome"
                required
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>
          <label className="input-label">Email</label>
          <div className="input-group">
            <div
              className="input-container-row"
              style={{ position: "relative" }}
            >
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="seu@email.com"
                required
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>
          <label className="input-label">Senha</label>
          <div className="input-group password-wrapper">
            <div
              className="input-container-row"
              style={{ position: "relative" }}
            >
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Digite sua senha"
                required
                minLength="8"
                style={{ paddingLeft: "2.25rem", paddingRight: "2.25rem" }}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <p className="password-hint">Mínimo 8 caracteres.</p>
          <div className="terms-group">
            <input
              type="checkbox"
              id="terms"
              className="terms-checkbox"
              required
            />
            <label htmlFor="terms" className="terms-label">
              Eu concordo com os{" "}
              <span className="terms-link">Termos de Serviço</span> e{" "}
              <span className="terms-link">Política de Privacidade</span>.
            </label>
          </div>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
          <div className="form-divider">
            <div className="divider-line"></div>
            <span className="divider-text">ou</span>
            <div className="divider-line"></div>
          </div>
          <button type="button" className="google-signup">
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Continuar com Google
          </button>
          <div className="login-link">
            <p className="login-text">
              Já tem uma conta?{" "}
              <span className="login-link-text" onClick={() => navigate("/")}>
                Fazer login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
