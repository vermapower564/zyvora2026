import { Order } from '../types/order';
import { OrderStatus } from '../constants/order-status';
import { PaymentStatus } from '../constants/payment-status';

export class OrderService {
  private static orders: Order[] = [
    {
      id: 'ord_1001',
      orderNumber: 'ZYV-881920',
      userId: 'usr_demo_customer_1',
      customerName: 'Alex Mercer',
      customerEmail: 'customer@zyvora.com',
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: 'Credit Card (Stripe)',
      items: [
        {
          id: 'item_1',
          productId: 'prod_1',
          product: {
            id: 'prod_1',
            title: 'Zyvora Aura Noise-Cancelling Headphones',
            slug: 'zyvora-aura-headphones',
            description: 'Premium wireless headphones',
            price: 299.99,
            stock: 45,
            category: { id: 'cat_1', name: 'Electronics & Audio', slug: 'electronics' },
            sellerId: 'sel_tech',
            sellerName: 'Aura Sound Labs',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
            attributes: { Color: 'Matte Black' },
            rating: 4.9,
            reviewCount: 128,
            featured: true,
            tags: ['audio'],
            createdAt: '2026-01-01',
            updatedAt: '2026-01-01',
          },
          quantity: 1,
          price: 299.99,
          sellerId: 'sel_tech',
        },
      ],
      shippingAddress: {
        id: 'addr_1',
        userId: 'usr_demo_customer_1',
        fullName: 'Alex Mercer',
        street: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'United States',
        phone: '+1 (555) 234-5678',
        isDefault: true,
      },
      subtotal: 299.99,
      tax: 24.0,
      shippingFee: 0,
      discount: 30.0,
      totalAmount: 293.99,
      trackingNumber: 'TRK-US-9918231',
      createdAt: '2026-02-01T14:20:00Z',
      updatedAt: '2026-02-03T10:00:00Z',
    },
    {
      id: 'ord_1002',
      orderNumber: 'ZYV-881921',
      userId: 'usr_demo_customer_1',
      customerName: 'Alex Mercer',
      customerEmail: 'customer@zyvora.com',
      status: OrderStatus.SHIPPED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: 'PayPal',
      items: [
        {
          id: 'item_2',
          productId: 'prod_2',
          product: {
            id: 'prod_2',
            title: 'Veloce Chronograph Automatic Watch',
            slug: 'veloce-chronograph-watch',
            description: '316L stainless steel watch',
            price: 549.0,
            stock: 12,
            category: { id: 'cat_2', name: 'Luxury Fashion', slug: 'fashion' },
            sellerId: 'sel_fashion',
            sellerName: 'Veloce Luxury Wear',
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
            attributes: { Movement: 'Automatic' },
            rating: 4.8,
            reviewCount: 84,
            featured: true,
            tags: ['watch'],
            createdAt: '2026-01-05',
            updatedAt: '2026-01-05',
          },
          quantity: 1,
          price: 549.0,
          sellerId: 'sel_fashion',
        },
      ],
      shippingAddress: {
        id: 'addr_1',
        userId: 'usr_demo_customer_1',
        fullName: 'Alex Mercer',
        street: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94107',
        country: 'United States',
        phone: '+1 (555) 234-5678',
        isDefault: true,
      },
      subtotal: 549.0,
      tax: 43.92,
      shippingFee: 0,
      discount: 0,
      totalAmount: 592.92,
      trackingNumber: 'TRK-US-449120',
      createdAt: '2026-02-10T09:15:00Z',
      updatedAt: '2026-02-11T16:00:00Z',
    },
  ];

  public static async getOrders(userId?: string): Promise<Order[]> {
    if (userId) {
      return this.orders.filter((o) => o.userId === userId);
    }
    return this.orders;
  }

  public static async getSellerOrders(sellerId: string): Promise<Order[]> {
    return this.orders.filter((o) => o.items.some((item) => item.sellerId === sellerId));
  }

  public static async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  public static async createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      orderNumber: `ZYV-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  public static async updateOrderStatus(id: string, status: OrderStatus, trackingNumber?: string): Promise<boolean> {
    const order = this.orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      if (trackingNumber) order.trackingNumber = trackingNumber;
      order.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }
}
