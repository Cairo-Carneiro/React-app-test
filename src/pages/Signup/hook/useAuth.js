import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth"; // ajuste o caminho se precisar

const useAuth = () => useContext(AuthContext);

export default useAuth;
