import type React from "react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>🚫 No tienes permisos para acceder a esta página</h2>
    </div>
  );
};

export default UnauthorizedPage;