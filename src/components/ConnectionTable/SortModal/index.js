import React from 'react';
import { 
  faSortAlphaDown, 
  faSortAlphaUp, 
  faCircleCheck, 
  faCircleXmark,
  faClockRotateLeft,
  faClock,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SortModal.module.css';

const SortModal = ({ 
  isOpen,
  onClose,
  selectedSort,
  setSelectedSort,
  applySort,
  resetSorting
}) => {
  const sortOptions = [
    {
      id: 'name-asc',
      label: 'Nome da Conexão (A-Z)',
      icon: faSortAlphaDown
    },
    {
      id: 'name-desc',
      label: 'Nome da Conexão (Z-A)',
      icon: faSortAlphaUp
    },
    {
      id: 'status-online',
      label: 'Status da Conexão (Online primeiro)',
      icon: faCircleCheck
    },
    {
      id: 'status-offline',
      label: 'Status da Conexão (Desconectado primeiro)',
      icon: faCircleXmark
    },
    {
      id: 'recent-first',
      label: 'Mais recente primeiro',
      icon: faClockRotateLeft
    },
    {
      id: 'oldest-first',
      label: 'Mais antigo primeiro',
      icon: faClock
    }
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Ordenar por</h3>
          <button 
            onClick={onClose}
            className={styles.modalClose}
            aria-label="Fechar modal"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles.sortOptions}>
          {sortOptions.map(option => (
            <div
              key={option.id}
              className={`${styles.sortOption} ${selectedSort === option.id ? styles.active : ''}`}
              onClick={() => setSelectedSort(option.id)}
            >
              <div className={styles.optionContent}>
                <FontAwesomeIcon icon={option.icon} className={styles.optionIcon} />
                <span>{option.label}</span>
              </div>
              {selectedSort === option.id && (
                <FontAwesomeIcon 
                  icon="check" 
                  className={styles.checkIcon} 
                />
              )}
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button 
            onClick={resetSorting}
            className={styles.resetButton}
          >
            <FontAwesomeIcon icon="rotate-left" />
            <span>Resetar</span>
          </button>
          <button 
            onClick={applySort}
            className={styles.applyButton}
            disabled={!selectedSort}
          >
            Aplicar Ordenação
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;