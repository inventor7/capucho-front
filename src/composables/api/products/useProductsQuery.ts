import { apiClient } from '@/services/api.client'
import type { Product } from '@/types/product.types'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'

export function useProductsQuery(
  options?: Omit<UseQueryOptions<Product[], Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Product[]>(['products'], '/products', {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useProductQuery(
  id: string | number,
  options?: Omit<UseQueryOptions<Product, Error>, 'queryKey' | 'queryFn'>,
) {
  return useApiQuery<Product>(['products', id], `/products/${id}`, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

export function useCreateProductMutation(
  options?: Omit<UseMutationOptions<Product, Error, Partial<Product>>, 'mutationFn'>,
) {
  return useApiMutation<Product, Partial<Product>>('/products', 'post', {
    ...options,
  })
}

export function useUpdateProductMutation(
  options?: Omit<
    UseMutationOptions<Product, Error, { id: string | number; data: Partial<Product> }>,
    'mutationFn'
  >,
) {
  return useApiMutation<Product, { id: string | number; data: Partial<Product> }>('', 'put', {
    mutationFn: async ({ id, data }: { id: string | number; data: Partial<Product> }) => {
      const response = await apiClient.put(`/products/${id}`, data)
      return response.data
    },
    ...options,
  })
}

export function useDeleteProductMutation(
  options?: Omit<UseMutationOptions<void, Error, string | number>, 'mutationFn'>,
) {
  return useApiMutation<void, string | number>('', 'delete', {
    mutationFn: async (id: string | number) => {
      const response = await apiClient.delete(`/products/${id}`)
      return response.data
    },
    ...options,
  })
}
