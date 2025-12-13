import type { App, CreateAppInput, UpdateAppInput } from '../types/apps.types'
import type { UseQueryOptions } from '@tanstack/vue-query'
import { useQuery } from '@tanstack/vue-query'
import { useApiQuery, useApiMutation } from '@/composables/api/config/useApiQuery'

// Get all apps
export function useAppsQuery(
  options?: Omit<UseQueryOptions<App[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<App[]>(['apps'], '/dashboard/apps', {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

import { computed, unref } from 'vue'
import type { MaybeRef } from 'vue'
import { apiClient } from '@/services/api.client'
import { queryErrorHandler } from '@/composables/api/error/query-error-handler'

// Get single app - fetches from list and filters by ID (or app_id)
export function useAppQuery(
  id: MaybeRef<string>,
  options?: Omit<UseQueryOptions<App, Error>, 'queryKey' | 'queryFn'>,
) {
  const queryKey = computed(() => ['apps', unref(id)])

  return useQuery<App, Error>({
    queryKey: queryKey.value,
    queryFn: async () => {
      const resolvedId = unref(id)
      if (!resolvedId) throw new Error('App ID is required')

      try {
        const response = await apiClient.get('/dashboard/apps')
        const apps: App[] = Array.isArray(response.data) ? response.data : response.data?.data || []

        // Find by id (UUID) or app_id (bundle identifier)
        const app = apps.find((a) => a.id === resolvedId || a.app_id === resolvedId)
        if (!app) throw new Error(`App not found: ${resolvedId}`)
        return app
      } catch (error) {
        throw queryErrorHandler(error)
      }
    },
    enabled: computed(() => !!unref(id)),
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

// Create app
export function useCreateAppMutation() {
  return useApiMutation<App, CreateAppInput>('/dashboard/apps', 'post')
}

// Update app - requires custom implementation for dynamic URL
export function useUpdateAppMutation(id: string) {
  return useApiMutation<App, UpdateAppInput>(`/dashboard/apps/${id}`, 'put')
}

// Delete app
export function useDeleteAppMutation(id: string) {
  return useApiMutation<void, undefined>(`/dashboard/apps/${id}`, 'delete')
}
