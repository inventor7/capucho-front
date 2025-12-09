import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('access_token')

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout()
          localStorage.removeItem('access_token')
        }
        return Promise.reject(error)
      },
    )
  }

  get axios() {
    return this.client
  }
}

export const apiClient = new ApiClient().axios
