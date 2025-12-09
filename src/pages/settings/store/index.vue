<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Store Settings</h1>
      <p class="text-muted-foreground">Manage your store information and business details</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar navigation -->
      <div class="lg:col-span-1">
        <div class="border rounded-lg">
          <div class="p-4 border-b">
            <h2 class="font-semibold">Settings</h2>
          </div>
          <div class="p-2">
            <nav class="space-y-1">
              <RouterLink
                to="/settings"
                :class="[
                  $route.path === '/settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideSettings class="h-4 w-4" />
                Profile
              </RouterLink>
              <RouterLink
                to="/settings/store"
                :class="[
                  $route.path === '/settings/store'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideStore class="h-4 w-4" />
                Store
              </RouterLink>
              <RouterLink
                to="/settings/business-hours"
                :class="[
                  $route.path === '/settings/business-hours'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideClock class="h-4 w-4" />
                Business Hours
              </RouterLink>
              <RouterLink
                to="/settings/delivery-zone"
                :class="[
                  $route.path === '/settings/delivery-zone'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideMapPin class="h-4 w-4" />
                Delivery Zones
              </RouterLink>
              <RouterLink
                to="/settings/billing"
                :class="[
                  $route.path === '/settings/billing'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideCreditCard class="h-4 w-4" />
                Billing
              </RouterLink>
              <RouterLink
                to="/settings/limits"
                :class="[
                  $route.path === '/settings/limits'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideBarChart3 class="h-4 w-4" />
                Limits
              </RouterLink>
              <RouterLink
                to="/settings/feedback"
                :class="[
                  $route.path === '/settings/feedback'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideMessageCircle class="h-4 w-4" />
                Feedback
              </RouterLink>
              <RouterLink
                to="/settings/support"
                :class="[
                  $route.path === '/settings/support'
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted',
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                ]"
              >
                <ILucideHelpCircle class="h-4 w-4" />
                Support
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle class="font-heading">Store Information</CardTitle>
            <CardDescription>Update your business details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="saveStoreInfo">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <Label for="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      v-model="storeInfo.businessName"
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div>
                    <Label for="businessNameAr">Business Name (Arabic)</Label>
                    <Input
                      id="businessNameAr"
                      v-model="storeInfo.businessNameAr"
                      placeholder="أدخل اسم نشاطك التجاري"
                    />
                  </div>
                  <div>
                    <Label for="description">Description</Label>
                    <Textarea
                      id="description"
                      v-model="storeInfo.description"
                      placeholder="Enter a brief description of your business"
                      rows="3"
                    />
                  </div>
                  <div>
                    <Label for="address">Address</Label>
                    <Textarea
                      id="address"
                      v-model="storeInfo.address"
                      placeholder="Enter your business address"
                      rows="2"
                    />
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <Label for="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      v-model="storeInfo.phone"
                      placeholder="Enter your business phone"
                    />
                  </div>
                  <div>
                    <Label for="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      v-model="storeInfo.whatsapp"
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>
                  <div>
                    <Label for="email">Business Email</Label>
                    <Input
                      id="email"
                      v-model="storeInfo.email"
                      type="email"
                      placeholder="Enter your business email"
                    />
                  </div>
                  <div>
                    <Label for="website">Website</Label>
                    <Input
                      id="website"
                      v-model="storeInfo.website"
                      placeholder="Enter your website URL"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Store Appearance</CardTitle>
            <CardDescription>Customize how your store appears to customers</CardDescription>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="saveAppearance">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <Label for="logo">Store Logo</Label>
                    <div class="flex items-center gap-4">
                      <Avatar class="h-16 w-16">
                        <AvatarImage :src="storeInfo.logo" :alt="storeInfo.businessName" />
                        <AvatarFallback>{{ getInitials(storeInfo.businessName) }}</AvatarFallback>
                      </Avatar>
                      <Button type="button" variant="outline" size="sm"> Change Logo </Button>
                    </div>
                  </div>

                  <div>
                    <Label for="theme">Theme Color</Label>
                    <div class="flex gap-2">
                      <div
                        v-for="color in themeColors"
                        :key="color.value"
                        class="h-8 w-8 rounded-full cursor-pointer border-2"
                        :class="{ 'border-primary': storeInfo.theme === color.value }"
                        :style="{ backgroundColor: color.value }"
                        @click="storeInfo.theme = color.value"
                        :title="color.name"
                      />
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div>
                    <Label>Store Categories</Label>
                    <div class="flex flex-wrap gap-2">
                      <Badge
                        v-for="category in storeInfo.categories"
                        :key="category"
                        variant="secondary"
                        class="cursor-pointer"
                        @click="removeCategory(category)"
                      >
                        {{ category }}
                        <ILucideX class="h-3 w-3 ml-1" />
                      </Badge>
                      <div class="flex gap-2">
                        <Select v-model="newCategory">
                          <SelectTrigger class="w-40">
                            <SelectValue placeholder="Add category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                            <SelectItem value="beauty">Beauty</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="toys">Toys</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          @click="addCategory"
                          :disabled="!newCategory"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label for="social">Social Media Links</Label>
                    <div class="space-y-2">
                      <div class="flex gap-2">
                        <Input v-model="storeInfo.social.facebook" placeholder="Facebook URL" />
                      </div>
                      <div class="flex gap-2">
                        <Input v-model="storeInfo.social.instagram" placeholder="Instagram URL" />
                      </div>
                      <div class="flex gap-2">
                        <Input v-model="storeInfo.social.twitter" placeholder="Twitter URL" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end">
                <Button type="submit">Save Appearance</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { showSuccess } = useToast()

// Mock store information
const storeInfo = ref({
  businessName: 'Furniture Store',
  businessNameAr: 'متجر الأثاث',
  description: 'Premium furniture store offering high-quality products for your home',
  address: '123 Main Street, Algiers, Algeria',
  phone: '+213 123 456 789',
  whatsapp: '+213 123 456 789',
  email: 'contact@furniturestore.dz',
  website: 'https://furniturestore.dz',
  logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Furniture+Store',
  theme: '#3b82f6', // blue-500
  categories: ['furniture', 'home-decor'],
  social: {
    facebook: 'https://facebook.com/furniturestore',
    instagram: 'https://instagram.com/furniturestore',
    twitter: 'https://twitter.com/furniturestore',
  },
})

const newCategory = ref('')
const themeColors = [
  { name: 'Blue', value: '#3b82f6' }, // blue-500
  { name: 'Green', value: '#10b981' }, // emerald-500
  { name: 'Purple', value: '#8b5cf6' }, // violet-500
  { name: 'Red', value: '#ef4444' }, // red-500
  { name: 'Orange', value: '#f97316' }, // orange-500
]

// Helper to get initials from name
const getInitials = (name: string) => {
  const names = name.split(' ')
  return names
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

// Add category to store
const addCategory = () => {
  if (newCategory.value && !storeInfo.value.categories.includes(newCategory.value)) {
    storeInfo.value.categories.push(newCategory.value)
    newCategory.value = ''
  }
}

// Remove category from store
const removeCategory = (category: string) => {
  storeInfo.value.categories = storeInfo.value.categories.filter((c) => c !== category)
}

// Save store information
const saveStoreInfo = () => {
  showSuccess('Store information updated successfully!')
  console.log('Store info updated:', storeInfo.value)
}

// Save appearance settings
const saveAppearance = () => {
  showSuccess('Store appearance updated successfully!')
  console.log('Appearance updated:', storeInfo.value)
}
</script>
