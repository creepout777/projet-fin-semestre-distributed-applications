import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
})