import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { productsService } from '../services/products.service';
import { type Product, type ProductCreate } from '../types/product.types';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const availableProducts = computed(() => 
    products.value.filter((p) => p.is_available)
  );

  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      products.value = await productsService.getAll();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch products';
    } finally {
      loading.value = false;
    }
  }

  async function createProduct(data: ProductCreate) {
    loading.value = true;
    try {
      const newProduct = await productsService.create(data);
      products.value.push(newProduct);
      return newProduct;
    } catch (err: any) {
      error.value = err.message || 'Failed to create product';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(id: string, data: Partial<Product>) {
    loading.value = true;
    try {
      const updated = await productsService.update(id, data);
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) products.value[index] = updated;
      return updated;
    } catch (err: any) {
      error.value = err.message || 'Failed to update product';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteProduct(id: string) {
    loading.value = true;
    try {
      await productsService.delete(id);
      products.value = products.value.filter((p) => p.id !== id);
    } catch (err: any) {
      error.value = err.message || 'Failed to delete product';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function importProducts(file: File) {
    loading.value = true;
    try {
      const result = await productsService.importCSV(file);
      // In a real app, we might want to add imported products to the store
      // For now, just return the result
      return result;
    } catch (err: any) {
      error.value = err.message || 'Failed to import products';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    availableProducts,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    importProducts,
  };
});