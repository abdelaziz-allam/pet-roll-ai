import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage'));
const UsersListPage = React.lazy(() => import('@/pages/users/UsersListPage'));
const UserDetailPage = React.lazy(() => import('@/pages/users/UserDetailPage'));
const PetsListPage = React.lazy(() => import('@/pages/pets/PetsListPage'));
const PetDetailPage = React.lazy(() => import('@/pages/pets/PetDetailPage'));
const VerificationQueue = React.lazy(() => import('@/pages/verification/VerificationQueue'));
const MatingListingsPage = React.lazy(() => import('@/pages/mating/MatingListingsPage'));
const NotificationsPage = React.lazy(() => import('@/pages/notifications/NotificationsPage'));
const AnalyticsPage = React.lazy(() => import('@/pages/analytics/AnalyticsPage'));
const TeamPage = React.lazy(() => import('@/pages/team/TeamPage'));
const SettingsPage = React.lazy(() => import('@/pages/settings/SettingsPage'));
const SystemPage = React.lazy(() => import('@/pages/system/SystemPage'));
const TipsPage = React.lazy(() => import('@/pages/tips/TipsPage'));

const AuthLayout = React.lazy(() => import('@/layouts/AuthLayout'));
const AdminLayout = React.lazy(() => import('@/layouts/AdminLayout'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const Loading = () => (
  <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }} />
);

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/pets" element={<PetsListPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/verification" element={<VerificationQueue />} />
          <Route path="/mating" element={<MatingListingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/system" element={<SystemPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
