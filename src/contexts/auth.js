import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carregar usuário logado ao iniciar
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Validação simples de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação simples de senha
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // SIGNUP com validação simples
  const signup = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);

    // Validações
    if (!name || name.trim().length < 2) {
      setError("Nome deve ter pelo menos 2 caracteres");
      setLoading(false);
      return { success: false, message: "Nome deve ter pelo menos 2 caracteres" };
    }

    if (!validateEmail(email)) {
      setError("Email inválido");
      setLoading(false);
      return { success: false, message: "Email inválido" };
    }

    if (!validatePassword(password)) {
      setError("Senha deve ter pelo menos 8 caracteres");
      setLoading(false);
      return { success: false, message: "Senha deve ter pelo menos 8 caracteres" };
    }

    // Verificar se email já existe
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find(u => u.email === email);
    
    if (userExists) {
      setError("Email já cadastrado");
      setLoading(false);
      return { success: false, message: "Email já cadastrado" };
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // Em produção, deve ser criptografada
      name,
      createdAt: new Date().toISOString()
    };

    // Salvar no localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setLoading(false);
    return { success: true };
  }, []);

  // LOGIN com validação simples
  const signin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    // Validações básicas
    if (!email || !password) {
      setError("Email e senha são obrigatórios");
      setLoading(false);
      return { success: false, message: "Email e senha são obrigatórios" };
    }

    // Buscar usuário no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError("Email ou senha incorretos");
      setLoading(false);
      return { success: false, message: "Email ou senha incorretos" };
    }

    // Remover senha do objeto user antes de salvar
    const { password: _, ...userWithoutPassword } = user;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    setLoading(false);
    return { success: true };
  }, []);

  // LOGOUT
  const signout = useCallback(async () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem('user');
    setLoading(false);
    navigate("/", { replace: true });
  }, [navigate]);

  // GET TOKEN (simulado)
  const getToken = async () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? 'mock-token-' + Date.now() : null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        error,
        signin,
        signup,
        signout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
