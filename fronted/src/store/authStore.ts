import { create }  from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user:         User | null
  token:        string | null
  refreshToken: string | null
  setAuth:  (user: User, token: string, refreshToken: string) => void
  logout:   () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:         null,
      token:        null,
      refreshToken: null,
      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken }),

      logout: () => {
        // ✅ Wipe Zustand state
        set({ user: null, token: null, refreshToken: null })
        // ✅ Wipe localStorage fully — removes stale token & old role key
        localStorage.removeItem('edu-auth')
        localStorage.removeItem('role')
      },
    }),
    {
      name:    'edu-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)