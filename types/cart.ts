import { Product } from './product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedAttributes?: Record<string, string>;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
}
