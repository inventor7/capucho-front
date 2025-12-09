<template>
  <div class="space-y-4">
    <ProductsTableBulkEdit
      :selected-products
      @click:bulk-delete="handleBulkDelete"
      @click:bulk-edit="handleBulkEdit"
      @click:bulk-export="handleBulkExport"
      @click:clear-selection="clearSelection"
    />
    <DataTable
      ref="dataTableRef"
      :columns="columns"
      :data="products"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    />

    <ProductsTableDeleteDialog
      v-model:delete-dialog-open="deleteDialogOpen"
      :is-deleting
      :product-to-delete
      :selected-products
      @click:handle-delete-confirm="handleDeleteConfirm"
    />

    <ProductsTableBulkEditDialog
      v-model:bulkEditData="bulkEditData"
      v-model:bulkEditDialogOpen="bulkEditDialogOpen"
      :selected-products
      @click:bulk-edit-confirm="handleBulkEditConfirm"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const dataTableRef = ref()
const selectedProducts = ref<Product[]>([])
const deleteDialogOpen = ref(false)
const bulkEditDialogOpen = ref(false)
const productToDelete = ref<number | null>(null)
const isDeleting = ref(false)

const bulkEditData = ref<BulkEditData>({
  category: '',
  status: '',
  featured: '',
})

const handleSelectionChange = (selection: Product[]) => {
  selectedProducts.value = selection
}

const handleRowClick = (product: Product) => {
  router.push(`/products/${product.id}`)
}

const handleBulkEdit = () => {
  bulkEditDialogOpen.value = true
  bulkEditData.value = {
    category: '',
    status: '',
    featured: '',
  }
}

const handleBulkEditConfirm = () => {
  console.log('Bulk editing products:', {
    ids: selectedProducts.value.map((p) => p.id),
    changes: bulkEditData.value,
  })
  bulkEditDialogOpen.value = false
  clearSelection()
}

const handleBulkExport = () => {
  console.log(
    'Exporting products:',
    selectedProducts.value.map((p) => p.id),
  )
  const csv = selectedProducts.value
    .map((p) => `${p.id},${p.name},${p.category},${p.price},${p.stock},${p.status}`)
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'products.csv'
  a.click()
}

const handleBulkDelete = () => {
  productToDelete.value = null
  deleteDialogOpen.value = true
}

const handleDeleteConfirm = async () => {
  isDeleting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (productToDelete.value) {
      console.log('Deleting product:', productToDelete.value)
    } else {
      const ids = selectedProducts.value.map((p) => p.id)
      console.log('Deleting products:', ids)
    }

    clearSelection()
  } catch (error) {
    console.error('Delete error:', error)
  } finally {
    isDeleting.value = false
    deleteDialogOpen.value = false
    productToDelete.value = null
  }
}

const clearSelection = () => {
  if (dataTableRef.value) {
    dataTableRef.value.clearSelection()
  }
  selectedProducts.value = []
}

defineExpose({
  triggerDelete: (productId: number) => {
    productToDelete.value = productId
    deleteDialogOpen.value = true
  },
  clearSelection,
})
</script>
