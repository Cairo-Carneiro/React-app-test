import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";

// Esse hook serve para facilitar o uso do AuthContext
const useAuth = () => {
  const {
    user,
    signed,
    loading,
    error,
    signin,
    signup,
    signout,
    getToken,
    googleSignIn, // caso esteja usando login com Google, senão pode remover
  } = useContext(AuthContext);

  return {
    user,
    signed,
    loading,
    error,
    signin,
    signup,
    signout,
    getToken,
    googleSignIn,
  };
};

export default useAuth;
