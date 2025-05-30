import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../backend/suparbase/suparbaseclient"; // Ajuste se necessário

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carregar usuário logado ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user || null);
      setLoading(false);
    };
    loadUser();

    // Listener para mudanças de sessão
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // SIGNUP com nome (e-mail, senha, nome)
  const signup = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return { success: false, message: error.message };
    }
    // Salvar nome na tabela 'profiles'
    if (data.user) {
      await supabase
        .from("profiles")
        .insert([{ id: data.user.id, full_name: name }]);
    }
    setUser(data.user);
    setLoading(false);
    return { success: true };
  }, []);

  // LOGIN
  const signin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return { success: false, message: error.message };
    }
    setUser(data.user);
    setLoading(false);
    return { success: true };
  }, []);

  // LOGOUT
  const signout = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
    navigate("/", { replace: true });
  }, [navigate]);

  // GET TOKEN (caso precise do JWT para requisições externas)
  const getToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user && !!user.confirmed_at,
        loading,
        error,
        signin,
        signup, // agora aceita 3 args!
        signout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
