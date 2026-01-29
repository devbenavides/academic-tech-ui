import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useRoles } from "../../../features/auth/hooks/useRoles";

const Navbar: React.FC = () => {
  const { isAuthenticated, logoutUser } = useAuth();
  const { hasRole, hasPermission } = useRoles();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Academic Tech
        </Link>

        {/* Botón hamburguesa */}
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

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Home siempre visible */}
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>

            {/* Dashboard por rol */}
            {isAuthenticated && hasRole("ROLE_STUDENT") && (
              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Students por permiso */}
            {isAuthenticated && hasPermission("VIEW_STUDENTS") && (
              <li className="nav-item">
                <NavLink
                  to="/students"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Students
                </NavLink>
              </li>
            )}

            {isAuthenticated && hasRole("ROLE_ADMIN") && (
              <li className="nav-item">
                <NavLink
                  to="/teachers"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Teachers
                </NavLink>
              </li>
            )}

            {isAuthenticated && hasRole("ROLE_ADMIN") && (
              <li className="nav-item">
                <NavLink
                  to="/teachers-create"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Create Teacher
                </NavLink>
              </li>
            )}

            {/* Login / Logout */}
            {!isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
