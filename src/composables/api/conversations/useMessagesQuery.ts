import { apiClient } from '@/services/api.client'
import type { Message } from '@/types/conversation.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'

export function useMessagesQuery(
  conversationId: string | number,
  options?: Omit<UseQueryOptions<Message[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Message[]>(['conversations', conversationId, 'messages'], `/conversations/${conversationId}/messages`, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useSendMessageMutation(
  options?: Omit<UseMutationOptions<Message, Error, Partial<Message>>, 'mutationFn'>,
) {
  return useApiMutation<Message, Partial<Message>>('/messages', 'post', {
    ...options,
  })
}

export function useMessageQuery(
  id: string | number,
  options?: Omit<UseQueryOptions<Message, Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Message>(['messages', id], `/messages/${id}`, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useUpdateMessageMutation(
  options?: Omit<
    UseMutationOptions<Message, Error, { id: string | number; data: Partial<Message> }>,
    'mutationFn'
  >,
) {
  return useApiMutation<Message, { id: string | number; data: Partial<Message> }>(
    '',
    'put',
    {
      mutationFn: async ({ id, data }: { id: string | number; data: Partial<Message> }) => {
        const response = await apiClient.put(`/messages/${id}`, data)
        return response.data
      },
      ...options,
    },
  )
}

export function useDeleteMessageMutation(
  options?: Omit<UseMutationOptions<void, Error, string | number>, 'mutationFn'>,
) {
  return useApiMutation<void, string | number>('', 'delete', {
    mutationFn: async (id: string | number) => {
      const response = await apiClient.delete(`/messages/${id}`)
      return response.data
    },
    ...options,
  })
}