import { NextResponse } from 'next/server';
import { OrderService } from '../../../services/order.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || undefined;
    const sellerId = searchParams.get('sellerId') || undefined;

    let orders;
    if (sellerId) {
      orders = await OrderService.getSellerOrders(sellerId);
    } else {
      orders = await OrderService.getOrders(userId);
    }

    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = await OrderService.createOrder(body);
    return NextResponse.json({ success: true, message: 'Order created', data: newOrder });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
