import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faXmark, faQrcode, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import QrCode from './Qrcode';
import SuccessModal from './Qrcode/SuccessQR';
import IntegrationsModal from './Qrcode/SuccessQR/Integrations';
import InstanceConfigModal from './Qrcode/SuccessQR/Instance';
import ConfigWeb from '../Configweb';
import DifyModal from '../Dify';
import './novaConect.css';

const NovaConexao = ({ isOpen, onClose }) => {
  const [instanceName, setInstanceName] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [showInstance, setShowInstance] = useState(false);
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [showDifyModal, setShowDifyModal] = useState(false);
  const navigate = useNavigate();
  
  const handleGenerateQRCode = () => {
    if (!instanceName.trim()) {
      alert('Por favor, insira um nome para a instância');
      return;
    }
    setShowQRCode(true);
  };

  const handleBackToForm = () => {
    setShowQRCode(false);
  };

  const handleConnectionSuccess = () => {
    setShowQRCode(false);
    setShowSuccess(true);
  };

  const handleConnectionError = () => {
    setShowQRCode(false);
    setShowError(true);
  };

  const handleRetryConnection = () => {
    setShowError(false);
    setShowQRCode(true);
  };

  const handleOpenIntegrations = () => {
    setShowSuccess(false);
    setShowIntegrations(true);
  };

  const handleOpenInstance = () => {
    setShowSuccess(false);
    setShowInstance(true);
  };

  const handleCloseIntegrations = () => {
    setShowIntegrations(false);
    onClose();
  };

  const handleCloseInstance = () => {
    setShowInstance(false);
    onClose();
  };

  const handleOpenWebhook = () => {
    setShowIntegrations(false);
    setShowWebhookModal(true);
  };

  const handleCloseWebhook = () => {
    setShowWebhookModal(false);
    onClose();
  };

  const handleOpenDify = () => {
    setShowIntegrations(false);
    setShowDifyModal(true);
  };

  const handleCloseDify = () => {
    setShowDifyModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="nova-conexao-container">
        <div className="nova-conexao-backdrop" onClick={onClose}></div>
        
        <div className="nova-conexao-modal">
          {showQRCode ? (
            <>
              <div className="nova-conexao-header">
                <button 
                  className="back-button"
                  onClick={handleBackToForm}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className="header-title">QR Code para {instanceName}</h2>
                <button 
                  className="close-button"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <QrCode 
                instanceName={instanceName}
                onSuccess={handleConnectionSuccess}
                onError={handleConnectionError}
              />
            </>
          ) : (
            <>
              <div className="nova-conexao-header">
                <div className="header-content">
                  <FontAwesomeIcon icon={faTag} className="header-icon" />
                  <h2 className="header-title">Nome da Conexão</h2>
                </div>
                <button 
                  className="close-button"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="nova-conexao-content">
                <div className="input-container">
                  <div className="input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Insira o nome da instância aqui..." 
                      className="name-input"
                      value={instanceName}
                      onChange={(e) => setInstanceName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="qr-button-container">
                  <button 
                    className="qr-button"
                    onClick={handleGenerateQRCode}
                    disabled={!instanceName.trim()}
                  >
                    <FontAwesomeIcon icon={faQrcode} className="qr-icon" />
                    <span>Gerar QRCode</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
        onDashboard={handleOpenInstance} // Alterado para abrir Instance
        onIntegrations={handleOpenIntegrations}
        onInstance={handleOpenInstance} // Nova prop adicionada
      />

      {showIntegrations && (
        <IntegrationsModal 
          onClose={handleCloseIntegrations}
          instanceName={instanceName}
          onWebhookInstance={handleOpenWebhook}
          onDifyInstance={handleOpenDify}
        />
      )}

      {showInstance && (
        <InstanceConfigModal 
          onClose={handleCloseInstance}
          instanceName={instanceName}
          onOpenIntegrations={() => {
            setShowInstance(false);
            setShowIntegrations(true);
          }}
        />
      )}

      {showWebhookModal && (
        <ConfigWeb
          isOpen={showWebhookModal}
          onClose={handleCloseWebhook}
          connection={{ name: instanceName }}
        />
      )}

      {showDifyModal && (
        <DifyModal
          isOpen={showDifyModal}
          onClose={handleCloseDify}
          connection={{ name: instanceName }}
        />
      )}
    </>
  );
};

export default NovaConexao;