// configweb.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faXmark, 
  faCircleQuestion,
  faInfoCircle,
  faMessage
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './configweb.css';

const ConfigWeb = ({ isOpen, onClose, connection }) => {
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [perEventWebhook, setPerEventWebhook] = useState(false);
  const [urlError, setUrlError] = useState('');

  if (!isOpen) return null;

  const events = [
    {
      id: 'message',
      label: 'Mensagens',
      description: 'Notificações de novas mensagens recebidas'
    },
    {
      id: 'message-status',
      label: 'Status de Mensagem',
      description: 'Atualizações de status (enviado, entregue, lido)'
    },
    {
      id: 'presence-update',
      label: 'Presença',
      description: 'Mudanças de status online/offline dos contatos'
    },
    {
      id: 'group-update',
      label: 'Grupos',
      description: 'Atualizações em grupos (membros, configurações)'
    },
    {
      id: 'qr-code',
      label: 'QR Code',
      description: 'Notificações de novo QR code para reconexão'
    },
    {
      id: 'connection-update',
      label: 'Conexão',
      description: 'Mudanças no estado da conexão'
    }
  ];

  const validateUrl = (url) => {
    try {
      new URL(url);
      setUrlError('');
      return true;
    } catch {
      setUrlError('URL inválida. Insira uma URL completa começando com http:// ou https://');
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setWebhookUrl(url);
    if (url) validateUrl(url);
    else setUrlError('');
  };

  const handleEventToggle = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(e => e !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSave = () => {
    if (!webhookUrl || !validateUrl(webhookUrl)) {
      return;
    }

    // Implementar lógica de salvamento
    console.log({
      webhookEnabled,
      webhookUrl,
      selectedEvents,
      perEventWebhook,
      connection
    });
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="webhook-config-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <FontAwesomeIcon icon={faWhatsapp} className="header-icon" />
            <div className="header-text">
              <h2 className="modal-title">Configurar Webhook</h2>
              <div className="connection-info">
                <span className="instance-name">{connection?.instance}</span>
                <span className="connection-number">{connection?.number}</span>
              </div>
            </div>
          </div>
          <button 
            className="close-button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="modal-content">
          {/* Status Toggle */}
          <div className="status-toggle-container">
            <span className="status-label">Status do Webhook</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={webhookEnabled}
                onChange={(e) => setWebhookEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* URL Input */}
          <div className="url-input-container">
            <label className="url-label">URL do Webhook</label>
            <div className="url-input-wrapper">
              <input
                type="url"
                className={`url-input ${urlError ? 'url-input-error' : ''}`}
                value={webhookUrl}
                onChange={handleUrlChange}
                placeholder="https://sua-url.com/webhook"
                disabled={!webhookEnabled}
              />
              {urlError && (
                <div className="url-error-message">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>{urlError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div className="events-container">
            <label className="events-label">Eventos</label>
            <div className="events-tags">
              {events.map(event => (
                <div key={event.id} className="event-tag-wrapper">
                  <button
                    onClick={() => handleEventToggle(event.id)}
                    className={`event-tag ${
                      selectedEvents.includes(event.id) 
                        ? 'event-tag-active' 
                        : 'event-tag-default'
                    }`}
                    disabled={!webhookEnabled}
                  >
                    {event.label}
                  </button>
                  <div className="event-tooltip">
                    {event.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook per Event Toggle */}
          <div className="webhook-toggle-container">
            <div className="webhook-toggle-content">
              <span className="webhook-toggle-label">
                Webhook por Evento
              </span>
              <div className="help-tooltip-wrapper">
                <button className="help-button">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </button>
                <div className="help-tooltip">
                  Permite configurar URLs diferentes para cada tipo de evento.
                  Útil para processar eventos em endpoints separados.
                </div>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={perEventWebhook}
                onChange={(e) => setPerEventWebhook(e.target.checked)}
                disabled={!webhookEnabled}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Documentation Link */}
          <p className="documentation-link">
            Leia nossa{' '}
                            <a href="#" target="_blank" rel="noopener noreferrer">
              documentação
            </a>
            {' '}para mais informações sobre webhooks.
          </p>
        </div>

        <div className="modal-footer">
          <button 
            className="cancel-button"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="save-button"
            onClick={handleSave}
            disabled={!webhookEnabled || !webhookUrl || urlError}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigWeb;
