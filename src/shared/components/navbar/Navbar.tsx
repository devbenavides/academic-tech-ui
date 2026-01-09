import React from "react";
import { Link, NavLink } from "react-router-dom";
import { hasRole, hasPermission, isAuthenticated } from "../../../features/auth/utils/auth";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo / Nombre */}
        <Link className="navbar-brand" to="/">
          Academic Tech
        </Link>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'}
              >
                Home
              </NavLink>
            </li>
            {hasRole('ROLE_ADMIN') && (
              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'}
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Login / Logout */}
            {!isAuthenticated() ? (
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'}
              >
                Login
              </NavLink>
            </li>
            ) : (
              <li className="nav-item">
                
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
