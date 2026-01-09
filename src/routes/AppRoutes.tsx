import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import LoginPage from "../features/auth/pages/LoginPage";
import MainLayout from "../app/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../shared/pages/UnauthorizedPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* accesible por rol STUDENT */}
      <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']} />}>

        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Route>

  </Routes>
);

export default AppRoutes;
