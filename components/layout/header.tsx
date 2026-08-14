'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, Shield, Store, LayoutDashboard, ArrowLeft, ArrowRight } from 'lucide-react';
import { ZyvoraLogo } from '../branding/zyvora-logo';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useUIStore } from '../../store/ui-store';
import { UserRole } from '../../constants/roles';

export const Header: React.FC = () => {
  const { user, isAuthenticated, isSeller, isAdmin, switchRole } = useAuth();
  const { itemCount } = useCart();
  const { toggleCartDrawer, isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Back & Forward Controls + Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => window.history.back()}
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.history.forward()}
                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                title="Go Forward"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <ZyvoraLogo theme="dark" variant="full" />
          </div>


          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search products, brands, luxury items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full text-sm bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <Link href="/products" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/categories" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Categories
            </Link>
            <Link href="/seller/dashboard" className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Store className="w-4 h-4" />
              Seller Portal
            </Link>
            <Link href="/admin/dashboard" className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Shield className="w-4 h-4 text-amber-500" />
              Admin
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Pill */}
            <div className="hidden xl:flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300">
              <button
                onClick={() => switchRole(UserRole.CUSTOMER)}
                className={`px-3 py-1 rounded-full transition-all ${user?.role === UserRole.CUSTOMER ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : ''}`}
              >
                Customer
              </button>
              <button
                onClick={() => switchRole(UserRole.SELLER)}
                className={`px-3 py-1 rounded-full transition-all ${user?.role === UserRole.SELLER ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : ''}`}
              >
                Seller
              </button>
              <button
                onClick={() => switchRole(UserRole.ADMIN)}
                className={`px-3 py-1 rounded-full transition-all ${user?.role === UserRole.ADMIN ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : ''}`}
              >
                Admin
              </button>
            </div>

            {/* Account Icon */}
            {isAuthenticated ? (
              <Link
                href={isAdmin ? '/admin/dashboard' : isSeller ? '/seller/dashboard' : '/customer/account'}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
                  {user?.name.charAt(0)}
                </div>
              </Link>
            ) : (
              <Link
                href="/customer/login"
                className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={toggleCartDrawer}
              className="relative p-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center border-2 border-white dark:border-zinc-950">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
