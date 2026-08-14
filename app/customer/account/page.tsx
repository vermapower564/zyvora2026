'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, MapPin, Heart, User, Shield, LogOut, Ticket, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomerAccountPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-zinc-950 min-h-screen text-zinc-100">
      {/* Profile Header */}
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center font-black text-2xl shadow-lg">
            {user?.name?.charAt(0) || 'R'}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{user?.name || 'Roushan Kumar'}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-1">
              <span>{user?.email || 'customer@zyvora.in'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-400" />
                {user?.phone || '+91 9876543210'}
              </span>
            </div>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Verified India Customer
            </span>
          </div>
        </div>

        <Button variant="outline" onClick={logout} className="gap-2 text-rose-400 border-rose-900/50 hover:bg-rose-950/30">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      {/* Welcome Coupon Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Your Welcome Coupon:</span>
              <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-zinc-950 font-black text-xs">WELCOMEZYVORA</span>
            </h3>
            <p className="text-xs text-zinc-400">Get ₹200 OFF on your first purchase over ₹999. Valid for 7 days.</p>
          </div>
        </div>
        <Link href="/products">
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold gap-1 text-xs">
            <span>Shop Now</span>
            <Sparkles className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/customer/orders" className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all group shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Order History (₹)</h3>
          <p className="text-xs text-zinc-400 mt-1">Track active deliveries, view tax invoices, and request returns.</p>
        </Link>

        <Link href="/customer/addresses" className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all group shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">India Address Book</h3>
          <p className="text-xs text-zinc-400 mt-1">Manage delivery locations and PIN codes for fast checkout.</p>
        </Link>

        <Link href="/customer/wishlist" className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all group shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Saved Wishlist</h3>
          <p className="text-xs text-zinc-400 mt-1">View saved items and move them directly to your active cart.</p>
        </Link>
      </div>
    </div>
  );
}
