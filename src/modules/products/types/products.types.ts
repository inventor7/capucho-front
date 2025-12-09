export interface Product {
  id: number
  name: string
  slug: string
  category: string
  price: number
  salePrice?: number
  image: string
  woodType: string
  stock: number
  status: 'active' | 'out-of-stock' | 'discontinued'
  featured: boolean
}

export type BulkEditData = {
  category: string
  status: string
  featured: string
}
