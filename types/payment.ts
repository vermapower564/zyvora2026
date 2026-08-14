import { PaymentStatus } from '../constants/payment-status';

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: 'STRIPE' | 'PAYPAL' | 'COD';
  transactionId: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minSpend?: number;
  expiryDate: string;
  active: boolean;
  usedCount: number;
}
