import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const sellers = [
      {
        id: 'sel_tech_1',
        storeName: 'Aura Sound Labs',
        owner: 'Vikramaditya Rao',
        email: 'seller@aurasound.in',
        phone: '+91 9988776655',
        verificationStatus: 'VERIFIED',
        registrationDate: '2025-11-10',
        totalProducts: 14,
        activeProducts: 12,
        lowStockProducts: 1,
        outOfStockProducts: 1,
        totalOrders: 148,
        unitsSold: 210,
        revenue: 479950,
        commissionPaid: 47995,
        pendingPayout: 12500,
        rating: 4.9,
        reviewsCount: 128,
        lastActivity: 'Inventory restocked by 10 units (3 hours ago)',
      },
      {
        id: 'sel_fashion_1',
        storeName: 'Veloce Luxury Wear',
        owner: 'Ananya Roy',
        email: 'store@velocefashion.in',
        phone: '+91 9123456789',
        verificationStatus: 'VERIFIED',
        registrationDate: '2025-12-01',
        totalProducts: 8,
        activeProducts: 8,
        lowStockProducts: 2,
        outOfStockProducts: 0,
        totalOrders: 84,
        unitsSold: 92,
        revenue: 295000,
        commissionPaid: 29500,
        pendingPayout: 8400,
        rating: 4.8,
        reviewsCount: 84,
        lastActivity: 'Shipped order #ZYV-881921 (5 hours ago)',
      },
    ];

    return NextResponse.json({
      success: true,
      data: sellers,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Failed to fetch seller monitoring metrics' },
      },
      { status: 500 }
    );
  }
}
