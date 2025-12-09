<template>
  <Dialog v-model:open="bulkEditDialogOpen">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Bulk Edit Products</DialogTitle>
        <DialogDescription>
          Update {{ selectedProducts.length }} selected products
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-4 py-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Category</label>
          <Select v-model="bulkEditData.category">
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
          <label class="text-sm font-medium">Status</label>
          <Select v-model="bulkEditData.status">
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
        <div class="space-y-2">
          <label class="text-sm font-medium">Featured</label>
          <Select v-model="bulkEditData.featured">
            <SelectTrigger>
              <SelectValue placeholder="Select featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="bulkEditDialogOpen = false"> Cancel </Button>
        <Button @click="emit('click:bulk-edit-confirm')">
          <ILucideSave class="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['click:bulk-edit-confirm'])

const { selectedProducts } = defineProps<{
  selectedProducts: Product[]
}>()

const bulkEditDialogOpen = defineModel<boolean>('bulk-edit-dialog-open')
const bulkEditData = defineModel<BulkEditData>('bulk-edit-data', {
  default: {
    category: '',
    status: '',
    featured: '',
  },
})
</script>
