import ReactDom from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components/BookCard/bookCard.css";
import "./components/Header/Header.css";


ReactDom.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer autoClose={2000} pauseOnFocusLoss:false />
  </>
);
