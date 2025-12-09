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
        <Button
          variant="ghost"
          size="icon"
          @click="$router.push(`/products/${productId}`)"
          class="mr-2"
        >
          <ArrowLeft class="h-5 w-5" />
        </Button>
        <div>
          <h1 class="text-3xl font-heading font-bold">Edit Product</h1>
          <p class="text-muted-foreground">Update product information</p>
        </div>
      </div>
    </div>

    <form @submit="handleSubmit">
      <div class="border-b">
        <nav class="flex space-x-8">
          <button
            @click="activeTab = 'basic'"
            :class="{
              'border-primary text-foreground': activeTab === 'basic',
              'border-transparent text-muted-foreground hover:text-foreground':
                activeTab !== 'basic',
            }"
            class="py-2 px-1 border-b-2 font-medium text-sm"
          >
            Basic Info
          </button>
          <button
            @click="activeTab = 'images'"
            :class="{
              'border-primary text-foreground': activeTab === 'images',
              'border-transparent text-muted-foreground hover:text-foreground':
                activeTab !== 'images',
            }"
            class="py-2 px-1 border-b-2 font-medium text-sm"
          >
            Images
          </button>
          <button
            @click="activeTab = 'details'"
            :class="{
              'border-primary text-foreground': activeTab === 'details',
              'border-transparent text-muted-foreground hover:text-foreground':
                activeTab !== 'details',
            }"
            class="py-2 px-1 border-b-2 font-medium text-sm"
          >
            Details
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
        </nav>
      </div>

      <div class="mt-6">
        <div v-show="activeTab === 'basic'" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Basic Information</CardTitle>
              <CardDescription>Edit the basic product details</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    v-model="formData.name"
                    @input="handleInputChange"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    v-model="formData.slug"
                    @input="handleInputChange"
                    required
                  />
                  <p class="text-xs text-muted-foreground">
                    Used for the product URL. Usually lowercase with hyphens.
                  </p>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  v-model="formData.description"
                  @input="handleInputChange"
                  rows="5"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="category">Category</Label>
                  <Select
                    v-model="formData.category"
                    @update:model-value="(value) => handleSelectChange('category', value)"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Living Room">Living Room</SelectItem>
                      <SelectItem value="Dining">Dining</SelectItem>
                      <SelectItem value="Bedroom">Bedroom</SelectItem>
                      <SelectItem value="Kitchen">Kitchen</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="space-y-2">
                  <Label for="woodType">Wood Type</Label>
                  <Select
                    v-model="formData.woodType"
                    @update:model-value="(value) => handleSelectChange('woodType', value)"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select wood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Walnut">Walnut</SelectItem>
                      <SelectItem value="Oak">Oak</SelectItem>
                      <SelectItem value="Maple">Maple</SelectItem>
                      <SelectItem value="Cherry">Cherry</SelectItem>
                      <SelectItem value="Mahogany">Mahogany</SelectItem>
                      <SelectItem value="Pine">Pine</SelectItem>
                      <SelectItem value="Teak">Teak</SelectItem>
                      <SelectItem value="Ebony">Ebony</SelectItem>
                      <SelectItem value="Rosewood">Rosewood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="price">Regular Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    v-model.number="formData.price"
                    @input="handleInputChange"
                    required
                  />
                </div>
                <div class="space-y-2">
                  <Label for="salePrice">Sale Price ($)</Label>
                  <Input
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    v-model.number="formData.salePrice"
                    @input="handleInputChange"
                    placeholder="Leave empty if not on sale"
                  />
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <Switch
                  id="featured"
                  v-model:model-value="formData.featured"
                  @update:model-value="
                    (checked) => handleSwitchChange('featured', checked as boolean)
                  "
                />
                <Label for="featured">Featured Product</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-show="activeTab === 'images'" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Product Images</CardTitle>
              <CardDescription>Manage product images</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="(image, index) in images" :key="index" class="relative group">
                  <div class="aspect-square relative rounded-md overflow-hidden border">
                    <img
                      :src="image || '/placeholder.png'"
                      :alt="`Product image ${index + 1}`"
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="handleRemoveImage(index)"
                  >
                    <X class="h-4 w-4" />
                  </Button>
                  <div
                    v-if="index === 0"
                    class="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded"
                  >
                    Main Image
                  </div>
                </div>
                <button
                  type="button"
                  @click="handleAddImage"
                  class="aspect-square flex flex-col items-center justify-center rounded-md border border-dashed hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Upload class="h-8 w-8 text-muted-foreground mb-2" />
                  <span class="text-sm font-medium">Add Image</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-show="activeTab === 'details'" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Product Features</CardTitle>
              <CardDescription>Add key features (one per line)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="features"
                name="features"
                v-model="formData.features"
                @input="handleInputChange"
                rows="6"
                placeholder="Solid walnut construction
