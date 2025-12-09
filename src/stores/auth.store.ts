import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '../services/auth.service'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const session = ref<Session | null>()
    const accessToken = useStorage<string | null>('access_token', null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => {
      return !!accessToken.value
    })

    async function login(credentials: { email: string; password: string }) {
      loading.value = true
      error.value = null

      try {
        await authService.login(credentials)

        const { user: supabaseUser } = await authService.checkAuthState()
        user.value = supabaseUser
        const response = await authService.getSession()
        session.value = response.session
        accessToken.value = response.session?.access_token ?? ''
      } catch (err: any) {
        error.value = err.message || 'Login failed'
        throw err
      } finally {
        loading.value = false
      }
    }

    async function register(data: { email: string; password: string; businessName: string }) {
      loading.value = true
      error.value = null

      try {
        const response = await authService.register(data)
        user.value = response.user
      } catch (err: any) {
        error.value = err.message || 'Registration failed'
        throw err
      } finally {
        loading.value = false
      }
    }

    async function logout() {
      try {
        await authService.logout()
        user.value = null
      } catch (err: any) {
        error.value = err.message || 'Logout failed'
      }
    }

    async function fetchProfile() {
      try {
        const userProfile = await authService.getProfile()
        user.value = userProfile
      } catch (err: any) {
        error.value = err.message || 'Failed to fetch profile'
      }
    }

    async function init() {
      try {
        const { user: currentUser } = await authService.checkAuthState()
        user.value = currentUser
      } catch (err) {
        console.error('Error initializing auth state:', err)
      }
    }

    return {
      user,
      session,
      loading,
      error,
      isAuthenticated,
      login,
      register,
      logout,
      fetchProfile,
      init,
    }
  },
  {
    persist: {
      key: 'auth',
      storage: localStorage,
    },
  },
)
