<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-heading font-bold">Delivery Zones</h1>
      <p class="text-muted-foreground">Manage your delivery areas and pricing</p>
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
            <CardTitle class="font-heading">Delivery Zones</CardTitle>
            <CardDescription>Define delivery areas and set pricing for each zone</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-medium">Active Zones</h3>
              <Button type="button" variant="outline" @click="addZone">
                <ILucidePlus class="h-4 w-4 mr-2" />
                Add Zone
              </Button>
            </div>

            <div v-if="zones.length === 0" class="text-center py-8 text-muted-foreground">
              <ILucideMapPin class="h-12 w-12 mx-auto mb-3" />
              <p>No delivery zones set. Add delivery zones to define your service areas.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="(zone, index) in zones" :key="index" class="p-4 border rounded-lg">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <h4 class="font-medium">{{ zone.name }}</h4>
                      <Badge variant="outline">{{ zone.regions.length }} regions</Badge>
                    </div>
                    <p class="text-sm text-muted-foreground mt-1">
                      {{ zone.description }}
                    </p>
                    <div class="mt-2 flex flex-wrap gap-1">
                      <Badge v-for="region in zone.regions" :key="region.code" variant="secondary">
                        {{ region.name }}
                      </Badge>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <Button type="button" variant="outline" size="sm" @click="editZone(index)">
                      Edit
                    </Button>
                    <Button type="button" variant="outline" size="sm" @click="removeZone(index)">
                      Remove
                    </Button>
                  </div>
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p class="text-sm text-muted-foreground">Delivery Price</p>
                    <p class="font-medium">{{ formatCurrency(zone.deliveryPrice) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">Delivery Time</p>
                    <p class="font-medium">{{ zone.deliveryTime }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-muted-foreground">Status</p>
                    <Badge :variant="zone.active ? 'default' : 'secondary'">
                      {{ zone.active ? 'Active' : 'Inactive' }}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card class="mt-6">
          <CardHeader>
            <CardTitle class="font-heading">Delivery Methods</CardTitle>
            <CardDescription
              >Configure different delivery options for your customers</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="(method) in deliveryMethods"
                :key="method.id"
                class="p-4 border rounded-lg"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <h4 class="font-medium">{{ method.name }}</h4>
                    <p class="text-sm text-muted-foreground">{{ method.description }}</p>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="text-right">
                      <p class="font-medium">{{ formatCurrency(method.price) }}</p>
                      <p class="text-sm text-muted-foreground">{{ method.timeEstimate }}</p>
                    </div>
                    <Switch v-model:model-value="method.enabled" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Zone Dialog -->
    <Dialog v-model:open="showZoneDialog">
      <DialogTrigger as-child>
        <div class="hidden"></div>
      </DialogTrigger>
      <DialogContent class="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{{
            editingZoneIndex !== null ? 'Edit Delivery Zone' : 'Add Delivery Zone'
          }}</DialogTitle>
          <DialogDescription>
            {{
              editingZoneIndex !== null
                ? 'Modify the delivery zone details'
                : 'Create a new delivery zone with regions and pricing'
            }}
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label for="zoneName">Zone Name</Label>
              <Input id="zoneName" v-model="currentZone.name" placeholder="e.g. City Center" />
            </div>
            <div>
              <Label for="zoneDeliveryTime">Delivery Time</Label>
              <Input
                id="zoneDeliveryTime"
                v-model="currentZone.deliveryTime"
                placeholder="e.g. 2-4 days"
              />
            </div>
          </div>

          <div>
            <Label for="zoneDescription">Description</Label>
            <Textarea
              id="zoneDescription"
              v-model="currentZone.description"
              placeholder="Describe this delivery zone"
              rows="2"
            />
          </div>

          <div>
            <Label>Regions</Label>
            <div class="space-y-2 mt-2">
              <div class="flex gap-2">
                <Select v-model="selectedRegion">
                  <SelectTrigger class="flex-1">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="region in availableRegions"
                      :key="region.code"
                      :value="region.code"
                    >
                      {{ region.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  @click="addRegionToZone"
                  :disabled="!selectedRegion"
                >
                  Add
                </Button>
              </div>

              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="region in currentZone.regions"
                  :key="region.code"
                  variant="secondary"
                  class="flex items-center gap-1"
                >
                  {{ region.name }}
                  <button
                    type="button"
                    class="ml-1 hover:text-destructive"
                    @click="removeRegionFromZone(region.code)"
                  >
                    <ILucideX class="h-3 w-3" />
                  </button>
                </Badge>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label for="zoneDeliveryPrice">Delivery Price (DZD)</Label>
              <Input
                id="zoneDeliveryPrice"
                v-model.number="currentZone.deliveryPrice"
                type="number"
                placeholder="e.g. 500"
              />
            </div>

            <div>
              <Label for="zoneDeliveryPriceType">Price Type</Label>
              <Select v-model="currentZone.priceType">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="per_kg">Per Kilogram</SelectItem>
                  <SelectItem value="per_item">Per Item</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="flex items-center">
            <Switch id="zoneActive" v-model:model-value="currentZone.active" class="mr-2" />
            <Label for="zoneActive">Active Zone</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" @click="closeZoneDialog"> Cancel </Button>
          <Button type="button" @click="saveZone">
            {{ editingZoneIndex !== null ? 'Update Zone' : 'Add Zone' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DeliveryZone {
  id: string
  name: string
  description: string
  regions: { code: string; name: string }[]
  deliveryPrice: number
  deliveryTime: string
  priceType: string
  active: boolean
}

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
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/composables/useToast'
import { ALGERIAN_WILAYAS } from '@/utils/constants'

const { showSuccess, showError } = useToast()

// Delivery zones
const zones = ref<DeliveryZone[]>([
  {
    id: 'zone-1',
    name: 'Algiers City',
    description: 'Central Algiers delivery zone',
    regions: [{ code: '16', name: 'Alger' }],
    deliveryPrice: 500,
    deliveryTime: '1-2 days',
    priceType: 'fixed',
    active: true,
  },
  {
    id: 'zone-2',
    name: 'Greater Algiers',
    description: 'Delivery to surrounding areas of Algiers',
    regions: [
      { code: '09', name: 'Blida' },
      { code: '35', name: 'Boumerdès' },
      { code: '42', name: 'Tipaza' },
    ],
    deliveryPrice: 800,
    deliveryTime: '2-3 days',
    priceType: 'fixed',
    active: true,
  },
  {
    id: 'zone-3',
    name: 'Major Cities',
    description: 'Delivery to major cities across Algeria',
    regions: [
      { code: '31', name: 'Oran' },
      { code: '25', name: 'Constantine' },
      { code: '21', name: 'Skikda' },
      { code: '19', name: 'Sétif' },
    ],
    deliveryPrice: 1200,
    deliveryTime: '3-5 days',
    priceType: 'fixed',
    active: true,
  },
])

// Delivery methods
const deliveryMethods = ref([
  {
    id: 'home',
    name: 'Home Delivery',
    description: "Delivery to customer's address",
    price: 500,
    timeEstimate: '2-4 days',
    enabled: true,
  },
  {
    id: 'desk',
    name: 'Stopdesk',
    description: 'Delivery to pickup point',
    price: 400,
    timeEstimate: '1-3 days',
    enabled: true,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    description: 'Priority delivery within 24 hours',
    price: 1500,
    timeEstimate: '24 hours',
    enabled: false,
  },
])

// Zone dialog
const showZoneDialog = ref(false)
const editingZoneIndex = ref<number | null>(null)
const currentZone = ref<DeliveryZone>({
  id: '',
  name: '',
  description: '',
  regions: [] as { code: string; name: string }[],
  deliveryPrice: 500,
  deliveryTime: '2-4 days',
  priceType: 'fixed',
  active: true,
})

// Region selection
const selectedRegion = ref('')

// Get available regions (not already in current zone)
const availableRegions = computed(() => {
  const currentZoneRegionCodes = currentZone.value.regions.map((r) => r.code)
  return ALGERIAN_WILAYAS.filter((region) => !currentZoneRegionCodes.includes(region.code))
})

// Add region to current zone
const addRegionToZone = () => {
  if (!selectedRegion.value) return

  const region = ALGERIAN_WILAYAS.find((r) => r.code === selectedRegion.value)
  if (region) {
    currentZone.value.regions.push({
      code: region.code,
      name: region.name,
    })
    selectedRegion.value = ''
  }
}

// Remove region from current zone
const removeRegionFromZone = (code: string) => {
  currentZone.value.regions = currentZone.value.regions.filter((r) => r.code !== code)
}

// Add new zone
const addZone = () => {
  editingZoneIndex.value = null
  currentZone.value = {
    id: `zone-${Date.now()}`,
    name: '',
    description: '',
    regions: [],
    deliveryPrice: 500,
    deliveryTime: '2-4 days',
    priceType: 'fixed',
    active: true,
  }
  showZoneDialog.value = true
}

const editZone = (index: number) => {
  editingZoneIndex.value = index
  const zone = zones.value[index];
  if (!zone) {
    currentZone.value = {
      id: '',
      name: '',
      description: '',
      regions: [],
      deliveryPrice: 500,
      deliveryTime: '2-4 days',
      priceType: 'fixed',
      active: true,
    };
    return;
  }

  currentZone.value = {
    id: zone.id || '',
    name: zone.name || '',
    description: zone.description || '',
    regions: zone.regions || [],
    deliveryPrice: zone.deliveryPrice || 0,
    deliveryTime: zone.deliveryTime || '',
    priceType: zone.priceType || '',
    active: zone.active || false,
  };
  showZoneDialog.value = true
}

// Remove zone
const removeZone = (index: number) => {
  zones.value.splice(index, 1)
  showSuccess('Delivery zone removed')
}

// Save zone
const saveZone = () => {
  if (!currentZone.value.name.trim()) {
    showError('Zone name is required')
    return
  }

  if (currentZone.value.regions.length === 0) {
    showError('At least one region must be selected')
    return
  }

  if (editingZoneIndex.value !== null) {
    // Update existing zone
    zones.value[editingZoneIndex.value] = { ...currentZone.value }
    showSuccess('Delivery zone updated')
  } else {
    // Add new zone
    zones.value.push({ ...currentZone.value })
    showSuccess('Delivery zone added')
  }

  closeZoneDialog()
}

// Close zone dialog
const closeZoneDialog = () => {
  showZoneDialog.value = false
  editingZoneIndex.value = null
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
  }).format(amount)
}
</script>
