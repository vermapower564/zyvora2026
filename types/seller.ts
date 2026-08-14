export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  slug: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating: number;
  totalSales: number;
  commissionRate: number; // e.g. 0.10 for 10%
  bankAccount: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  };
  status: 'PENDING' | 'VERIFIED' | 'SUSPENDED';
  createdAt: string;
}

export interface Payout {
  id: string;
  sellerId: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'PROCESSED' | 'REJECTED';
  requestedAt: string;
  processedAt?: string;
  referenceId?: string;
}
