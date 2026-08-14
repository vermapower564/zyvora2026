import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ActivityService } from '@/services/activity.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    // Mock/DB Customer monitoring dataset
    const customers = [
      {
        id: 'usr_cust_101',
        name: 'Roushan Kumar',
        email: 'roushan@zyvora.in',
        phone: '+91 9876543210',
        registrationDate: '2026-01-15',
        accountStatus: 'ACTIVE',
        totalOrders: 5,
        completedOrders: 4,
        cancelledOrders: 1,
        returnedOrders: 0,
        totalSpending: 12499,
        reviewsCount: 3,
        couponsUsed: ['WELCOMEZYVORA'],
        lastActivity: 'Order placed #ZYV-881920 (2 hours ago)',
      },
      {
        id: 'usr_cust_102',
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 9811223344',
        registrationDate: '2026-02-01',
        accountStatus: 'ACTIVE',
        totalOrders: 2,
        completedOrders: 2,
        cancelledOrders: 0,
        returnedOrders: 0,
        totalSpending: 5490,
        reviewsCount: 1,
        couponsUsed: ['WELCOMEZYVORA'],
        lastActivity: 'Product review submitted (1 day ago)',
      },
    ];

    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
    );

    return NextResponse.json({
      success: true,
      data: filtered,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Failed to fetch customer activity metrics' },
      },
      { status: 500 }
    );
  }
}
