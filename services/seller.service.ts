import { SellerProfile, Payout } from '../types/seller';

export class SellerService {
  private static sellers: SellerProfile[] = [
    {
      id: 'sel_tech',
      userId: 'usr_seller_1',
      storeName: 'Aura Sound Labs',
      slug: 'aura-sound-labs',
      description: 'Official flagship store for premium wireless sound equipment and noise cancelling gear.',
      logoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
      bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200',
      rating: 4.9,
      totalSales: 1420,
      commissionRate: 0.1,
      bankAccount: {
        accountHolder: 'Aura Sound LLC',
        bankName: 'Silicon Valley Bank',
        accountNumber: '**** **** 8821',
        routingNumber: '121000358',
      },
      status: 'VERIFIED',
      createdAt: '2025-10-12',
    },
    {
      id: 'sel_fashion',
      userId: 'usr_seller_2',
      storeName: 'Veloce Luxury Wear',
      slug: 'veloce-wear',
      description: 'Handcrafted Italian leather accessories and tailored minimalist urban apparel.',
      logoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      rating: 4.8,
      totalSales: 980,
      commissionRate: 0.12,
      bankAccount: {
        accountHolder: 'Veloce Apparel Inc',
        bankName: 'Chase Manhattan',
        accountNumber: '**** **** 4492',
        routingNumber: '021000021',
      },
      status: 'VERIFIED',
      createdAt: '2025-11-01',
    },
  ];

  private static payouts: Payout[] = [
    {
      id: 'pay_101',
      sellerId: 'sel_tech',
      amount: 4250.0,
      status: 'PROCESSED',
      requestedAt: '2026-01-15T10:00:00Z',
      processedAt: '2026-01-16T14:30:00Z',
      referenceId: 'ACH_9918231',
    },
    {
      id: 'pay_102',
      sellerId: 'sel_tech',
      amount: 1850.5,
      status: 'PENDING',
      requestedAt: '2026-02-10T11:20:00Z',
    },
  ];

  public static async getSellers(): Promise<SellerProfile[]> {
    return this.sellers;
  }

  public static async getSellerById(id: string): Promise<SellerProfile | undefined> {
    return this.sellers.find((s) => s.id === id || s.userId === id);
  }

  public static async getPayouts(sellerId: string): Promise<Payout[]> {
    return this.payouts.filter((p) => p.sellerId === sellerId);
  }

  public static async requestPayout(sellerId: string, amount: number): Promise<Payout> {
    const newPayout: Payout = {
      id: `pay_${Date.now()}`,
      sellerId,
      amount,
      status: 'PENDING',
      requestedAt: new Date().toISOString(),
    };
    this.payouts.unshift(newPayout);
    return newPayout;
  }

  public static async approvePayout(payoutId: string): Promise<boolean> {
    const payout = this.payouts.find((p) => p.id === payoutId);
    if (payout) {
      payout.status = 'PROCESSED';
      payout.processedAt = new Date().toISOString();
      payout.referenceId = `ACH_${Math.floor(1000000 + Math.random() * 9000000)}`;
      return true;
    }
    return false;
  }
}
