import type { useAuthStore } from '../../store/authStore'

// A late-bound reference to the auth store.
// Set once in main.tsx after the store is initialized.
// Interceptors read from this instead of importing the store directly.

type AuthStore = ReturnType<typeof useAuthStore.getState>

let _getAuthState: (() => AuthStore) | null = null

export const setAuthStoreRef = (getter: () => AuthStore) => {
  _getAuthState = getter
}

export const getAuthState = (): AuthStore => {
  if (!_getAuthState) {
    throw new Error('authStore ref not initialized. Call setAuthStoreRef() in main.tsx first.')
  }
  return _getAuthState()
}