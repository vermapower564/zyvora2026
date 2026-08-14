import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
  items: CartItem[];
  appliedCoupon: string | null;
  discountPercentage: number;
  
  addItem: (product: Product, quantity?: number, selectedAttributes?: Record<string, string>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: 'cart_item_1',
          product: {
            id: 'prod_1',
            title: 'Zyvora Aura Noise-Cancelling Headphones',
            slug: 'zyvora-aura-headphones',
            description: 'Premium wireless headphones with spatial audio and active noise cancellation.',
            price: 299.99,
            originalPrice: 349.99,
            stock: 45,
            category: { id: 'cat_electronics', name: 'Electronics', slug: 'electronics' },
            sellerId: 'sel_tech',
            sellerName: 'Aura Sound Labs',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
            attributes: { Color: 'Matte Black' },
            rating: 4.9,
            reviewCount: 128,
            featured: true,
            tags: ['audio', 'wireless', 'premium'],
            createdAt: '2026-01-01',
            updatedAt: '2026-01-01',
          },
          quantity: 1,
        },
      ],
      appliedCoupon: null,
      discountPercentage: 0,

      addItem: (product, quantity = 1, selectedAttributes) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.product.id === product.id && JSON.stringify(i.selectedAttributes) === JSON.stringify(selectedAttributes)
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems };
          }

          return {
            items: [
              ...state.items,
              {
                id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                product,
                quantity,
                selectedAttributes,
              },
            ],
          };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== itemId)
              : state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [], appliedCoupon: null, discountPercentage: 0 }),

      applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'ZYVORA10' || cleanCode === 'WELCOME10') {
          set({ appliedCoupon: cleanCode, discountPercentage: 10 });
          return true;
        } else if (cleanCode === 'SUPER20') {
          set({ appliedCoupon: cleanCode, discountPercentage: 20 });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ appliedCoupon: null, discountPercentage: 0 }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getTax: () => {
        return get().getSubtotal() * 0.08; // 8% tax rate
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 150 || subtotal === 0 ? 0 : 15.0; // Free shipping over $150
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercentage) / 100;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const shipping = get().getShipping();
        const discount = get().getDiscount();
        return Math.max(0, subtotal + tax + shipping - discount);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'zyvora-cart-storage',
    }
  )
);
