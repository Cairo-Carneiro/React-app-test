import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {
  FaFileAlt,
  FaRegBell,
  FaChevronDown,
  FaCog,
  FaHandshake,
  FaHeadset,
  FaRocket
} from 'react-icons/fa';
import { FaRightFromBracket } from 'react-icons/fa6';
import { FaTriangleExclamation } from 'react-icons/fa6';
import NotificationsModal from '../Notifications';
import { Menu } from 'primereact/menu';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // ou outro tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './header.css'; // Importando o CSS do Header


const languageOptions = {
  pt: { label: 'Português', flag: '🇧🇷' },
  en: { label: 'English', flag: '🇺🇸' },
  es: { label: 'Español', flag: '🇪🇸' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  fr: { label: 'Français', flag: '🇫🇷' },
  it: { label: 'Italiano', flag: '🇮🇹' },
  ja: { label: '日本語', flag: '🇯🇵' },
  zh: { label: '中文', flag: '🇨🇳' },
  ru: { label: 'Русский', flag: '🇷🇺' },
  ko: { label: '한국어', flag: '🇰🇷' }
};

const Header = () => {
  const { signed, user, signout } = useAuth();
  const navigate = useNavigate();

  const [language, setLanguage] = useState('pt');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef();
  const profileMenu = useRef(null);
  const profileRef = useRef(null);

  const profileMenuItems = [
    {
      template: () => (
        <div className="p-menu-header" style={{ padding: 16, borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              alt="Profile"
              style={{ width: 48, height: 48, borderRadius: '50%' }}
            />
            <div>
              <div style={{ fontWeight: 600 }}>João Silva</div>
              <div style={{ fontSize: 13, color: '#888' }}>joao.silva@email.com</div>
              <span className="plan-badge" style={{ fontSize: 12, background: '#e0e7ff', color: '#3730a3', padding: '2px 8px', borderRadius: 8, marginTop: 4, display: 'inline-block' }}>Plano Pro</span>
              <div style={{ marginTop: 6, width: 100 }}>
                <div style={{ background: '#eee', borderRadius: 4, height: 6, width: '100%' }}>
                  <div style={{ background: '#6366f1', width: '75%', height: 6, borderRadius: 4 }}></div>
                </div>
                <span style={{ fontSize: 11, color: '#6366f1' }}>75%</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    { separator: true },
    {
      label: 'Configurações de Conta',
      icon: 'pi pi-cog',
      command: () => navigate('/configuracoes')
    },
    {
      label: 'Se tornar Wappfy Partner',
      icon: 'pi pi-users',
      command: () => window.open('https://wappfy.com.br/partner', '_blank')
    },
    {
      label: 'Contato do Suporte',
      icon: 'pi pi-headphones',
      command: () => window.open('mailto:suporte@wappfy.com.br')
    },
    {
      label: 'Outras Soluções',
      icon: 'pi pi-send',
      command: () => window.open('https://wappfy.com.br/solucoes', '_blank')
    },
    { separator: true },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      className: 'p-menuitem-danger',
      command: () => setShowLogoutModal(true)
    }
  ];

  // Ouvinte para mudanças de autenticação
  useEffect(() => {
    const handleAuthChange = () => {
      // Força atualização quando o auth mudar
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && languageOptions[storedLang]) {
      setLanguage(storedLang);
    }
  }, []);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      // Checagem extra para evitar erro
      if (
        profileMenu.current &&
        profileMenu.current.container &&
        typeof profileMenu.current.hide === 'function' &&
        !profileMenu.current.container.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        profileMenu.current.hide();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setShowLogoutModal(true);
      setShowProfile(false);
      await signout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!signed) return null;

  if (isLoggingOut) {
    return (
      <div className="logout-loading-screen">
        <p>Saindo da conta...</p>
      </div>
    );
  }

  return (
    <>
      <header id="header" className="header">
        <div className="header-container">
          <div className="header-left">
            <div className="logo">Wappfy</div>
            <div className="connection-counter">
              <span>3/10 conexões ativas</span>
            </div>
          </div>

          <div className="header-right">
            <a
              href="https://docs.wappfy.com.br/pt/introducao"
              target="_blank"
              rel="noopener noreferrer"
              className="header-button"
            >
              <FaFileAlt className="icon" /> Documentação
            </a>

            <div className="header-actions">
              <div className="language-selector" ref={dropdownRef}>
                <button
                  className="language-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>
                    {languageOptions[language]?.flag} {language.toUpperCase()}
                  </span>
                  <FaChevronDown className="ml-1 text-xs" />
                </button>

                {showDropdown && (
                  <div className="language-dropdown">
                    {Object.entries(languageOptions).map(([code, { label, flag }]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code)}
                        className="dropdown-item"
                      >
                        <span className="language-flag">{flag}</span>
                        <span className="language-label">{label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="notification-wrapper">
                <button
                  className="notification-button"
                  onClick={() => setShowNotifications(true)}
                >
                  <FaRegBell className="icon" />
                  {notificationCount > 0 && (
                    <span className="notification-badge">{notificationCount}</span>
                  )}
                </button>
              </div>

              <div
                className="profile"
                ref={profileRef}
                onClick={(e) => profileMenu.current.toggle(e)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  className="profile-image"
                  alt="Foto de perfil do usuário"
                />
                <FaChevronDown className="profile-chevron" />
              </div>
              <Menu
                model={profileMenuItems}
                popup
                ref={profileMenu}
                className="profile-pmenu"
              />
            </div>
          </div>
        </div>
      </header>

      {showNotifications && (
        <NotificationsModal
          onClose={() => setShowNotifications(false)}
          notificationCount={notificationCount}
        />
      )}

      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <FaTriangleExclamation className="warning-icon" />
              <h2>Confirmar Logout</h2>
              <p>Tem certeza que deseja sair da sua conta?</p>
              <div className="modal-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="confirm-button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? 'Saindo...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;