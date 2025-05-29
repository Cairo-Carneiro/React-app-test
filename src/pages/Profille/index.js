import React from 'react';
// Corrija a importação para:
import useAuth from '../../hooks/useAuth';  // 2 níveis acima (pages -> src -> hooks)
import './profille.css';

const Profile = () => {
  const { user, signout } = useAuth();

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Meu Perfil</h1>
      <div className="profile-info">
        <p>Nome: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <button onClick={signout} className="logout-button">
        Sair da Conta
      </button>
    </div>
  );
};

export default Profile;