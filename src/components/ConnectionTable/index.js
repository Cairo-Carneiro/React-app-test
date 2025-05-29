import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFilter, faSort, faEllipsisVertical, faEye } from '@fortawesome/free-solid-svg-icons';
import FilterModal from './FilterModal';
import SortModal from './SortModal';
import styles from './ConnectionTable.module.css';
import NovaConexao from './NovaConexao/novaConect';
import ConfigWeb from './Configweb';
import InstanceConfigModal from './NovaConexao/Qrcode/SuccessQR/Instance';

const ConnectionTable = () => {
  // Dados originais das conexões
  const originalConnections = [
    {
      id: 1,
      name: 'Conexão Principal',
      number: '+55 11 99999-9999',
      instance: 'instance_001',
      status: 'online',
      lastActive: '2023-05-15T10:30:00'
    },
    {
      id: 2,
      name: 'Conexão Secundária',
      number: '+55 11 88888-8888',
      instance: 'instance_002',
      status: 'connecting',
      lastActive: '2023-05-16T11:45:00'
    },
    {
      id: 3,
      name: 'Conexão Terciária',
      number: '+55 11 77777-7777',
      instance: 'instance_003',
      status: 'error',
      lastActive: '2023-05-14T09:15:00'
    },
    {
      id: 4,
      name: 'Conexão Marketing',
      number: '+55 11 66666-6666',
      instance: 'instance_004',
      status: 'disconnected',
      lastActive: '2023-05-13T14:20:00'
    },
    {
      id: 5,
      name: 'Conexão Suporte',
      number: '+55 11 55555-5555',
      instance: 'instance_005',
      status: 'disconnected',
      lastActive: '2023-05-12T16:10:00'
    },
    {
      id: 6,
      name: 'Conexão Vendas',
      number: '+55 11 44444-4444',
      instance: 'instance_006',
      status: 'disconnected',
      lastActive: '2023-05-17T08:45:00'
    },
    {
      id: 7,
      name: 'Conexão Atendimento',
      number: '+55 11 33333-3333',
      instance: 'instance_007',
      status: 'error',
      lastActive: '2023-05-11T13:25:00'
    }
  ];

  // Estados do componente
  const [connections, setConnections] = useState([...originalConnections]);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [novaConexaoOpen, setNovaConexaoOpen] = useState(false);
  const [configWebOpen, setConfigWebOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [currentSort, setCurrentSort] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    online: false,
    connecting: false,
    error: false,
    disconnected: false
  });
  const [showInstance, setShowInstance] = useState(false);

  // Obter estilos de status
  const getStatusStyles = (status) => {
    const statusMap = {
      online: { color: '#00FF99', text: 'Online' },
      connecting: { color: '#3b82f6', text: 'Conectando' },
      error: { color: '#ef4444', text: 'Erro' },
      disconnected: { color: '#f59e0b', text: 'Desconectado' },
    };
    return statusMap[status] || { color: '#9ca3af', text: 'Desconhecido' };
  };

  // Função de ordenação
  const sortConnections = (sortType) => {
    let sorted = [...originalConnections];
    
    const sortFunctions = {
      'name-asc': (a, b) => a.name.localeCompare(b.name),
      'name-desc': (a, b) => b.name.localeCompare(a.name),
      'status-online': (a, b) => {
        const order = { online: 1, connecting: 2, error: 3, disconnected: 4 };
        return order[a.status] - order[b.status];
      },
      'status-offline': (a, b) => {
        const order = { online: 4, connecting: 3, error: 2, disconnected: 1 };
        return order[a.status] - order[b.status];
      },
      'recent-first': (a, b) => new Date(b.lastActive) - new Date(a.lastActive),
      'oldest-first': (a, b) => new Date(a.lastActive) - new Date(b.lastActive),
    };

    if (sortFunctions[sortType]) {
      sorted.sort(sortFunctions[sortType]);
    }
    
    setConnections(sorted);
    setCurrentSort(sortType);
  };

  // Aplicar ordenação selecionada
  const applySort = () => {
    if (selectedSort) {
      sortConnections(selectedSort);
    }
    setSortModalOpen(false);
  };

  // Alternar filtros
  const toggleFilter = (filterType) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Resetar filtros
  const resetFilters = () => {
    setActiveFilters({
      online: false,
      connecting: false,
      error: false,
      disconnected: false
    });
  };

  // Resetar ordenação
  const resetSorting = () => {
    setSelectedSort(null);
    setCurrentSort(null);
    setConnections([...originalConnections]);
  };

  // Filtrar conexões
  const filteredConnections = connections.filter(connection => {
    if (!Object.values(activeFilters).some(filter => filter)) {
      return true;
    }
    return activeFilters[connection.status];
  });

  // Abrir configuração
  const handleConfigClick = (connection) => {
    setSelectedConnection(connection);
    setShowInstance(true);
  };

  return (
    <div className={styles.container}>
      {/* Barra de ações */}
      <div className={styles.actionBar}>
        <div className={styles.filterButtons}>
          <button 
            className={styles.actionButton}
            onClick={() => setFilterModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>Filtrar</span>
          </button>
          <button 
            className={styles.actionButton}
            onClick={() => setSortModalOpen(true)}
          >
            <FontAwesomeIcon icon={faSort} />
            <span>Ordenar</span>
          </button>
        </div>
        <button 
          className={styles.novaConexaoButton}
          onClick={() => setNovaConexaoOpen(true)}
          >
          <FontAwesomeIcon icon={faPlus} />
          <span>Nova Conexão</span>
        </button>
      </div>

      {/* Modais */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
      />

      <SortModal
        isOpen={sortModalOpen}
        onClose={() => setSortModalOpen(false)}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        applySort={applySort}
        resetSorting={resetSorting}
      />

      <NovaConexao
        isOpen={novaConexaoOpen}
        onClose={() => setNovaConexaoOpen(false)}
      />

      {configWebOpen && (
        <ConfigWeb
          isOpen={configWebOpen}
          onClose={() => setConfigWebOpen(false)}
          connection={selectedConnection}
        />
      )}

      {showInstance && (
        <InstanceConfigModal
          isOpen={showInstance}
          onClose={() => setShowInstance(false)}
          connection={selectedConnection}
        />
      )}

      {/* Tabela de conexões */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome da Conexão</th>
              <th>Número Vinculado</th>
              <th>API Key</th>
              <th>Instance Name</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredConnections.map(connection => (
              <tr key={connection.id}>
                <td>{connection.name}</td>
                <td>{connection.number}</td>
                <td>
                  <div className={styles.apiKey}>
                    <span>••••••••••••</span>
                    <button className={styles.showApiKey}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </td>
                <td>{connection.instance}</td>
                <td>
                  <div className={styles.statusCell}>
                    <span 
                      className={styles.statusDot} 
                      style={{ backgroundColor: getStatusStyles(connection.status).color }}
                    />
                    <span style={{ color: getStatusStyles(connection.status).color }}>
                      {getStatusStyles(connection.status).text}
                    </span>
                  </div>
                </td>
                <td>
                  <button 
                    className={styles.actionsButton}
                    onClick={() => handleConfigClick(connection)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectionTable;