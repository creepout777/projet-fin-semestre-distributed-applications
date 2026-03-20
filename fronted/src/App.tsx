import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore }  from './store/authStore'
import MainLayout        from './layouts/MainLayout'
import LoginPage         from './pages/Auth/LoginPage'
import DashboardPage     from './pages/Dashboard/DashboardPage'
import PlanningPage      from './pages/planning/PlanningPage'
import AbsencesPage      from './pages/absences/AbsencesPage'
import AvancementPage    from './pages/avancement/AvancementPage'
import './App.css'
import PaymentsPage from './pages/Paiments/PaymentsPage'
import Utilisateurs from './pages/Utilisateurs/Utilisateurs'
import Settings from './pages/Settings/Settings'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore(s => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

const AppRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => (
  <ProtectedRoute>
    <MainLayout>
      {element}
    </MainLayout>
  </ProtectedRoute>
)

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route path="/"            element={<AppRoute element={<DashboardPage  />} />} />
        <Route path="/planning"    element={<AppRoute element={<PlanningPage   />} />} />
        <Route path="/absences"    element={<AppRoute element={<AbsencesPage   />} />} />
        <Route path="/avancement"  element={<AppRoute element={<AvancementPage />} />} />
        <Route path="/paiements"  element={<AppRoute element={<PaymentsPage />} />} />
        <Route path="/users"  element={<AppRoute element={<Utilisateurs />} />} />
        <Route path="/settings"  element={<AppRoute element={<Settings />} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App