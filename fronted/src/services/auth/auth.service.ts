import { authApi }    from './auth.api'
import { authMapper } from './auth.mapper'

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await authApi.signin({ email, password })
    return authMapper.toAuthPayload(data)
  },

  logout: () => authApi.logout(),
}