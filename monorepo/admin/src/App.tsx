import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/login/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import UsersPage from '@/pages/users/UsersPage';
import PetsPage from '@/pages/pets/PetsPage';
import VaccinationAnalyticsPage from '@/pages/vaccination-analytics/VaccinationAnalyticsPage';
import VerificationPage from '@/pages/verification/VerificationPage';
import MatingPage from '@/pages/mating/MatingPage';
import NotificationsPage from '@/pages/notifications/NotificationsPage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import AdminUsersPage from '@/pages/admin-users/AdminUsersPage';
import CategoriesPage from '@/pages/categories/CategoriesPage';
import HealthCertificationsPage from '@/pages/health-certifications/HealthCertificationsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/vaccination-analytics" element={<VaccinationAnalyticsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/mating" element={<MatingPage />} />
        <Route path="/health-certifications" element={<HealthCertificationsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/admin-users" element={<AdminUsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
