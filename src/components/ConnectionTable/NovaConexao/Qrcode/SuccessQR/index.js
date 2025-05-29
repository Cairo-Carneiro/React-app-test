import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faChartSimple, faPlug } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import InstanceConfigModal from './Instance';
import './successqr.css';

const SuccessModal = ({ isOpen, onClose, onDashboard, onIntegrations, onInstance }) => {
  const [showInstance, setShowInstance] = React.useState(false);
  const [instanceName, setInstanceName] = React.useState('Instância Principal');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleInstanceClick = (e) => {
    e.stopPropagation();
    onClose?.();
    navigate('/connections'); // Navigate to ConnectionTable
  };

  return (
    <>
      <div className="success-modal-container">
        <div className="success-modal-backdrop" onClick={onClose}></div>
        
        <div className="success-modal">
          {/* Modal Header */}
          <div className="success-modal-header">
            <h2 className="success-modal-title">Conexão Estabelecida</h2>
            <button 
              className="success-modal-close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="success-modal-content">
            <div className="success-animation">
              <div className="success-icon-container">
                <FontAwesomeIcon icon={faCheck} className="success-icon" />
              </div>
              <h3 className="success-title">WhatsApp conectado com sucesso!</h3>
              <p className="success-message">Sua instância está pronta para uso</p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="success-modal-footer">
            <button 
              className="success-button dashboard-button"
              onClick={handleInstanceClick}
            >
              <FontAwesomeIcon icon={faChartSimple} />
              <span>Ir para Dashboard</span>
            </button>
            <button 
              className="success-button integrations-button"
              onClick={(e) => {
                e.stopPropagation();
                onIntegrations?.();
              }}
            >
              <FontAwesomeIcon icon={faPlug} />
              <span>Integrações</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Instance */}
      {showInstance && (
        <InstanceConfigModal 
          onClose={() => setShowInstance(false)}
          instanceName={instanceName}
          onOpenIntegrations={() => {
            setShowInstance(false);
            onIntegrations?.();
          }}
        />
      )}
    </>
  );
};

export default SuccessModal;