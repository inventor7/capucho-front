import { createClient, type Session, type User } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  businessName: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User | null; session: Session }> {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)

    if (error) {
      throw new Error(error.message)
    }

    return { user: data.user, session: data.session }
  },

  async register(data: RegisterData): Promise<{ user: User | null }> {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new Error(error.message)
    }

    // After successful registration, we need to create a merchant record
    // This would typically be done on the backend after authentication
    console.log('User registered:', signUpData)

    return { user: signUpData.user }
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  },

  async getProfile(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  },

  async checkAuthState(): Promise<{ user: User | null }> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    return { user: user }
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw Error(error.message)
    }

    return data
  },

  onAuthStateChange(callback: (event: any, session: any) => void) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(callback)
    return subscription
  },

  isAuthenticated(): boolean {
    return !!supabase.auth.getUser()
  },
}
