import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-3">Bienvenido a MyApp</h1>
        <p className="lead">
          Esta es la página principal construida con React, Vite y TypeScript.
        </p>

        <hr className="my-4" />

        <p>
          Usa el navbar para navegar entre las diferentes secciones de la
          aplicación.
        </p>

        <button className="btn btn-primary btn-lg">
          Empezar
        </button>
      </div>
    </div>
  );
};

export default HomePage;
