export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: Category;
  sellerId: string;
  sellerName: string;
  images: string[];
  attributes: Record<string, string>;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
