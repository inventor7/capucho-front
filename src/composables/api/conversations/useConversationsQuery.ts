import { apiClient } from '@/services/api.client'
import type { Conversation } from '@/types/conversation.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'

export function useConversationsQuery(
  options?: Omit<UseQueryOptions<Conversation[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Conversation[]>(['conversations'], '/conversations', {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useConversationQuery(
  id: string | number,
  options?: Omit<UseQueryOptions<Conversation, Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Conversation>(['conversations', id], `/conversations/${id}`, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useCreateConversationMutation(
  options?: Omit<UseMutationOptions<Conversation, Error, Partial<Conversation>>, 'mutationFn'>,
) {
  return useApiMutation<Conversation, Partial<Conversation>>('/conversations', 'post', {
    ...options,
  })
}

export function useUpdateConversationMutation(
  options?: Omit<
    UseMutationOptions<Conversation, Error, { id: string | number; data: Partial<Conversation> }>,
    'mutationFn'
  >,
) {
  return useApiMutation<Conversation, { id: string | number; data: Partial<Conversation> }>(
    '',
    'put',
    {
      mutationFn: async ({ id, data }: { id: string | number; data: Partial<Conversation> }) => {
        const response = await apiClient.put(`/conversations/${id}`, data)
        return response.data
      },
      ...options,
    },
  )
}

export function useDeleteConversationMutation(
  options?: Omit<UseMutationOptions<void, Error, string | number>, 'mutationFn'>,
) {
  return useApiMutation<void, string | number>('', 'delete', {
    mutationFn: async (id: string | number) => {
      const response = await apiClient.delete(`/conversations/${id}`)
      return response.data
    },
    ...options,
  })
}
