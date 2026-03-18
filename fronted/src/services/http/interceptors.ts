import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { apiClient }   from './apiClient'
import { getAuthState } from './authStoreRef'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject:  (err: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  failedQueue = []
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = getAuthState()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return apiClient(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    const { refreshToken, setAuth, logout, user } = getAuthState()

    if (!refreshToken) {
      logout()
      return Promise.reject(error)
    }

    try {
      // POST /api/auth/refreshtoken — Spring endpoint
      const { data } = await apiClient.post('/auth/refreshtoken', {
        refreshToken,
      })

      // Spring TokenRefreshResponse returns "accessToken" field
      const newToken        = data.accessToken
      const newRefreshToken = data.refreshToken ?? refreshToken

      setAuth(user!, newToken, newRefreshToken)
      processQueue(null, newToken)

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      logout()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)