import type { Product, ProductCreate } from '../types/product.types'
import { apiClient } from './api.client'

export const productsService = {
  async getAll(): Promise<Product[]> {
    const response = await apiClient.get('/products')
    return response.data
  },

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  async create(data: ProductCreate): Promise<Product> {
    const response = await apiClient.post('/products', data)
    return response.data
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const response = await apiClient.put(`/products/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`)
  },

  async importCSV(file: File): Promise<any> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('/products/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}
