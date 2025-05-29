import { Routes, Route, Navigate, useNavigate, BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/Fpassword";
import EmailVerification from "../pages/Verification";
import Profile from "../pages/Profille";

// Layout para rotas autenticadas
const AuthenticatedLayout = ({ children }) => (
  <>
    {children}
  </>
);

// Layout para rotas públicas
const PublicLayout = ({ children }) => (
  <div className="public-container">
    {children}
  </div>
);

// Protege rotas privadas
const PrivateRoute = ({ children }) => {
  const { signed, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PrivateRoute - Status:', { signed, loading });
    if (!loading && !signed) {
      console.log('Usuário não autenticado, redirecionando...');
      navigate('/', { replace: true });
    }
  }, [signed, loading, navigate]);

  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return signed ? <AuthenticatedLayout>{children}</AuthenticatedLayout> : null;
};

// Protege rotas públicas
const PublicRoute = ({ children }) => {
  const { signed, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && signed) {
      navigate('/home', { replace: true });
    }
  }, [signed, loading, navigate]);

  if (loading) {
    return <div className="loading-screen">Carregando...</div>;
  }

  return !signed ? <PublicLayout>{children}</PublicLayout> : null;
};

const RoutesApp = () => {
  return (

    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<PublicRoute><Signin /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/email-verification" element={<PublicRoute><EmailVerification /></PublicRoute>} />

      {/* Rotas Privadas */}
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

      {/* Rota padrão para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>

  );
};

export default RoutesApp;
