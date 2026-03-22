import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { ROUTES } from './routes'

interface Props {
  children:      React.ReactNode
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { user, token } = useAuthStore()

  // Not logged in → redirect to login
  if (!token || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  // Role not allowed → redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute