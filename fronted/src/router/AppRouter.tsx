import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import ProtectedRoute from './ProtectedRoute'

// Layouts
import MainLayout from '../layouts/MainLayout'

// Pages
import LoginPage       from '../pages/auth/LoginPage'
import DashboardPage   from '../pages/dashboard/DashboardPage'
import PlanningPage    from '../pages/planning/PlanningPage'
import AbsencesPage    from '../pages/absences/AbsencesPage'
import AvancementPage  from '../pages/avancement/AvancementPage'
import PaiementsPage   from '../pages/paiements/PaiementsPage'
import UtilisateursPage from '../pages/users/UtilisateursPage'
import ParametresPage  from '../pages/Settings/ParametresPage'

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>

      {/* Public */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Redirect root → dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Protected — all authenticated roles */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path={ROUTES.DASHBOARD}  element={<DashboardPage />} />
        <Route path={ROUTES.PLANNING}   element={<PlanningPage />} />
        <Route path={ROUTES.ABSENCES}   element={<AbsencesPage />} />
        <Route path={ROUTES.AVANCEMENT} element={<AvancementPage />} />
        <Route path={ROUTES.PAIEMENTS}  element={<PaiementsPage />} />

        {/* ADMIN + SCOLARITE only */}
        <Route path={ROUTES.UTILISATEURS} element={
          <ProtectedRoute allowedRoles={['admin', 'scolarite']}>
            <UtilisateursPage />
          </ProtectedRoute>
        } />

        {/* ADMIN only */}
        <Route path={ROUTES.PARAMETRES} element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ParametresPage />
          </ProtectedRoute>
        } />
      </Route>

      {/* Catch all → dashboard */}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

    </Routes>
  </BrowserRouter>
)

export default AppRouter