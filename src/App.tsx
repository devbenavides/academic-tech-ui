import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
