<script setup lang="ts">
interface Product {
  id: number
  name: string
  slug: string
  category: string
  price: number
  salePrice?: number
  image: string
  images: string[]
  woodType: string
  stock: number
  status: 'active' | 'out-of-stock' | 'discontinued'
  featured: boolean
  description: string
  features: string[]
  specifications: Record<string, string>
  sku: string
  barcode: string
  createdAt: string
  updatedAt: string
  salesData: { month: string; sales: number }[]
  relatedProducts: number[]
  reviews: {
    id: number
    customer: string
    rating: number
    date: string
    comment: string
  }[]
  inventoryHistory: {
    date: string
    type: string
    quantity: number
    notes: string
  }[]
}

const products: Record<number, Product> = {
  1: {
    id: 1,
    name: 'Walnut Dining Table',
    slug: 'walnut-dining-table',
    category: 'Dining',
    price: 1299,
    image: '/placeholder.png?height=600&width=800',
    images: [
      '/placeholder.png?height=600&width=800',
      '/placeholder.png?height=600&width=800',
      '/placeholder.png?height=600&width=800',
    ],
    woodType: 'Walnut',
    stock: 5,
    status: 'active',
    featured: true,
    description:
      'This elegant walnut dining table combines timeless design with exceptional craftsmanship. The rich, warm tones of the walnut wood create a welcoming atmosphere for family gatherings and dinner parties. Each table is handcrafted by our master woodworkers, ensuring the highest quality and attention to detail.',
    features: [
      'Solid walnut construction',
      'Hand-finished with natural oils',
      'Seats up to 8 people comfortably',
      'Dimensions: 200cm x 100cm x 75cm (L x W x H)',
      'Sustainably sourced wood',
      'Custom sizes available upon request',
    ],
    specifications: {
      dimensions: '200cm x 100cm x 75cm',
      weight: '45kg',
      material: 'Solid Walnut',
      finish: 'Natural Oil',
      assembly: 'Partial assembly required',
      warranty: '5-year warranty',
    },
    sku: 'WT-DT-001',
    barcode: '8901234567890',
    createdAt: '2023-01-15',
    updatedAt: '2023-11-20',
    salesData: [
      { month: 'Jan', sales: 2 },
      { month: 'Feb', sales: 1 },
      { month: 'Mar', sales: 3 },
      { month: 'Apr', sales: 2 },
      { month: 'May', sales: 4 },
      { month: 'Jun', sales: 3 },
    ],
    relatedProducts: [2, 9],
    reviews: [
      {
        id: 1,
        customer: 'Sarah M.',
        rating: 5,
        date: '2023-05-15',
        comment:
          'This dining table exceeded my expectations. The craftsmanship is exceptional, and it has become the centerpiece of our home. Worth every penny!',
      },
      {
        id: 2,
        customer: 'Ahmed K.',
        rating: 4,
        date: '2023-04-22',
        comment:
          "Beautiful table with excellent quality. The only reason I'm giving 4 stars instead of 5 is that assembly took longer than expected.",
      },
    ],
    inventoryHistory: [
      { date: '2023-11-20', type: 'Stock Update', quantity: 5, notes: 'Restocked' },
      { date: '2023-10-15', type: 'Sale', quantity: -1, notes: 'Order #ORD-2023-1234' },
      { date: '2023-09-30', type: 'Sale', quantity: -2, notes: 'Order #ORD-2023-1198' },
      { date: '2023-09-01', type: 'Stock Update', quantity: 8, notes: 'Initial inventory' },
    ],
  },
}

const router = useRouter()
const props = defineProps<{ id: string }>()

const activeTab = ref('overview')
const deleteDialogOpen = ref(false)
const selectedImage = ref(0)

const productId = parseInt(props.id)
const product = computed(() => products['1'])

const handleDelete = () => {
  console.log(`Deleting product ${product.value?.id}`)
  deleteDialogOpen.value = false
  router.push('/products')
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'out-of-stock':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    case 'discontinued':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    default:
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  }
}

const getStockStatus = (stock: number) => {
  if (stock > 5) return 'Good'
  if (stock > 0) return 'Low'
  return 'Out'
}

definePage({
  meta: {
    title: `Product ${product?.value?.name} - Jawbli Admin`,
    description: product.value?.description,
  },
})
</script>

