import { OrderStatus } from '../constants/order-status';
import { Address } from './user';
import { Product } from './product';

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  sellerId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  paymentStatus: string;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}
