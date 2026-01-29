import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useRoles } from "../../../features/auth/hooks/useRoles";

const SidebarDrawer: React.FC = () => {
  const { isAuthenticated, logoutUser } = useAuth();
  const { hasRole, hasPermission } = useRoles();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false); // cerrar sidebar al hacer logout
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón hamburguesa fijo en móvil */}
      <button
        className="btn btn-dark d-md-none position-fixed top-0 start-0 m-2 zindex-tooltip"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar overlay (solo en móvil) */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <nav
        className={`bg-dark text-white position-fixed top-0 start-0 vh-100 p-3 d-flex flex-column ${
          isOpen ? "sidebar-open" : ""
        } d-md-block`}
        style={{ width: "220px", transition: "transform 0.3s ease-in-out", zIndex: 1030 }}
      >
        {/* Logo y cerrar */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link to="/" className="text-white text-decoration-none fs-4">
            Academic Tech
          </Link>
          {/* Botón cerrar solo en móvil */}
          <button
            className="btn btn-sm btn-outline-light d-md-none"
            onClick={toggleSidebar}
          >
            ×
          </button>
        </div>

        {/* Links */}
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active text-white" : "nav-link text-white"
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>

          {isAuthenticated && hasRole("ROLE_STUDENT") && (
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-white" : "nav-link text-white"
                }
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          )}

          {isAuthenticated && hasPermission("VIEW_STUDENTS") && (
            <li className="nav-item">
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-white" : "nav-link text-white"
                }
                onClick={() => setIsOpen(false)}
              >
                Students
              </NavLink>
            </li>
          )}

          {!isAuthenticated ? (
            <li className="nav-item mt-3">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active text-white" : "nav-link text-white"
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li className="nav-item mt-3">
              <button
                className="btn btn-outline-light w-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="flex-grow-1" style={{ marginLeft: "220px" }}>
        {/* Aquí va tu contenido principal */}
      </div>

      {/* CSS adicional para overlay y móvil */}
      <style>
        {`
          /* Overlay solo en móvil cuando el sidebar está abierto */
          .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0,0,0,0.5);
            z-index: 1020;
          }
          .sidebar-overlay.show {
            display: block;
          }

          /* Transform para el drawer en móvil */
          @media (max-width: 767.98px) {
            nav.position-fixed {
              transform: translateX(-100%);
            }
            nav.position-fixed.sidebar-open {
              transform: translateX(0);
            }
            div.flex-grow-1 {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default SidebarDrawer;
