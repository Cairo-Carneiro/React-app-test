import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileLines, faBell, faChevronDown, faRightFromBracket, faXmark, faListUl, faCircleCheck, faTriangleExclamation, faCircleXmark, faCircleInfo, faGear } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';

// Remova ou ajuste esses imports conforme os arquivos existirem
// import './App.css';
// import './styles/global.css';
// import './styles/variables.css';
// import './styles/primereact.css';
// import './styles/primeicons.css';
// import './styles/primeflex.css';
// import './styles/primeicons.css';

library.add(
  faFileLines,
  faBell,
  faChevronDown,
  faRightFromBracket,
  faBellRegular,
  faXmark,
  faListUl,
  faCircleCheck,
  faTriangleExclamation,
  faCircleXmark,
  faCircleInfo,
  faGear,
  faBellRegular,
);

const App = () => (
  <AuthProvider>
    <RoutesApp />
  </AuthProvider>
);

export default App;
