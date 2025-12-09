export interface Product {
  id: string;
  merchant_id: string;
  sku?: string;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  price: number;
  compare_at_price?: number;
  currency?: string;
  stock_quantity: number;
  is_available: boolean;
  category?: string;
  image_url?: string;
  metadata?: any; // JSONB field
  embedding?: number[]; // Vector field
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  sku?: string;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  price: number;
  compare_at_price?: number;
  currency?: string;
  stock_quantity: number;
  is_available?: boolean;
  category?: string;
  image_url?: string;
  metadata?: any;
}