export interface App {
  id: string
  app_id: string // e.g., "io.aybinv7.vuena"
  name: string
  icon_url?: string
  created_at: string
  updated_at?: string
  // Stats
  total_devices?: number
  total_bundles?: number
  total_channels?: number
}

export interface CreateAppInput {
  app_id: string
  name: string
  icon_url?: string
}

export interface UpdateAppInput {
  name?: string
  icon_url?: string
}
