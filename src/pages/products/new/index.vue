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
}

const router = useRouter()

const formData = reactive({
  name: '',
  slug: '',
  description: '',
  category: '',
  woodType: '',
  price: '',
  salePrice: '',
  stock: '0',
  status: 'active',
  featured: false,
  sku: '',
  barcode: '',
  features: '',
  dimensions: '',
  weight: '',
  material: '',
  finish: '',
  assembly: '',
  warranty: '',
})

const images = ref<string[]>([])
const activeTab = ref('basic')
const discardDialogOpen = ref(false)
const isSubmitting = ref(false)

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
  router.push('/products')
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true

  try {
    // In a real app, you would call an API to create the product
    console.log('Creating product with data:', { ...formData, images: images.value })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to products page
    router.push('/products')
  } catch (error) {
    console.error('Error creating product:', error)
  } finally {
    isSubmitting.value = false
  }
}

const generateSlug = () => {
  const slug = formData.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  formData.slug = slug
}

definePage({
  meta: {
    title: 'Add New Product - Jawbli Admin',
    description: 'Create a new product for your catalog',
  },
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <Button variant="ghost" size="icon" @click="$router.push('/products')" class="mr-2">
          <ILucideArrowLeft class="h-5 w-5" />
        </Button>
        <div>
          <h1 class="text-3xl font-heading font-bold">Add New Product</h1>
          <p class="text-muted-foreground">Create a new product listing</p>
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
              <CardDescription>Add the basic product details</CardDescription>
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
                    @blur="
                      () => {
                        if (formData.name && !formData.slug) {
                          generateSlug()
                        }
                      }
                    "
                    required
                  />
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <Label for="slug">Slug</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="h-5 text-xs"
                      @click="generateSlug"
                      v-if="formData.name"
                    >
                      Generate from name
                    </Button>
                  </div>
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
                    v-model="formData.price"
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
                    v-model="formData.salePrice"
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
              <CardDescription>Add product images</CardDescription>
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
                    <ILucideX class="h-4 w-4" />
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
                  <ILucideUpload class="h-8 w-8 text-muted-foreground mb-2" />
                  <span class="text-sm font-medium">Add Image</span>
                </button>
              </div>
              <p class="text-sm text-muted-foreground mt-4">
                The first image will be used as the main product image. You can add up to 8 images.
              </p>
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
                    v-model="formData.stock"
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
          {{ isSubmitting ? 'Creating...' : 'Create Product' }}
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
