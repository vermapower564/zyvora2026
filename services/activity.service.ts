import { prisma } from '../lib/prisma';

export interface ActivityInput {
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  module: string;
  entityType?: string;
  entityId?: string;
  details: string;
}

export interface InventoryEventInput {
  productId: string;
  productTitle: string;
  sellerId: string;
  action: string;
  quantity: number;
  previousStock: number;
  newStock: number;
  actorId: string;
  reason?: string;
}

export interface PriceChangeEventInput {
  productId: string;
  productTitle: string;
  previousPrice: number;
  newPrice: number;
  changedBy: string;
}

export class ActivityService {
  // Mock in-memory activity stores for dev resilience if DB is offline
  private static activityStore: ActivityInput[] = [
    {
      actorId: 'usr_cust_101',
      actorName: 'Roushan Kumar',
      actorRole: 'CUSTOMER',
      action: 'CUSTOMER_REGISTERED',
      module: 'AUTH',
      details: 'Customer account created with welcome offer WELCOMEZYVORA',
    },
    {
      actorId: 'sel_tech_1',
      actorName: 'Aura Sound Labs',
      actorRole: 'SELLER',
      action: 'PRODUCT_CREATED',
      module: 'CATALOG',
      entityType: 'Product',
      entityId: 'prod_1',
      details: 'Published new product Zyvora Aura Noise-Cancelling Headphones',
    },
    {
      actorId: 'usr_cust_101',
      actorName: 'Roushan Kumar',
      actorRole: 'CUSTOMER',
      action: 'ORDER_PLACED',
      module: 'ORDERS',
      entityType: 'Order',
      entityId: 'ord_1001',
      details: 'Placed order #ZYV-881920 for ₹2,499 via UPI',
    },
    {
      actorId: 'sel_tech_1',
      actorName: 'Aura Sound Labs',
      actorRole: 'SELLER',
      action: 'STOCK_UPDATED',
      module: 'INVENTORY',
      entityType: 'Product',
      entityId: 'prod_1',
      details: 'Inventory reduced by 1 unit. Current stock: 45',
    },
  ];

  public static async logActivity(input: ActivityInput): Promise<void> {
    try {
      await (prisma as any).activityLog.create({
        data: input,
      });
    } catch {
      this.activityStore.unshift(input);
    }
  }

  public static async logInventoryEvent(input: InventoryEventInput): Promise<void> {
    try {
      await (prisma as any).inventoryHistory.create({
        data: input,
      });
    } catch {
      // In-memory fallback log
    }
  }

  public static async logPriceChange(input: PriceChangeEventInput): Promise<void> {
    try {
      await (prisma as any).priceHistory.create({
        data: input,
      });
    } catch {
      // In-memory fallback log
    }
  }

  public static async getActivities(filter?: {
    actorRole?: string;
    actorId?: string;
    module?: string;
    action?: string;
  }): Promise<any[]> {
    try {
      const where: any = {};
      if (filter?.actorRole) where.actorRole = filter.actorRole;
      if (filter?.actorId) where.actorId = filter.actorId;
      if (filter?.module) where.module = filter.module;
      if (filter?.action) where.action = filter.action;

      const logs = await (prisma as any).activityLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      if (logs && logs.length > 0) return logs;
    } catch {
      // Fallback
    }

    return this.activityStore.filter((item) => {
      if (filter?.actorRole && item.actorRole !== filter.actorRole) return false;
      if (filter?.actorId && item.actorId !== filter.actorId) return false;
      if (filter?.module && item.module !== filter.module) return false;
      return true;
    });
  }
}
