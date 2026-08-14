import { PaymentStatus } from '../constants/payment-status';
import { Payment } from '../types/payment';

export class PaymentService {
  public static async processPayment(
    orderId: string,
    amount: number,
    provider: 'STRIPE' | 'PAYPAL' | 'COD'
  ): Promise<{ success: boolean; transactionId: string; status: PaymentStatus }> {
    // Simulate payment gateway latency and verification
    await new Promise((resolve) => setTimeout(resolve, 800));

    const transactionId = `txn_${provider.toLowerCase()}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    return {
      success: true,
      transactionId,
      status: PaymentStatus.PAID,
    };
  }
}
