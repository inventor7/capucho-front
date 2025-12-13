import { apiClient } from '@/services/api.client'
import type { Channel } from '../types/channels.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useApiQuery, useApiMutation } from '@/composables/api/config/useApiQuery'

import { useAppStore } from '@/stores/app.store'
import { computed } from 'vue'

export function useChannelsQuery(
  options?: Omit<UseQueryOptions<Channel[], Error>, 'queryKey' | 'queryFn'>,
) {
  const appStore = useAppStore()
  const activeAppId = computed(() => appStore.activeApp?.app_id)

  const queryKey = computed(() => ['channels', activeAppId.value])

  return useApiQuery<Channel[]>(queryKey, '/dashboard/channels', {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
    enabled: computed(() => !!activeAppId.value),
    queryFn: async () => {
      if (!activeAppId.value) return []
      const response = await apiClient.get(`/dashboard/channels?app_id=${activeAppId.value}`)
      return response.data
    },
  })
}

export function useDeleteChannelMutation(
  options?: Omit<UseMutationOptions<void, Error, string>, 'mutationFn'>,
) {
  return useApiMutation<void, string>('', 'delete', {
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/dashboard/channels/${id}`)
      return response.data
    },
    ...options,
  })
}
