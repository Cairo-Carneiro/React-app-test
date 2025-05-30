import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = createRoot(document.querySelector("#root"));

root.render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
