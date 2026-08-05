import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ── Public routes ──────────────────────────────────── */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" /> : <SignupPage />}
      />

      {/* ── Protected routes with sidebar layout ──────────── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* ── Catch-all ──────────────────────────────────────── */}
      <Route
        path="*"
        element={<Navigate to={user ? '/dashboard' : '/login'} />}
      />
    </Routes>
  );
}

export default App;
