import { faker } from '@faker-js/faker'
import type { Product } from '../../types/products.types'

// Define possible categories for products
const categories = [
  'Dining',
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Outdoor',
  'Office',
  'Bathroom',
  'Kids Room',
  'Entryway',
  'Storage',
]

// Define possible wood types for products
const woodTypes = [
  'Oak',
  'Walnut',
  'Mahogany',
  'Cherry',
  'Maple',
  'Teak',
  'Pine',
  'Ebony',
  'Rosewood',
  'Beech',
  'Ash',
  'Cedar',
  'Birch',
  'Hickory',
  'Poplar',
]

// Define possible status values
const statuses: Array<'active' | 'out-of-stock' | 'discontinued'> = [
  'active',
  'out-of-stock',
  'discontinued',
]

// Generate 10,000 fake products
export const products: Product[] = Array.from({ length: 10000 }, (_, index) => {
  const id = index + 1
  const name = `${faker.helpers.arrayElement(woodTypes)} ${faker.commerce.productName()}`
  const slug = faker.helpers.slugify(name).toLowerCase()
  const category = faker.helpers.arrayElement(categories)
  const price = parseFloat(faker.commerce.price({ min: 50, max: 5000, dec: 0 }))
  const salePrice =
    Math.random() > 0.7
      ? parseFloat(faker.commerce.price({ min: 30, max: price, dec: 0 }))
      : undefined
  const image = `/placeholder.png?height=600&width=800`
  const woodType = faker.helpers.arrayElement(woodTypes)
  const stock = faker.number.int({ min: 0, max: 50 })
  const status = faker.helpers.arrayElement(statuses)
  const featured = faker.datatype.boolean()

  return {
    id,
    name,
    slug,
    category,
    price,
    salePrice,
    image,
    woodType,
    stock,
    status,
    featured,
  } as Product
})
