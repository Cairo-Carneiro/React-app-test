import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import ErrorModal from './ErrorQR';
import './qrcode.css';

const QrCode = ({ instanceName, onSuccess, onError }) => {
  const [qrCode, setQrCode] = useState('');
  const [status, setStatus] = useState('Preparando conexão...');
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const isMounted = useRef(true);
  const userInteracted = useRef(false);

  // Geração do QR Code
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true);
        setStatus('Gerando QR Code...');
        
        // Substitua por sua API real
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!isMounted.current) return;
        
        const mockQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(instanceName)}_${Date.now()}`;
        setQrCode(mockQrCode);
        setStatus('Aguardando leitura...');
      } catch (error) {
        if (!isMounted.current) return;
        console.error('Erro na geração:', error);
        setStatus('Falha na geração');
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    generateQRCode();

    return () => {
      isMounted.current = false;
    };
  }, [instanceName]);

  // Funções de controle
  const handleRefresh = () => {
    userInteracted.current = true;
    setQrCode('');
    setIsLoading(true);
  };

  const handleUserError = () => {
    userInteracted.current = true;
    setShowErrorModal(true);
  };

  const handleUserSuccess = () => {
    userInteracted.current = true;
    onSuccess();
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleRetry = () => {
    setShowErrorModal(false);
    handleRefresh();
  };

  return (
    <>
      <div className="qr-modal-content">
        <div className="qr-instructions">
          <p>Leia esse código no WhatsApp para conectar <strong>{instanceName}</strong></p>
        </div>
        
        <div className="qr-code-container">
          {isLoading ? (
            <div className="qr-loader">
              <FontAwesomeIcon icon={faSpinner} spin className="qr-spinner" />
            </div>
          ) : (
            <>
              {qrCode && <img src={qrCode} alt={`QR Code ${instanceName}`} />}
              <button 
                className="qr-refresh-button"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
            </>
          )}
        </div>

        <div className="qr-status">
          <div className="status-indicator">
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="qr-spinner" />
            ) : (
              <div className="status-pulse"></div>
            )}
            <span>{status}</span>
          </div>
          
          <div className="qr-action-buttons">
            <button 
              className="qr-error-button"
              onClick={handleUserError}
              disabled={isLoading}
            >
              Reportar problema
            </button>
            <button 
              className="qr-success-button"
              onClick={handleUserSuccess}
              disabled={isLoading || !qrCode}
            >
              Concluído
            </button>
          </div>
        </div>
      </div>

      <ErrorModal 
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        onRetry={handleRetry}
      />
    </>
  );
};

export default QrCode;