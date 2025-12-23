export interface EnvVar {
  id: string
  app_id: string
  key: string
  value: string
  value_type: 'string' | 'number' | 'boolean' | 'json'
  environment: 'production' | 'staging' | 'development' | 'all'
  channel?: string | null
  is_secret: boolean
  description?: string | null
  created_at: string
  updated_at: string
  _hasSecret?: boolean
}

export interface EnvVarCreateRequest {
  key: string
  value: string
  value_type?: 'string' | 'number' | 'boolean' | 'json'
  environment: string
  channel?: string
  is_secret?: boolean
  description?: string
}

export interface EnvVarBulkRequest {
  variables: Array<{ key: string; value: string; is_secret?: boolean }>
  environment: string
}

export interface ParsedEnvContent {
  variables: Array<{ key: string; value: string }>
  count: number
}
