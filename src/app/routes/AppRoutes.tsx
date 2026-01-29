import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../features/home/pages/HomePage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import UnauthorizedPage from "../../shared/pages/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import { TeacherListPage } from "../../features/teachers/pages/TeacherListPage";
import { TeacherCreatePage } from "../../features/teachers/pages/TeacherCreatePage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes*/}
      <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']}/>}>
        <Route path="/dashboard" element={<DashboardPage />} />         
      </Route>
      <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']}/>}>
        <Route path="/teachers" element={<TeacherListPage />} />         
      </Route>
      <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN']}/>}>
        <Route path="/teachers-create" element={<TeacherCreatePage />} />         
      </Route>

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Route>

  </Routes>
);

export default AppRoutes;
