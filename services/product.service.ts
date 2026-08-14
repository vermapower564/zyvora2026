import { prisma } from '../lib/prisma';
import { Product, Category, Review } from '../types/product';

export class ProductService {
  private static categories: Category[] = [
    {
      id: 'cat_1',
      name: 'Electronics & Audio',
      slug: 'electronics',
      description: 'High performance audio gear, smart gadgets, and wearable electronics.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      productCount: 14,
    },
    {
      id: 'cat_2',
      name: 'Luxury Fashion',
      slug: 'fashion',
      description: 'Tailored streetwear, designer timepieces, and Italian leather accessories.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      productCount: 18,
    },
    {
      id: 'cat_3',
      name: 'Home & Workspaces',
      slug: 'home-workspace',
      description: 'Ergonomic furniture, ambient desk lamps, and minimalist home decor.',
      imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
      productCount: 12,
    },
    {
      id: 'cat_4',
      name: 'Smart Appliances',
      slug: 'appliances',
      description: 'Connected kitchenware, automated coffee machines, and living accessories.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800',
      productCount: 9,
    },
  ];

  private static products: Product[] = [
    {
      id: 'prod_1',
      title: 'Zyvora Aura Active Noise-Cancelling Headphones',
      slug: 'zyvora-aura-headphones',
      description: 'Experience ultra-pure sound fidelity with active noise cancellation, custom 40mm titanium drivers, and up to 40 hours of battery life.',
      price: 299.99,
      originalPrice: 349.99,
      stock: 45,
      category: { id: 'cat_1', name: 'Electronics & Audio', slug: 'electronics' },
      sellerId: 'sel_tech',
      sellerName: 'Aura Sound Labs',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
      ],
      attributes: { Color: 'Matte Black', Connectivity: 'Bluetooth 5.3', Battery: '40 Hours', ANC: 'Active Hybrid' },
      rating: 4.9,
      reviewCount: 128,
      featured: true,
      tags: ['audio', 'wireless', 'noise-cancelling', 'headphones'],
      qualityScore: 4.8,
      whyLikeIt: [
        'Hybrid Active Noise Cancellation blocks 98% ambient noise',
        'Custom 40mm titanium drivers deliver studio-grade acoustics',
        'Ultra-soft memory foam earcups for all-day listening comfort',
        'Up to 40 hours continuous playtime on a single charge',
      ],
      bestFor: ['Flights & Travel', 'Office & Focus', 'Daily Commute', 'Studio Audio'],
      imageAngles: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
      ],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    },
    {
      id: 'prod_2',
      title: 'Veloce Chronograph Automatic Watch',
      slug: 'veloce-chronograph-watch',
      description: 'Crafted with surgical-grade 316L stainless steel, sapphire crystal glass, and Japanese automatic mechanical movement.',
      price: 549.0,
      originalPrice: 650.0,
      stock: 12,
      category: { id: 'cat_2', name: 'Luxury Fashion', slug: 'fashion' },
      sellerId: 'sel_fashion',
      sellerName: 'Veloce Luxury Wear',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      ],
      attributes: { Movement: 'Automatic', 'Water Resistance': '100m', Strap: 'Genuine Leather' },
      rating: 4.8,
      reviewCount: 84,
      featured: true,
      tags: ['watch', 'luxury', 'fashion', 'accessories'],
      createdAt: '2026-01-05',
      updatedAt: '2026-01-05',
    },
    {
      id: 'prod_3',
      title: 'ErgoCraft Minimalist Desk Lamp',
      slug: 'ergocraft-minimalist-desk-lamp',
      description: 'Anodized aluminum LED desk lamp featuring adjustable color temperature, touch dimmer, and built-in 15W wireless phone charging pad.',
      price: 119.5,
      originalPrice: 149.0,
      stock: 28,
      category: { id: 'cat_3', name: 'Home & Workspaces', slug: 'home-workspace' },
      sellerId: 'sel_tech',
      sellerName: 'Aura Sound Labs',
      images: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
      ],
      attributes: { Color: 'Space Gray', Output: '15W Wireless', Material: 'Aluminum' },
      rating: 4.7,
      reviewCount: 42,
      featured: true,
      tags: ['desk', 'lamp', 'workspace', 'home'],
      createdAt: '2026-01-10',
      updatedAt: '2026-01-10',
    },
    {
      id: 'prod_4',
      title: 'Monolith Italian Leather Travel Duffle',
      slug: 'monolith-italian-leather-duffle',
      description: 'Handmade full-grain Tuscan leather duffle bag with brass hardware and dedicated padded laptop sleeve.',
      price: 389.0,
      originalPrice: 420.0,
      stock: 8,
      category: { id: 'cat_2', name: 'Luxury Fashion', slug: 'fashion' },
      sellerId: 'sel_fashion',
      sellerName: 'Veloce Luxury Wear',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
      ],
      attributes: { Material: 'Tuscan Leather', Capacity: '45L', Color: 'Cognac Brown' },
      rating: 4.95,
      reviewCount: 56,
      featured: false,
      tags: ['bag', 'travel', 'leather', 'fashion'],
      createdAt: '2026-01-12',
      updatedAt: '2026-01-12',
    },
    {
      id: 'prod_5',
      title: 'Zyvora Titanium Pro Gaming Laptop 16"',
      slug: 'zyvora-titanium-pro-laptop',
      description: 'Powered by Intel Core i9 14th Gen processor, NVIDIA RTX 4080 GPU, 32GB DDR5 RAM, and 1TB NVMe Gen4 SSD with 240Hz QHD+ Mini-LED display.',
      price: 2199.0,
      originalPrice: 2499.0,
      stock: 15,
      category: { id: 'cat_1', name: 'Electronics & Audio', slug: 'electronics' },
      sellerId: 'sel_tech',
      sellerName: 'Aura Sound Labs',
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      ],
      attributes: { CPU: 'Core i9 14th Gen', GPU: 'RTX 4080 12GB', RAM: '32GB DDR5', Storage: '1TB NVMe SSD' },
      rating: 4.92,
      reviewCount: 94,
      featured: true,
      tags: ['laptop', 'gaming', 'electronics', 'pro'],
      qualityScore: 4.9,
      whyLikeIt: [
        'Mini-LED 240Hz display with 100% DCI-P3 color accuracy',
        'Dual vapor chamber cooling system for peak sustained thermal performance',
        'CNC machined aerospace-grade titanium alloy chassis',
        'Thunderbolt 4 & Per-Key RGB mechanical keyboard',
      ],
      bestFor: ['Heavy Gaming', '3D Rendering', 'Software Engineering', '4K Video Editing'],
      imageAngles: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      ],
      createdAt: '2026-01-15',
      updatedAt: '2026-01-15',
    },
    {
      id: 'prod_6',
      title: 'Aura Ultra 5G Smartphone 256GB',
      slug: 'aura-ultra-5g-smartphone',
      description: 'Features 200MP Quad Camera with 100x Space Zoom, Snapdragon 8 Gen 3 Processor, 5000mAh Battery with 65W Fast Charging, and Curved AMOLED 120Hz display.',
      price: 999.0,
      originalPrice: 1199.0,
      stock: 35,
      category: { id: 'cat_1', name: 'Electronics & Audio', slug: 'electronics' },
      sellerId: 'sel_tech',
      sellerName: 'Aura Sound Labs',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800',
      ],
      attributes: { Screen: '6.8" 120Hz AMOLED', Camera: '200MP + 50MP + 12MP', Battery: '5000mAh', OS: 'ZyvoraOS 4.0' },
      rating: 4.88,
      reviewCount: 162,
      featured: true,
      tags: ['mobile', '5g', 'smartphone', 'electronics'],
      qualityScore: 4.85,
      whyLikeIt: [
        '200MP primary sensor captures breathtaking night photography',
        'Snapdragon 8 Gen 3 delivers instant app multitasking',
        'IP68 water & dust resistance rating',
        '65W SuperVOOC fast charging gets 80% in 20 minutes',
      ],
      bestFor: ['Mobile Photography', 'Vlogging', 'All-Day Travel', '5G Streaming'],
      imageAngles: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800',
      ],
      createdAt: '2026-01-18',
      updatedAt: '2026-01-18',
    },
    {
      id: 'prod_7',
      title: 'Veloce Speedcat OG Italian Leather Sneakers',
      slug: 'veloce-speedcat-og-sneakers',
      description: 'Iconic motorsport-inspired lifestyle sneakers crafted with ultra-soft suede, padded ankle collar, and oil-resistant rubber tread sole.',
      price: 149.0,
      originalPrice: 180.0,
      stock: 22,
      category: { id: 'cat_2', name: 'Luxury Fashion', slug: 'fashion' },
      sellerId: 'sel_fashion',
      sellerName: 'Veloce Luxury Wear',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
      ],
      attributes: { Color: 'Speed Red / Off-White', Material: 'Italian Suede', Gender: 'Unisex', Size: 'UK 8 - 11' },
      rating: 4.75,
      reviewCount: 78,
      featured: true,
      tags: ['shoes', 'sneakers', 'fashion', 'streetwear'],
      qualityScore: 4.7,
      whyLikeIt: [
        'Motorsport low-profile silhouette for precision driving feel',
        'Premium full-grain Italian suede upper',
        'Cushioned OrthoLite insoles for everyday city walks',
      ],
      bestFor: ['Casual Outings', 'Driving Enthusiasts', 'Streetwear Style'],
      imageAngles: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
      ],
      createdAt: '2026-01-20',
      updatedAt: '2026-01-20',
    },
    {
      id: 'prod_8',
      title: 'Zyvora Pulse Smart Watch Series 8',
      slug: 'zyvora-pulse-smart-watch-series-8',
      description: 'Titanium case smartwatch featuring ECG monitoring, dual-frequency GPS, AMOLED sapphire display, and 14 days extended battery life.',
      price: 279.0,
      originalPrice: 329.0,
      stock: 30,
      category: { id: 'cat_1', name: 'Electronics & Audio', slug: 'electronics' },
      sellerId: 'sel_tech',
      sellerName: 'Aura Sound Labs',
      images: [
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
      ],
      attributes: { Case: '49mm Titanium', 'Water Resistance': '100m Dive Rated', Display: '2000 Nits Sapphire' },
      rating: 4.86,
      reviewCount: 110,
      featured: true,
      tags: ['smartwatch', 'fitness', 'electronics', 'wearable'],
      qualityScore: 4.8,
      whyLikeIt: [
        'Dual-band precision L1/L5 GPS for accurate trail tracking',
        'Always-On AMOLED display visible under direct intense sunlight',
        'Advanced health metrics: ECG, SpO2, Temperature & Sleep tracking',
      ],
      bestFor: ['Marathon Running', 'Outdoor Fitness', 'Health Monitoring'],
      imageAngles: [
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
      ],
      createdAt: '2026-01-22',
      updatedAt: '2026-01-22',
    },
  ];

  public static async getProducts(params?: {
    categorySlug?: string;
    searchQuery?: string;
    featuredOnly?: boolean;
    sellerId?: string;
  }): Promise<Product[]> {
    try {
      if (prisma && typeof prisma.product?.findMany === 'function') {
        const where: any = {};
        if (params?.featuredOnly) where.featured = true;
        if (params?.sellerId) where.sellerId = params.sellerId;
        if (params?.categorySlug) where.category = { slug: params.categorySlug };
        if (params?.searchQuery) {
          where.OR = [
            { title: { contains: params.searchQuery } },
            { description: { contains: params.searchQuery } },
          ];
        }
        const dbProducts = await prisma.product.findMany({
          where,
          include: { category: true, seller: true },
        });
        if (dbProducts && dbProducts.length > 0) {
          return dbProducts.map((p: any) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            description: p.description,
            price: p.price,
            originalPrice: p.originalPrice || undefined,
            stock: p.stock,
            category: { id: p.category.id, name: p.category.name, slug: p.category.slug },
            sellerId: p.sellerId,
            sellerName: p.seller.storeName,
            images: Array.isArray(p.images) ? (p.images as string[]) : [p.images as string],
            attributes: (p.attributes as Record<string, string>) || {},
            rating: p.rating,
            reviewCount: p.reviewCount,
            featured: p.featured,
            tags: (p.tags as string[]) || [],
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
          }));
        }
      }
    } catch {
      // Use fallback memory store
    }

    let result = [...this.products];
    if (params?.featuredOnly) result = result.filter((p) => p.featured);
    if (params?.categorySlug) result = result.filter((p) => p.category.slug === params.categorySlug);
    if (params?.sellerId) result = result.filter((p) => p.sellerId === params.sellerId);
    if (params?.searchQuery) {
      const q = params.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  public static async getProductBySlug(slug: string): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug || p.id === slug);
  }

  public static async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  public static async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `prod_${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  public static async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index > -1) {
      this.products[index] = {
        ...this.products[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return this.products[index];
    }
    return null;
  }

  public static async deleteProduct(id: string): Promise<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    return true;
  }
}
