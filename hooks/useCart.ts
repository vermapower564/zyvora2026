import { useCartStore } from '../store/cart-store';
import { CartItem } from '../types/cart';

export function useCart() {
  const store = useCartStore();

  return {
    items: store.items as CartItem[],
    appliedCoupon: store.appliedCoupon,
    discountPercentage: store.discountPercentage,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    applyCoupon: store.applyCoupon,
    removeCoupon: store.removeCoupon,
    subtotal: store.getSubtotal(),
    tax: store.getTax(),
    shipping: store.getShipping(),
    discount: store.getDiscount(),
    total: store.getTotal(),
    itemCount: store.getItemCount(),
  };
}
