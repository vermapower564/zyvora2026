'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useUIStore } from '../../store/ui-store';
import { formatCurrency } from '../../lib/utils';
import { Button } from '../ui/button';

export const CartDrawer: React.FC = () => {
  const { items, updateQuantity, removeItem, subtotal, total, itemCount } = useCart();
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeCartDrawer} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900 dark:text-white" />
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Shopping Cart</h2>
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                {itemCount}
              </span>
            </div>
            <button onClick={closeCartDrawer} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Your cart is empty</h3>
                <p className="text-sm text-zinc-500 max-w-xs">Explore our catalog of luxury products and add items to your cart.</p>
                <Button onClick={closeCartDrawer} variant="outline" className="mt-4">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-zinc-500">{item.product.sellerName}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center gap-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2 py-0.5 bg-white dark:bg-zinc-900">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-0.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-0.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Link href="/checkout" onClick={closeCartDrawer} className="block w-full">
                <Button className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
