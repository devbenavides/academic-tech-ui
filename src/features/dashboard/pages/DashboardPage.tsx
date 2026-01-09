// src/pages/Dashboard.tsx
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="card-text">120 registrados</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Ventas</h5>
              <p className="card-text">$3,200</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Notificaciones</h5>
              <p className="card-text">5 pendientes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