Hand-finished with natural oils
Seats up to 8 people comfortably"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Specifications</CardTitle>
              <CardDescription>Add detailed product specifications</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    v-model="formData.dimensions"
                    @input="handleInputChange"
                    placeholder="e.g. 200cm x 100cm x 75cm"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    v-model="formData.weight"
                    @input="handleInputChange"
                    placeholder="e.g. 45kg"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="material">Material</Label>
                  <Input
                    id="material"
                    name="material"
                    v-model="formData.material"
                    @input="handleInputChange"
                    placeholder="e.g. Solid Walnut"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="finish">Finish</Label>
                  <Input
                    id="finish"
                    name="finish"
                    v-model="formData.finish"
                    @input="handleInputChange"
                    placeholder="e.g. Natural Oil"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="assembly">Assembly</Label>
                  <Input
                    id="assembly"
                    name="assembly"
                    v-model="formData.assembly"
                    @input="handleInputChange"
                    placeholder="e.g. Partial assembly required"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    name="warranty"
                    v-model="formData.warranty"
                    @input="handleInputChange"
                    placeholder="e.g. 5-year warranty"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div v-show="activeTab === 'inventory'" class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle class="font-heading">Inventory Information</CardTitle>
              <CardDescription>Manage stock and product identifiers</CardDescription>
            </CardHeader>
            <CardContent class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="sku">SKU</Label>
                  <Input
                    id="sku"
                    name="sku"
                    v-model="formData.sku"
                    @input="handleInputChange"
                    placeholder="e.g. WT-DT-001"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    v-model="formData.barcode"
                    @input="handleInputChange"
                    placeholder="e.g. 8901234567890"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <Label for="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    v-model.number="formData.stock"
                    @input="handleInputChange"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="status">Status</Label>
                  <Select
                    v-model="formData.status"
                    @update:model-value="(value) => handleSelectChange('status', value)"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" @click="discardDialogOpen = true"> Cancel </Button>
        <Button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
        </Button>
      </div>
    </form>

    <!-- Discard Changes Dialog -->
    <Dialog v-model:open="discardDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription
            >Any unsaved changes will be lost. This action cannot be undone.</DialogDescription
          >
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" @click="discardDialogOpen = false"> Continue Editing </Button>
          <Button variant="destructive" @click="handleDiscard"> Discard Changes </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'


import { ArrowLeft, Upload, X, Star } from 'lucide-vue-next'

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
}

// Mock product data
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
  },
}

const router = useRouter()
const props = defineProps<{ id: string }>()

const productId = parseInt(props.id)
const product = products[productId as keyof typeof products]

const formData = reactive({
  name: product?.name || '',
  slug: product?.slug || '',
  description: product?.description || '',
  category: product?.category || '',
  woodType: product?.woodType || '',
  price: product?.price || 0,
  salePrice: product?.salePrice || '',
  stock: product?.stock || 0,
  status: product?.status || 'active',
  featured: product?.featured || false,
  sku: product?.sku || '',
  barcode: product?.barcode || '',
  features: product?.features?.join('\n') || '',
  dimensions: product?.specifications?.dimensions || '',
  weight: product?.specifications?.weight || '',
  material: product?.specifications?.material || '',
  finish: product?.specifications?.finish || '',
  assembly: product?.specifications?.assembly || '',
  warranty: product?.specifications?.warranty || '',
})

const images = ref<string[]>(product?.images || [])
const activeTab = ref('basic')
const discardDialogOpen = ref(false)
const isSubmitting = ref(false)

if (!product) {
  // Redirect to products page if product not found
  router.push('/products')
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  const name = target.name
  const value = target.value
  ;(formData as any)[name] = value
}

const handleSelectChange = (name: string, value: any) => {
  ;(formData as any)[name] = value ?? ''
}

const handleSwitchChange = (name: string, checked: boolean) => {
  ;(formData as any)[name] = checked
}

const handleRemoveImage = (index: number) => {
  images.value = images.value.filter((_, i) => i !== index)
}

const handleAddImage = () => {
  // In a real app, you would open a file picker and upload the image
  // For this demo, we'll just add a placeholder
  images.value = [...images.value, '/placeholder.png?height=600&width=800']
}

const handleDiscard = () => {
  discardDialogOpen.value = false
  router.push(`/products/${productId}`)
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true

  try {
    // In a real app, you would call an API to update the product
    console.log('Updating product with data:', { ...formData, images: images.value })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to product detail page
    router.push(`/products/${productId}`)
  } catch (error) {
    console.error('Error updating product:', error)
  } finally {
    isSubmitting.value = false
  }
}


</script>
