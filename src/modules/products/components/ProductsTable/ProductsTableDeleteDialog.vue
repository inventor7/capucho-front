<template>
  <!-- Delete Confirmation Dialog -->
  <Dialog v-model:open="deleteDialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <div class="flex items-center gap-2">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10">
              <ILucideAlertTriangle class="h-5 w-5 text-destructive" />
            </div>
            <span>Confirm Deletion</span>
          </div>
        </DialogTitle>
        <DialogDescription class="pt-4">
          <p class="mb-2">This action cannot be undone. This will permanently delete:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li v-if="productToDelete">
              <span class="font-medium">1 product</span> from the database
            </li>
            <li v-else>
              <span class="font-medium">{{ selectedProducts.length }} products</span> from the
              database
            </li>
          </ul>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="deleteDialogOpen = false" :disabled="isDeleting">
          Cancel
        </Button>
        <Button
          variant="destructive"
          @click="emit('click:handleDeleteConfirm')"
          :disabled="isDeleting"
        >
          <ILucideLoaderPinwheel v-if="isDeleting" class="mr-2 h-4 w-4 animate-spin" />
          <ILucideTrash2 v-else class="mr-2 h-4 w-4" />
          {{ isDeleting ? 'Deleting...' : 'Delete' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['click:handleDeleteConfirm'])

const { selectedProducts, productToDelete, isDeleting } = defineProps<{
  selectedProducts: Product[]
  productToDelete: number | null
  isDeleting: boolean
}>()

const deleteDialogOpen = defineModel<boolean>('delete-dialog-open')
</script>
