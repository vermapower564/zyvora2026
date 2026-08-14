'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Truck, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { formatCurrency } from '../../lib/utils';
import { RatingStars } from './rating-stars';
import { useCart } from '../../hooks/useCart';
import { useUIStore } from '../../store/ui-store';
import { useAuth } from '../../hooks/useAuth';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { addToast } = useUIStore();
  const { user } = useAuth();

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock <= 0) {
      addToast('This item is currently out of stock.', 'error');
      return;
    }
    addItem(product, 1);
    addToast(`Added "${product.title}" to your cart!`, 'success');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      addToast(`Added "${product.title}" to your wishlist.`, 'success');
    } else {
      addToast(`Removed "${product.title}" from wishlist.`, 'info');
    }
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group relative rounded-3xl bg-zinc-900 border border-zinc-800 p-4 transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-950 mb-4">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
            alt={product.title}
            className={`h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
              isOutOfStock ? 'opacity-50 grayscale' : ''
            }`}
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {discountPercent && (
              <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-full bg-rose-500 text-white shadow-md">
                -{discountPercent}%
              </span>
            )}
            {product.featured && (
              <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-full bg-amber-400 text-zinc-950 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2.5 rounded-full z-10 transition-all duration-200 shadow-lg ${
              isWishlisted
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-zinc-900/80 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-zinc-900'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Stock Badges */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-black text-xs uppercase tracking-widest">
                OUT OF STOCK
              </span>
            </div>
          )}

          {/* Quick Add to Cart Hover Overlay */}
          {!isOutOfStock && (
            <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button
                onClick={handleAddToCart}
                className="p-3 rounded-full bg-amber-400 text-zinc-950 font-bold shadow-xl hover:scale-110 hover:bg-amber-300 transition-transform flex items-center gap-1.5 text-xs"
                title="Add to Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          )}
        </div>

        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-zinc-400 font-medium mb-1">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            {product.category?.name || 'Category'}
          </span>
          <span className="truncate max-w-[120px] text-zinc-500">{product.sellerName || 'ZYVORA Direct'}</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`} className="block mb-2">
          <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2">
          <RatingStars rating={product.rating} count={product.reviewCount} />
        </div>

        {/* Delivery Tag */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-3">
          <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Free Express Delivery (India)</span>
        </div>
      </div>

      {/* Price & Low Stock Footer */}
      <div className="pt-3 border-t border-zinc-800/80 mt-2 space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-white">{formatCurrency(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-zinc-500 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-bold text-amber-400 hover:underline"
          >
            View
          </Link>
        </div>

        {/* Low Stock Warning */}
        {isLowStock && (
          <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Only {product.stock} left in stock - order soon!</span>
          </div>
        )}
      </div>
    </div>
  );
};
