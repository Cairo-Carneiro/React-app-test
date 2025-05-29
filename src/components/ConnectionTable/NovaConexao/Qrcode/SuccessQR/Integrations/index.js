import React, { useState } from 'react';
import { 
  faPuzzlePiece, 
  faChartLine, 
  faNetworkWired,
  faCircleQuestion,
  faLink,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const IntegrationsModal = ({ onClose, instanceName, onWebhookInstance, onDifyInstance }) => {
  const integrations = [
    {
      id: 'webhooks',
      title: 'Webhooks',
      icon: faLink,
      color: 'red',
      description: 'Crie integrações personalizadas enviando dados para URLs específicas. Ideal para sistemas que aceitam webhooks como método de comunicação.',
      tooltip: 'Configure webhooks para enviar dados automaticamente para outras plataformas em tempo real'
    },
    {
      id: 'make',
      title: 'Make',
      icon: faPuzzlePiece,
      color: 'purple',
      description: 'Plataforma de automação visual que permite criar fluxos de trabalho complexos sem código, conectando múltiplos serviços.',
      tooltip: 'Crie cenários automatizados com Make para processar e distribuir dados entre diferentes aplicativos'
    },
    {
      id: 'highlevel',
      title: 'HighLevel',
      icon: faChartLine,
      color: 'green',
      description: 'Plataforma all-in-one de marketing e vendas que permite automatizar campanhas, gerenciar leads e criar funis de conversão.',
      tooltip: 'Sincronize dados com HighLevel para otimizar suas campanhas de marketing e vendas'
    },
    {
      id: 'n8n-agents',
      title: 'N8N Agents',
      icon: faNetworkWired,
      color: 'custom-pink',
      description: 'Plataforma de automação de workflow que permite criar agentes automatizados para processar e transformar dados entre diferentes sistemas.',
      tooltip: 'Automatize fluxos de trabalho complexos com agentes inteligentes e nós personalizáveis'
    },
    {
      id: 'dify',
      title: 'Dify',
      icon: faPuzzlePiece,
      color: 'blue',
      description: 'Plataforma de IA que permite criar e gerenciar aplicações baseadas em IA de forma simples e eficiente.',
      tooltip: 'Integre sua aplicação com Dify para adicionar recursos de IA'
    }
  ];

  const handleConnect = (integrationId) => {
    onClose?.();
    onWebhookInstance?.();
  };

  const handleFinish = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/connections');
    if (onClose) onClose();
  };

  return (
    <div className="integrations-container">
      <div className="modal-backdrop"></div>

      <div className="integrations-modal">
        <div className="modal-header">
          <div className="header-content">
            <h2>Integrações {instanceName && `para ${instanceName}`}</h2>
          </div>
          <button className="close-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="modal-content">
          <div className="integration-grid">
            {integrations.map((integration) => (
              <div 
                key={integration.id} 
                className={`integration-card ${integration.color}`}
              >
                <div className="card-header">
                  <div className="card-title">
                    <FontAwesomeIcon icon={integration.icon} />
                    <span>{integration.title}</span>
                  </div>
                  <div className="card-actions">
                    <div className="tooltip-container">
                      <button className="tooltip-button">
                        <FontAwesomeIcon icon={faCircleQuestion} />
                        <span className="tooltip-text">{integration.tooltip}</span>
                      </button>
                    </div>
                    <button className="youtube-button">
                      <FontAwesomeIcon icon={faYoutube} />
                    </button>
                  </div>
                </div>
                <p className="card-description">{integration.description}</p>
                <button 
                  className={`connect-button ${integration.color}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (integration.id === 'make') {
                      window.open('https://www.make.com/en/login', '_blank');
                    } else if (integration.id === 'n8n-agents') {
                      window.open('https://n8n.io/?gad_source=1&gad_campaignid=22416154450&gbraid=0AAAAA-uF9WCMOCX33khDMjuCW1HVNJyHT&gclid=CjwKCAjw24vBBhABEiwANFG7yxymzd34hrjPx_mQh7aUa8806vWZjWsHGGMhJirmmfigt9fsT1GNXxoCY3QQAvD_BwE', '_blank');
                    } else if (integration.id === 'highlevel') {
                      window.open('https://marketplace.leadconnectorhq.com/oauth/chooselocation?response_type=code&redirect_uri=https://dash.wappfy.com.br/leadconnector&client_id=66918be52e5e272f4e962463-m1l81eg5&scope=conversations/message.readonly%20conversations/message.write%20conversations.readonly%20conversations.write%20contacts.readonly%20contacts.write%20opportunities.readonly%20opportunities.write%20users.readonly%20workflows.readonly%20conversations/reports.readonly', '_blank');
                    } else if (integration.id === 'webhooks') {
                      if (typeof onWebhookInstance === 'function') onWebhookInstance();
                    } else if (integration.id === 'dify') {
                      if (typeof onDifyInstance === 'function') onDifyInstance();
                    } else {
                      handleConnect(integration.id);
                    }
                  }}
                >
                  Conectar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="finish-button" onClick={handleFinish}>
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsModal;
