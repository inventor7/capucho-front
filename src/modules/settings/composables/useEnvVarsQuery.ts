import { apiClient } from '@/services/api.client'
import type {
  EnvVar,
  EnvVarCreateRequest,
  EnvVarBulkRequest,
  ParsedEnvContent,
} from '../types/env-vars.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useApiQuery, useApiMutation } from '@/composables/api/config/useApiQuery'
import { useAppStore } from '@/stores/app.store'
import { computed } from 'vue'

export function useEnvVarsQuery(
  environment?: string,
  options?: Omit<UseQueryOptions<EnvVar[], Error>, 'queryKey' | 'queryFn'>,
) {
  const appStore = useAppStore()
  const activeAppId = computed(() => appStore.activeApp?.app_id)

  const queryKey = computed(() => ['env-vars', activeAppId.value, environment])

  return useApiQuery<EnvVar[]>(queryKey, '/dashboard/env-vars', {
    staleTime: 2 * 60 * 1000,
    ...options,
    enabled: computed(() => !!activeAppId.value),
    queryFn: async () => {
      if (!activeAppId.value) return []
      let url = `/dashboard/env-vars?app_id=${activeAppId.value}`
      if (environment) url += `&environment=${environment}`
      const response = await apiClient.get(url)
      return response.data
    },
  })
}

export function useCreateEnvVarMutation(
  options?: Omit<UseMutationOptions<EnvVar, Error, EnvVarCreateRequest>, 'mutationFn'>,
) {
  const appStore = useAppStore()

  return useApiMutation<EnvVar, EnvVarCreateRequest>('', 'post', {
    mutationFn: async (data: EnvVarCreateRequest) => {
      const appId = appStore.activeApp?.app_id
      if (!appId) throw new Error('No active app selected')
      const response = await apiClient.post(`/dashboard/env-vars?app_id=${appId}`, data)
      return response.data
    },
    ...options,
  })
}

export function useBulkCreateEnvVarsMutation(
  options?: Omit<
    UseMutationOptions<{ created: number; variables: EnvVar[] }, Error, EnvVarBulkRequest>,
    'mutationFn'
  >,
) {
  const appStore = useAppStore()

  return useApiMutation<{ created: number; variables: EnvVar[] }, EnvVarBulkRequest>('', 'post', {
    mutationFn: async (data: EnvVarBulkRequest) => {
      const appId = appStore.activeApp?.app_id
      if (!appId) throw new Error('No active app selected')
      const response = await apiClient.post(`/dashboard/env-vars/bulk?app_id=${appId}`, data)
      return response.data
    },
    ...options,
  })
}

export function useUpdateEnvVarMutation(
  options?: Omit<
    UseMutationOptions<EnvVar, Error, { id: string; data: Partial<EnvVar> }>,
    'mutationFn'
  >,
) {
  return useApiMutation<EnvVar, { id: string; data: Partial<EnvVar> }>('', 'put', {
    mutationFn: async ({ id, data }) => {
      const response = await apiClient.put(`/dashboard/env-vars/${id}`, data)
      return response.data
    },
    ...options,
  })
}

export function useDeleteEnvVarMutation(
  options?: Omit<UseMutationOptions<void, Error, string>, 'mutationFn'>,
) {
  return useApiMutation<void, string>('', 'delete', {
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/dashboard/env-vars/${id}`)
      return response.data
    },
    ...options,
  })
}

export function useRevealSecretMutation(
  options?: Omit<UseMutationOptions<{ value: string }, Error, string>, 'mutationFn'>,
) {
  return useApiMutation<{ value: string }, string>('', 'post', {
    mutationFn: async (id: string) => {
      const response = await apiClient.get(`/dashboard/env-vars/${id}/reveal`)
      return response.data
    },
    ...options,
  })
}

export function useParseEnvContentMutation(
  options?: Omit<UseMutationOptions<ParsedEnvContent, Error, string>, 'mutationFn'>,
) {
  return useApiMutation<ParsedEnvContent, string>('', 'post', {
    mutationFn: async (content: string) => {
      const response = await apiClient.post('/dashboard/env-vars/parse', { content })
      return response.data
    },
    ...options,
  })
}
