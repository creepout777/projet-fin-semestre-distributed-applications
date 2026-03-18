import type { AuthResponseDTO }          from './auth.types'
import type { TokenRefreshResponseDTO }  from './auth.types'
import type { User }                     from '../../types'

// Spring returns roles as "ROLE_ADMIN" or "ADMIN" depending on config
// normalize both formats → "admin"
const normalizeRole = (roles: string[]): User['role'] => {
  const raw = roles[0] ?? 'etudiant'
  return raw.replace('ROLE_', '').toLowerCase() as User['role']
}

export const authMapper = {
  toUser: (dto: AuthResponseDTO): User => ({
    id:    dto.id,
    email: dto.email,
    role:  normalizeRole(dto.roles),
    name:  dto.email, // no firstName/lastName in JwtResponse — enrich later
  }),

  toAuthPayload: (dto: AuthResponseDTO) => ({
    user:         authMapper.toUser(dto),
    token:        dto.token,        // ← "token" not "accessToken"
    refreshToken: dto.refreshToken,
  }),

  toRefreshedTokens: (dto: TokenRefreshResponseDTO) => ({
    token:        dto.accessToken,
    refreshToken: dto.refreshToken,
  }),
}