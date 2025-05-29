import React, { useState } from 'react';
import { 
  FaBell, 
  FaTimes, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaInfoCircle, 
  FaCog,
  FaListUl
} from 'react-icons/fa';
import './notifications.css';

const languageFlags = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
  de: '🇩🇪'
};

const NotificationsModal = ({ onClose, notificationCount = 5 }) => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      icon: <FaCheckCircle className="notification-icon success" />,
      message: 'Conexão estabelecida com sucesso!',
      time: '5 min atrás',
      language: 'pt'
    },
    {
      id: 2,
      type: 'warning',
      icon: <FaExclamationTriangle className="notification-icon warning" />,
      message: 'Connection instability detected in XYZ.',
      time: '15 min ago',
      language: 'en'
    },
    {
      id: 3,
      type: 'error',
      icon: <FaTimesCircle className="notification-icon error" />,
      message: 'Error connecting API Key. Please check your credentials.',
      time: '30 min ago',
      language: 'en'
    },
    {
      id: 4,
      type: 'info',
      icon: <FaInfoCircle className="notification-icon info" />,
      message: 'Nueva actualización disponible para la API.',
      time: '1h atrás',
      language: 'es'
    },
    {
      id: 5,
      type: 'system',
      icon: <FaCog className="notification-icon system" />,
      message: 'Geplante Wartung am 25.03.2025.',
      time: '2h ago',
      language: 'de'
    }
  ]);

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="notifications-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <FaBell className="header-icon" />
            <h3>Notificações</h3>
            <span className="notification-count">{notificationCount}</span>
          </div>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* List */}
        <div className="notifications-list">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <div className="icon-container">
                {notification.icon}
              </div>
              <div className="notification-content">
                <div className="message-header">
                  <span className="language-flag">{languageFlags[notification.language]}</span>
                  <p className="message">{notification.message}</p>
                </div>
                <p className="time">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="view-all-btn">
            <FaListUl className="btn-icon" />
            Ver todas as notificações
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationsModal;