import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTriangleExclamation,
  faXmark,
  faCircleQuestion,
  faCircleCheck,
  faHeadset,
  faRotate
} from '@fortawesome/free-solid-svg-icons';
import './error.css';

const ErrorModal = ({ isOpen, onClose, onRetry }) => {
  if (!isOpen) return null;

  const handleCopyLog = () => {
    const logText = "Error: Connection timeout after QR code scan. Please try again.";
    navigator.clipboard.writeText(logText);
  };

  return (
    <div className="error-modal-container">
      {/* Modal Backdrop */}
      <div className="error-modal-backdrop" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="error-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="error-modal-header">
          <div className="error-header-content">
            <div className="error-icon-container">
              <FontAwesomeIcon icon={faTriangleExclamation} className="error-icon" />
            </div>
            <h2 className="error-title">Falha na Conexão</h2>
          </div>
          <button className="error-close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className="error-close-icon" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="error-modal-content">
          {/* Error Message */}
          <div className="error-details">
            <div className="error-icon-large-container">
              <FontAwesomeIcon icon={faCircleQuestion} className="error-icon-large" />
            </div>
            <div className="error-message">
              <h3 className="error-message-title">Não foi possível estabelecer conexão</h3>
              <p className="error-description">
                O QR Code foi lido, mas houve um problema ao conectar com o WhatsApp.
              </p>
            </div>
          </div>

          {/* Error Log */}
          <div className="error-log">
            <div className="log-header">
              <span className="log-title">Detalhes do Erro</span>
              <button className="copy-button" onClick={handleCopyLog}>
                Copiar Log
              </button>
            </div>
            <div className="log-content">
              <code className="log-text">
                Error: Connection timeout after QR code scan. Please try again.
              </code>
            </div>
          </div>

          {/* Troubleshooting Steps */}
          <div className="troubleshooting">
            <h4 className="troubleshooting-title">Possíveis Soluções:</h4>
            <ul className="solutions-list">
              <li className="solution-item">
                <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
                Verifique se o WhatsApp está atualizado
              </li>
              <li className="solution-item">
                <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
                Tente excluir e criar outra instância
              </li>
              <li className="solution-item">
                <FontAwesomeIcon icon={faCircleCheck} className="check-icon" />
                Verifique sua conexão com a internet
              </li>
            </ul>
          </div>

          {/* Support Link */}
          <div className="support-link">
            <a href="#" className="support-button">
              <FontAwesomeIcon icon={faHeadset} className="support-icon" />
              Contatar Suporte Técnico
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="error-modal-footer">
          <button className="error-secondary-button" onClick={onClose}>
            Fechar
          </button>
          <button className="error-primary-button" onClick={onRetry}>
            <FontAwesomeIcon icon={faRotate} className="retry-icon" />
            Tentar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;