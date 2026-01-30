import React from "react";
import AppRoutes from "./app/routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ToastTestButton } from "./features/teachers/services/toastTest";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container mt-4">        
        <AppRoutes />
        <ToastTestButton/>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  );
};

export default App;
