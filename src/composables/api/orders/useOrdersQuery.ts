import { apiClient } from '@/services/api.client'
import type { Order } from '@/types/order.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'

export function useOrdersQuery(
  options?: Omit<UseQueryOptions<Order[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Order[]>(['orders'], '/orders', {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useOrderQuery(
  id: string | number,
  options?: Omit<UseQueryOptions<Order, Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Order>(['orders', id], `/orders/${id}`, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useCreateOrderMutation(
  options?: Omit<UseMutationOptions<Order, Error, Partial<Order>>, 'mutationFn'>,
) {
  return useApiMutation<Order, Partial<Order>>('/orders', 'post', {
    ...options,
  })
}

export function useUpdateOrderMutation(
  options?: Omit<
    UseMutationOptions<Order, Error, { id: string | number; data: Partial<Order> }>,
    'mutationFn'
  >,
) {
  return useApiMutation<Order, { id: string | number; data: Partial<Order> }>('', 'put', {
    mutationFn: async ({ id, data }: { id: string | number; data: Partial<Order> }) => {
      const response = await apiClient.put(`/orders/${id}`, data)
      return response.data
    },
    ...options,
  })
}

export function useDeleteOrderMutation(
  options?: Omit<UseMutationOptions<void, Error, string | number>, 'mutationFn'>,
) {
  return useApiMutation<void, string | number>('', 'delete', {
    mutationFn: async (id: string | number) => {
      const response = await apiClient.delete(`/orders/${id}`)
      return response.data
    },
    ...options,
  })
}
