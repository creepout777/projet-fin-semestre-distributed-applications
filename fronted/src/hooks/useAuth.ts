import { useNavigate }    from 'react-router-dom'
import { useAuthStore }   from '../store/authStore'
import { authService }    from '../services/auth/auth.service'  // ← direct, not barrel

export const useAuth = () => {
  const { user, token, setAuth, logout: clearStore } = useAuthStore()
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    const { user, token, refreshToken } = await authService.login(email, password)
    setAuth(user, token, refreshToken)
  }

  const logout = async () => {
    await authService.logout()
    clearStore()
    navigate('/login')
  }

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }
}