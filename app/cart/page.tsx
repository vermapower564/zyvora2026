'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useUIStore } from '../../store/ui-store';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    discountPercentage,
    subtotal,
    tax,
    shipping,
    discount,
    total,
  } = useCart();

  const { addToast } = useUIStore();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    const success = applyCoupon(couponCode);
    if (success) {
      addToast(`Promo code ${couponCode.toUpperCase()} applied!`, 'success');
      setCouponCode('');
    } else {
      addToast('Invalid coupon code. Try ZYVORA10 or SUPER20', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white">Your Shopping Cart is Empty</h1>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Explore our wide range of luxury electronics, apparel, and home workspace goods.
        </p>
        <Link href="/products">
          <Button size="lg" className="gap-2">
            Browse Products <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-sm text-zinc-400 mt-1">Review your items before proceeding to checkout.</p>
        </div>
        <Button variant="ghost" onClick={clearCart} className="text-xs text-rose-400 hover:text-rose-300">
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-zinc-900 border border-zinc-800"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                className="w-24 h-24 rounded-2xl object-cover border border-zinc-800 shrink-0"
              />

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-zinc-500 uppercase">{item.product.sellerName}</span>
                <h3 className="font-bold text-base text-white">{item.product.title}</h3>
                <span className="text-sm font-bold text-white block">{formatCurrency(item.product.price)}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-zinc-700 rounded-xl px-3 py-1.5 bg-zinc-950">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold w-6 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Order Summary</h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <Input
                placeholder="Enter ZYVORA10"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="text-xs"
              />
              <Button type="submit" variant="secondary" className="text-xs px-4">
                Apply
              </Button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Tag className="w-4 h-4" /> {appliedCoupon} ({discountPercentage}% Off)
                </span>
                <button onClick={removeCoupon} className="hover:underline font-medium text-rose-400">
                  Remove
                </button>
              </div>
            )}

            <div className="space-y-3 text-sm text-zinc-400 pt-4 border-t border-zinc-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-bold text-white">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-white">
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-bold">-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-white pt-4 border-t border-zinc-800">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full gap-2 text-base">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              256-Bit SSL Encrypted Payment Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
