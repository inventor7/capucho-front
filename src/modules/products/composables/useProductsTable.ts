export const useProductsTable = () => {
  const selectedProducts = ref<Product[]>([])
  const deleteDialogOpen = ref(false)
  const productToDelete = ref<number | null>(null)
  const isLoading = ref(false)

  const handleBulkEdit = () => {
    console.log(
      'Bulk editing products:',
      selectedProducts.value.map((p) => p.id),
    )
    // TODO: Implement bulk edit logic
    // You can open a modal or navigate to bulk edit page
  }

  const handleBulkDelete = () => {
    productToDelete.value = null
    deleteDialogOpen.value = true
  }

  const handleSingleDelete = (productId: number) => {
    productToDelete.value = productId
    deleteDialogOpen.value = true
  }

  const confirmDelete = async (clearSelection?: () => void) => {
    isLoading.value = true

    try {
      if (productToDelete.value) {
        // Single delete
        console.log('Deleting product:', productToDelete.value)
        // TODO: await deleteProduct(productToDelete.value)
      } else {
        // Bulk delete
        const ids = selectedProducts.value.map((p) => p.id)
        console.log('Deleting products:', ids)
        // TODO: await deleteProducts(ids)
      }

      // Success notification
      // useToast().toast({
      //   title: 'Success',
      //   description: `Successfully deleted ${productToDelete.value ? '1 product' : `${selectedProducts.value.length} products`}`,
      // })

      // Clear selection
      if (clearSelection) {
        clearSelection()
      }
      selectedProducts.value = []
    } catch (error) {
      console.error('Delete error:', error)
      // Error notification
      // useToast().toast({
      //   title: 'Error',
      //   description: 'Failed to delete products',
      //   variant: 'destructive',
      // })
    } finally {
      isLoading.value = false
      deleteDialogOpen.value = false
      productToDelete.value = null
    }
  }

  const cancelDelete = () => {
    deleteDialogOpen.value = false
    productToDelete.value = null
  }

  return {
    // State
    selectedProducts,
    deleteDialogOpen,
    productToDelete,
    isLoading,

    // Actions
    handleBulkEdit,
    handleBulkDelete,
    handleSingleDelete,
    confirmDelete,
    cancelDelete,
  }
}
