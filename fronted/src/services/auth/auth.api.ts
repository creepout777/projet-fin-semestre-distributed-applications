import { apiClient }  from '../../services/http/apiClient'
import type {
  LoginRequestDTO,
  AuthResponseDTO,
  TokenRefreshRequestDTO,
  TokenRefreshResponseDTO,
} from './auth.types'

export const authApi = {
  // POST /api/auth/signin
  signin: (body: LoginRequestDTO) =>
    apiClient.post<AuthResponseDTO>('/auth/signin', body),

  // POST /api/auth/refreshtoken  ← Spring uses "refreshtoken" not "refresh"
  refreshToken: (refreshToken: string) =>
    apiClient.post<TokenRefreshResponseDTO>('/auth/refreshtoken', {
      refreshToken,
    } satisfies TokenRefreshRequestDTO),

  // No dedicated signout endpoint in your Spring controller yet
  // so we just clear client-side state
  logout: () => Promise.resolve(),
}