import React, { useState } from 'react';
import { 
  faXmark, 
  faPuzzlePiece, 
  faChartLine, 
  faNetworkWired,
  faCircleQuestion,
  faLink,
  faPen,
  faArrowsRotate,
  faTrash,
  faUsersSlash,
  faCircle,
  faEye,
  faPhoneSlash
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IntegrationsModal from '../Integrations';
import ConfigWeb from '../../../../Configweb';
import DifyModal from '../../../../Dify';
import './instance.css';

const InstanceConfigModal = ({ onClose, instanceName = "Instância Principal", onOpenIntegrations, connection }) => {
  const [settings, setSettings] = React.useState({
    ignoreGroups: false,
    alwaysOnline: false,
    viewMessages: false,
    rejectCalls: false,
    missedCallMessage: ""
  });
  const [showIntegrations, setShowIntegrations] = React.useState(false);
  const [showWebhookModal, setShowWebhookModal] = React.useState(false);
  const [showDifyModal, setShowDifyModal] = React.useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  // Use connection data if available
  const displayName = connection ? connection.name : instanceName;

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleMessageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      missedCallMessage: e.target.value
    }));
  };

  const handleIntegrationsClick = (e) => {
    e.stopPropagation();
    setShowIntegrations(true);
  };

  const handleCloseIntegrations = () => {
    setShowIntegrations(false);
  };

  const handleOpenIntegrations = () => {
    setShowIntegrations(true);
  };

  const handleOpenConfigWeb = () => {
    setShowIntegrations(false);
    setShowWebhookModal(true);
  };

  const handleOpenDify = () => {
    setShowIntegrations(false);
    setShowDifyModal(true);
  };

  return (
    <>
      <div className="modal-container">
        {/* Modal Backdrop */}
        <div className="modal-backdrop" onClick={onClose}></div>

        {/* Modal Content */}
        <div className="modal instance-modal">
          {/* Modal Header */}
          <div className="modal-header">
            <div className="header-content">
              <h2>Configurar Instância</h2>
            </div>
            <div className="header-actions">
              <div className="action-group">
                <button className="icon-button" title="Reestabelecer">
                  <FontAwesomeIcon icon={faArrowsRotate} className="text-emerald-400" />
                </button>
                <span className="action-label">Reestabelecer</span>
              </div>
              <button className="icon-button" title="Excluir">
                <FontAwesomeIcon icon={faTrash} className="text-red-400" />
              </button>
              <button className="icon-button" onClick={onClose} title="Fechar">
                <FontAwesomeIcon icon={faXmark} className="text-white/70 text-xl" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Instance Name */}
            <div className="instance-name-section">
              <div className="instance-name-content">
                <FontAwesomeIcon icon={faWhatsapp} className="text-emerald-400 text-2xl" />
                <input 
                  type="text" 
                  value={displayName}
                  readOnly
                  className="instance-name-input"
                />
              </div>
              <button className="icon-button">
                <FontAwesomeIcon icon={faPen} className="text-white/70" />
              </button>
            </div>

            {/* Advanced Settings */}
            <div className="settings-section">
              <div className="setting-item">
                <div className="setting-info">
                  <FontAwesomeIcon icon={faUsersSlash} className="text-blue-400" />
                  <span>Ignorar Grupos</span>
                </div>
                <ToggleSwitch 
                  checked={settings.ignoreGroups}
                  onChange={() => handleSettingToggle('ignoreGroups')}
                />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <FontAwesomeIcon icon={faCircle} className="text-green-400" />
                  <span>Sempre Online</span>
                </div>
                <ToggleSwitch 
                  checked={settings.alwaysOnline}
                  onChange={() => handleSettingToggle('alwaysOnline')}
                />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <FontAwesomeIcon icon={faEye} className="text-purple-400" />
                  <span>Visualizar Mensagens</span>
                </div>
                <ToggleSwitch 
                  checked={settings.viewMessages}
                  onChange={() => handleSettingToggle('viewMessages')}
                />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <FontAwesomeIcon icon={faPhoneSlash} className="text-red-400" />
                  <span>Rejeitar Chamadas</span>
                </div>
                <ToggleSwitch 
                  checked={settings.rejectCalls}
                  onChange={() => handleSettingToggle('rejectCalls')}
                />
              </div>
            </div>

            {/* Missed Call Message */}
            {settings.rejectCalls && (
              <div className="message-section">
                <label className="message-label">Mensagem para Chamadas Perdidas</label>
                <textarea
                  className="message-input"
                  value={settings.missedCallMessage}
                  onChange={handleMessageChange}
                  placeholder="Digite a mensagem que será enviada quando uma chamada for rejeitada..."
                />
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <div className="footer-buttons">
              <button className="action-button" onClick={handleIntegrationsClick}>
                <FontAwesomeIcon icon={faLink} className="text-blue-400" />
                <span>Integrações</span>
              </button>
              <button className="action-button">
                <FontAwesomeIcon icon={faPuzzlePiece} className="text-purple-400" />
                <span>Compartilhamento</span>
              </button>
            </div>
            <button className="save-button">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      {showIntegrations && (
        <IntegrationsModal
          onClose={handleCloseIntegrations}
          instanceName={displayName}
          onWebhookInstance={handleOpenConfigWeb}
          onDifyInstance={handleOpenDify}
        />
      )}

      {showWebhookModal && (
        <ConfigWeb
          isOpen={showWebhookModal}
          onClose={() => setShowWebhookModal(false)}
          connection={connection}
        />
      )}

      {showDifyModal && (
        <DifyModal
          isOpen={showDifyModal}
          onClose={() => setShowDifyModal(false)}
          connection={connection}
        />
      )}
    </>
  );
};

// Componente auxiliar para o toggle switch
const ToggleSwitch = ({ checked, onChange }) => (
  <label className="toggle-switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider"></span>
  </label>
);

export default InstanceConfigModal;