<template>
  <div v-if="!product" class="flex flex-col items-center justify-center h-[50vh]">
    <h1 class="text-2xl font-heading font-bold mb-4">Product Not Found</h1>
    <p class="text-muted-foreground mb-6">
      The product you're looking for doesn't exist or has been removed.
    </p>
    <Button @click="router.push('/products')"> Back to Products </Button>
  </div>

  <div v-else class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Button variant="ghost" size="icon" @click="router.push('/products')" class="mr-2">
          <ILucideArrowLeft class="h-5 w-5" />
        </Button>
        <div>
          <h1 class="text-3xl font-heading font-bold">{{ product.name }}</h1>
          <p class="text-muted-foreground">Product details and information</p>
        </div>
      </div>
      <div class="flex gap-2">
        <Button
          variant="outline"
          @click="
            router.push({
              name: '/products/[id]',
            })
          "
        >
          <ILucideEye class="h-4 w-4 mr-2" />
          View on Site
        </Button>
        <Button @click="$router.push(`/products/${product.id}/edit`)">
          <ILucideEdit class="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" @click="deleteDialogOpen = true">
          <ILucideTrash2 class="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>

    <div class="border-b">
      <nav class="flex space-x-8">
        <button
          @click="activeTab = 'overview'"
          :class="{
            'border-primary text-foreground': activeTab === 'overview',
            'border-transparent text-muted-foreground hover:text-foreground':
              activeTab !== 'overview',
          }"
          class="py-2 px-1 border-b-2 font-medium text-sm"
        >
          Overview
        </button>
        <button
          @click="activeTab = 'inventory'"
          :class="{
            'border-primary text-foreground': activeTab === 'inventory',
            'border-transparent text-muted-foreground hover:text-foreground':
              activeTab !== 'inventory',
          }"
          class="py-2 px-1 border-b-2 font-medium text-sm"
        >
          Inventory
        </button>
        <button
          @click="activeTab = 'analytics'"
          :class="{
            'border-primary text-foreground': activeTab === 'analytics',
            'border-transparent text-muted-foreground hover:text-foreground':
              activeTab !== 'analytics',
          }"
          class="py-2 px-1 border-b-2 font-medium text-sm"
        >
          Analytics
        </button>
        <button
          @click="activeTab = 'reviews'"
          :class="{
            'border-primary text-foreground': activeTab === 'reviews',
            'border-transparent text-muted-foreground hover:text-foreground':
              activeTab !== 'reviews',
          }"
          class="py-2 px-1 border-b-2 font-medium text-sm"
        >
          Reviews
        </button>
      </nav>
    </div>

    <div v-show="activeTab === 'overview'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="md:col-span-2">
          <CardHeader>
            <CardTitle class="font-heading">Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div class="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    :src="product.images[selectedImage] || '/placeholder.png'"
                    :alt="product.name"
                    class="object-cover w-full h-full"
                  />
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="(image, index) in product.images"
                    :key="index"
                    :class="{
                      'border-primary': selectedImage === index,
                      'border-transparent': selectedImage !== index,
                    }"
                    class="relative aspect-square rounded-md overflow-hidden border-2"
                    @click="selectedImage = index"
                  >
                    <img
                      :src="image || '/placeholder.png'"
                      :alt="`${product.name} - Image ${index + 1}`"
                      class="object-cover w-full h-full"
                    />
                  </button>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <h3 class="text-sm font-medium text-muted-foreground">Name</h3>
                  <p class="text-lg font-medium">{{ product.name }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-muted-foreground">Description</h3>
                  <p class="text-sm">{{ product.description }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-muted-foreground">Category</h3>
                  <p>{{ product.category }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-muted-foreground">Wood Type</h3>
                  <p>{{ product.woodType }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-muted-foreground">Price</h3>
                  <template v-if="product.salePrice">
                    <div class="flex items-center">
                      <span class="text-lg font-medium">${{ product.salePrice }}</span>
                      <span class="text-sm text-muted-foreground line-through ml-2"
                        >${{ product.price }}</span
                      >
                      <Badge class="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                        Sale
                      </Badge>
                    </div>
                  </template>
                  <template v-else>
                    <p class="text-lg font-medium">${{ product.price }}</p>
                  </template>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge :class="getStatusColor(product.status)">
                    {{
                      product.status === 'active'
                        ? 'Active'
                        : product.status === 'out-of-stock'
                          ? 'Out of Stock'
                          : 'Discontinued'
                    }}
                  </Badge>
                  <Badge
                    v-if="product.featured"
                    class="ml-2 bg-secondary/10 text-secondary border-secondary/20"
                    >Featured</Badge
                  >
                </div>
              </div>
            </div>

            <Separator class="my-6" />

            <div>
              <h3 class="text-lg font-medium mb-4">Features</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
              </ul>
            </div>

            <Separator class="my-6" />

            <div>
              <h3 class="text-lg font-medium mb-4">Specifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="[key, value] in Object.entries(product.specifications)"
                  :key="key"
                  class="flex justify-between py-2 border-b"
                >
                  <span class="font-medium capitalize">{{ key }}</span>
                  <span class="text-muted-foreground">{{ value }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div class="flex justify-between py-2 border-b">
                  <span class="text-muted-foreground">SKU</span>
                  <span class="font-medium">{{ product.sku }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-muted-foreground">Barcode</span>
                  <span class="font-medium">{{ product.barcode }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-muted-foreground">Created</span>
                  <span class="font-medium">{{ product.createdAt }}</span>
                </div>
                <div class="flex justify-between py-2 border-b">
                  <span class="text-muted-foreground">Last Updated</span>
                  <span class="font-medium">{{ product.updatedAt }}</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-muted-foreground">Stock</span>
                  <div class="flex items-center">
                    <span
                      :class="`w-2 h-2 rounded-full mr-2 ${
                        product.stock > 5
                          ? 'bg-green-500'
                          : product.stock > 0
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`"
                    ></span>
                    <span class="font-medium">{{ product.stock }} units</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Related Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div
                  v-for="id in product.relatedProducts"
                  :key="id"
                  class="flex items-center gap-3"
                >
                  <div class="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      :src="products[id]?.image || '/placeholder.png'"
                      :alt="products[id]?.name"
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium truncate">{{ products[id]?.name }}</p>
                    <p class="text-sm text-muted-foreground">${{ products[id]?.price }}</p>
                  </div>
                  <Button variant="ghost" size="icon" @click="$router.push(`/products/${id}`)">
                    <ILucideEye class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <div v-show="activeTab === 'inventory'" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Inventory History</CardTitle>
          <CardDescription>Track stock changes and order history</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="(entry, index) in product.inventoryHistory" :key="index">
                  <TableCell>{{ entry.date }}</TableCell>
                  <TableCell>
                    <Badge
                      :class="{
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300':
                          entry.type === 'Stock Update',
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300':
                          entry.type === 'Sale',
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300':
                          entry.type !== 'Stock Update' && entry.type !== 'Sale',
                      }"
                    >
                      {{ entry.type }}
                    </Badge>
                  </TableCell>
                  <TableCell :class="entry.quantity > 0 ? 'text-green-600' : 'text-red-600'">
                    {{ entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity }}
                  </TableCell>
                  <TableCell>{{ entry.notes }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Current Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-4xl font-bold">{{ product.stock }}</p>
                <p class="text-muted-foreground">Units in stock</p>
              </div>
              <div class="w-24 h-24 rounded-full border-8 flex items-center justify-center">
                <span
                  :class="`text-lg font-bold ${
                    product.stock > 5
                      ? 'text-green-500'
                      : product.stock > 0
                        ? 'text-yellow-500'
                        : 'text-red-500'
                  }`"
                >
                  {{ getStockStatus(product.stock) }}
                </span>
              </div>
            </div>
            <Separator class="my-4" />
            <div class="flex justify-between">
              <Button>
                <ILucideShoppingCart class="h-4 w-4 mr-2" />
                Update Stock
              </Button>
              <Button variant="outline">
                <ILucideHistory class="h-4 w-4 mr-2" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium">Walnut Wood</p>
                  <p class="text-sm text-muted-foreground">Primary material</p>
                </div>
                <Badge>2.5 sqm per unit</Badge>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium">Natural Oil Finish</p>
                  <p class="text-sm text-muted-foreground">Finishing material</p>
                </div>
                <Badge>0.5 L per unit</Badge>
              </div>
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-medium">Metal Brackets</p>
                  <p class="text-sm text-muted-foreground">Support material</p>
                </div>
                <Badge>8 pcs per unit</Badge>
              </div>
            </div>
            <Separator class="my-4" />
            <Button variant="outline" class="w-full">
              <ILucideImage class="h-4 w-4 mr-2" />
              View Material Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

    <div v-show="activeTab === 'analytics'" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Sales Performance</CardTitle>
          <CardDescription>Monthly sales data for the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[300px]">
            <!-- In a real app, you would use a charting library like Recharts -->
            <div class="flex h-full items-end gap-2">
              <div
                v-for="data in product.salesData"
                :key="data.month"
                class="flex flex-col items-center flex-1"
              >
                <div
                  class="w-full bg-primary rounded-t-md"
                  :style="{ height: `${(data.sales / 4) * 100}%` }"
                ></div>
                <div class="mt-2 text-xs">{{ data.month }}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="font-heading text-lg">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">15</div>
            <p class="text-muted-foreground">Units sold</p>
            <div class="flex items-center mt-2 text-sm">
              <span class="text-green-500 font-medium">+12.5%</span>
              <span class="text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="font-heading text-lg">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">$19,485</div>
            <p class="text-muted-foreground">Total revenue</p>
            <div class="flex items-center mt-2 text-sm">
              <span class="text-green-500 font-medium">+8.3%</span>
              <span class="text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="font-heading text-lg">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold">3.2%</div>
            <p class="text-muted-foreground">Views to purchase</p>
            <div class="flex items-center mt-2 text-sm">
              <span class="text-red-500 font-medium">-1.5%</span>
              <span class="text-muted-foreground ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div
              class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/50"
            >
              <h3 class="font-medium text-green-800 dark:text-green-300 mb-2">
                Strong Performance
              </h3>
              <p class="text-sm text-green-700 dark:text-green-400">
                This product has shown consistent sales growth over the past 3 months. Consider
                increasing stock levels to meet demand.
              </p>
            </div>

            <div
              class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50"
            >
              <h3 class="font-medium text-blue-800 dark:text-blue-300 mb-2">Seasonal Trend</h3>
              <p class="text-sm text-blue-700 dark:text-blue-400">
                Sales typically increase during the summer months. Plan inventory accordingly for
                the upcoming season.
              </p>
            </div>

            <div
              class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/50"
            >
              <h3 class="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Recommendation</h3>
              <p class="text-sm text-yellow-700 dark:text-yellow-400">
                Consider bundling this product with complementary items to increase average order
                value.
              </p>
            </div>
          </div>
          <div class="mt-4 text-center">
            <Button @click="$router.push('/admin/reports/products')">
              <ILucideBarChart3 class="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <div v-show="activeTab === 'reviews'" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Customer Reviews</CardTitle>
          <CardDescription>
            {{ product.reviews.length }} reviews with an average rating of
            {{
              (
                product.reviews.reduce((acc, review) => acc + review.rating, 0) /
                product.reviews.length
              ).toFixed(1)
            }}
            out of 5
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-6">
            <div
              v-for="review in product.reviews"
              :key="review.id"
              class="border-b pb-6 last:border-0 last:pb-0"
            >
              <div class="flex justify-between mb-2">
                <h3 class="font-medium">{{ review.customer }}</h3>
                <span class="text-sm text-muted-foreground">{{ review.date }}</span>
              </div>
              <div class="flex mb-2">
                <ILucideStar
                  v-for="star in [1, 2, 3, 4, 5]"
                  :key="star"
                  :class="{
                    'text-yellow-400 fill-yellow-400': review.rating >= star,
                    'text-gray-300': review.rating < star,
                  }"
                  class="h-5 w-5"
                />
              </div>
              <p class="text-muted-foreground">{{ review.comment }}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="font-heading">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-2">
              <div class="flex items-center w-12">
                <span>{{ rating }}</span>
                <ILucideStar
                  :class="{
                    'text-yellow-400 fill-yellow-400': true,
                    'text-gray-300': false,
                  }"
                  class="h-4 w-4 ml-1"
                />
              </div>
              <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-yellow-400"
                  :style="{
                    width: `${(product.reviews.filter((r) => r.rating === rating).length / product.reviews.length) * 100}%`,
                  }"
                ></div>
              </div>
              <div class="w-12 text-right text-sm text-muted-foreground">
                {{ product.reviews.filter((r) => r.rating === rating).length }} ({{
                  Math.round(
                    (product.reviews.filter((r) => r.rating === rating).length /
                      product.reviews.length) *
                      100,
                  )
                }}%)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="deleteDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the product from the
            database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="deleteDialogOpen = false"> Cancel </Button>
          <Button variant="destructive" @click="handleDelete"> Delete </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
