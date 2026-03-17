import { StrictMode }      from 'react'
import { createRoot }      from 'react-dom/client'

import './index.css'

// 1. Register interceptors on the apiClient instance
import './services/http/interceptors'

// 2. Inject the store ref before any component mounts
import { setAuthStoreRef } from './services/http/authStoreRef'
import { useAuthStore }    from './store/authStore'
setAuthStoreRef(() => useAuthStore.getState())

// 3. App
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)