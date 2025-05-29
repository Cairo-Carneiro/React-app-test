import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUser = useCallback(() => {
    console.log('Carregando dados do usuário...');
    const userToken = localStorage.getItem('user_token');
    const usersDB = localStorage.getItem('users_db');

    if (userToken && usersDB) {
      try {
        const parsedUsers = JSON.parse(usersDB);
        const parsedToken = JSON.parse(userToken);

        const foundUser = parsedUsers.find(u => u.email === parsedToken.email);
        if (foundUser) {
          console.log('Usuário encontrado:', foundUser.email);
          setUser({ email: foundUser.email });
        } else {
          console.log('Usuário não encontrado, limpando dados...');
          clearAuthData();
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        clearAuthData();
      }
    } else {
      console.log('Nenhum dado de usuário encontrado');
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Carrega usuário ao iniciar
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const clearAuthData = useCallback(() => {
    console.log('Limpando dados de autenticação...');
    localStorage.removeItem('user_token');
    localStorage.removeItem('users_db');
    sessionStorage.clear();
    setUser(null);
  }, []);

  const checkAuth = useCallback(() => {
    const userToken = localStorage.getItem('user_token');
    return !!userToken;
  }, []);

  const signin = useCallback(async (email, password) => {
    try {
      const usersDB = JSON.parse(localStorage.getItem('users_db')) || [];
      const foundUser = usersDB.find(user => user.email === email);

      if (!foundUser) {
        return { success: false, message: 'Usuário não cadastrado' };
      }

      if (foundUser.password !== password) {
        return { success: false, message: 'Credenciais inválidas' };
      }

      const token = generateToken();
      localStorage.setItem('user_token', JSON.stringify({ email, token }));
      setUser({ email });
      
      console.log('Login bem-sucedido, disparando evento auth-change');
      window.dispatchEvent(new Event('auth-change'));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Erro durante o login' };
    }
  }, []);

  const signup = useCallback(async (email, password) => {
    try {
      const usersDB = JSON.parse(localStorage.getItem('users_db') || '[]');

      if (usersDB.some(user => user.email === email)) {
        return { success: false, message: 'E-mail já registrado' };
      }

      const newUsers = [...usersDB, { email, password }];
      localStorage.setItem('users_db', JSON.stringify(newUsers));

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Erro ao criar conta' };
    }
  }, []);

  const signout = useCallback(async () => {
    console.log('Função signout iniciada');
    try {
      clearAuthData();
      console.log('Dados limpos, disparando evento auth-change');
      window.dispatchEvent(new Event('auth-change'));
      
      console.log('Redirecionando para página de login...');
      navigate('/', { replace: true });
      return Promise.resolve();
    } catch (error) {
      console.error('Signout error:', error);
      return Promise.reject(error);
    }
  }, [clearAuthData, navigate]);

  const generateToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        signin,
        signup,
        signout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};