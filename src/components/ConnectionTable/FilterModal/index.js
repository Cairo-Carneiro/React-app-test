import React from 'react';
import styles from './FilterModal.module.css';
import { FaXmark, FaCheck, FaRotateLeft } from 'react-icons/fa6';

const FilterModal = ({
  isOpen,
  activeFilters,
  toggleFilter,
  onClose,
  resetFilters
}) => {
  const filterOptions = [
    {
      id: 'online',
      label: 'Online',
      description: 'Conexões ativas e funcionando',
      color: '#00FF99'
    },
    {
      id: 'connecting',
      label: 'Conectando',
      description: 'Conexões em processo de inicialização',
      color: '#3b82f6'
    },
    {
      id: 'disconnected',
      label: 'Desconectado',
      description: 'Conexões temporariamente inativas',
      color: '#f59e0b'
    },
    {
      id: 'error',
      label: 'Erro',
      description: 'Conexões com problemas técnicos',
      color: '#ef4444'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Filtrar Conexões</h3>
          <button 
            className={styles.modalClose}
            onClick={onClose}
          >
            <FaXmark />
          </button>
        </div>

        <div className={styles.filterOptions}>
          {filterOptions.map((option) => (
            <label
              key={option.id}
              className={`${styles.filterOption} ${activeFilters[option.id] ? styles.active : ''}`}
              onClick={() => toggleFilter(option.id)}
            >
              <div className={styles.optionContent}>
                <span 
                  className={styles.statusIndicator} 
                  style={{ backgroundColor: option.color }} 
                />
                <div>
                  <span>{option.label}</span>
                  <p>{option.description}</p>
                </div>
              </div>
              <div className={styles.filterCheckbox}>
                {activeFilters[option.id] && <FaCheck />}
              </div>
            </label>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.resetButton}
            onClick={resetFilters}
          >
            <FaRotateLeft /> Limpar
          </button>
          <button 
            className={styles.applyButton}
            onClick={onClose}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;