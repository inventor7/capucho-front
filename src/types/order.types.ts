export interface Order {
  id: string;
  order_number: string;
  merchant_id: string;
  customer_id?: string;
  conversation_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_wilaya: string;
  customer_address: string;
  items: OrderItem[];
  subtotal: number;
  delivery_price: number;
  total: number;
  status: string; // pending, confirmed, shipped, delivered, cancelled
  payment_status: string; // unpaid, paid
  payment_method?: string; // cash_on_delivery, cib, baridimob
  tracking_number?: string;
  notes?: string;
  confirmed_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}