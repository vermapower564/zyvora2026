import { NextResponse } from 'next/server';
import { PaymentService } from '../../../services/payment.service';

export async function POST(request: Request) {
  try {
    const { orderId, amount, provider } = await request.json();

    const result = await PaymentService.processPayment(orderId, amount, provider || 'STRIPE');

    return NextResponse.json({
      success: result.success,
      transactionId: result.transactionId,
      status: result.status,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Payment processing error' }, { status: 500 });
  }
}
