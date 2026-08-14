'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  RotateCcw,
  DollarSign,
  CreditCard,
  Settings,
  Users,
  Store,
  Layers,
  Percent,
  Star,
  Boxes,
  FileText,
  Briefcase,
  Calendar,
  Clock,
  UserCheck,
  Building2,
  FileSpreadsheet,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface SidebarProps {
  type: 'seller' | 'admin' | 'hr';
}

export const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const pathname = usePathname();

  const sellerItems: NavItem[] = [
    { label: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/seller/products', icon: Package },
    { label: 'Inventory', href: '/seller/inventory', icon: Boxes },
    { label: 'Orders', href: '/seller/orders', icon: ShoppingBag },
    { label: 'Returns', href: '/seller/returns', icon: RotateCcw },
    { label: 'Earnings', href: '/seller/earnings', icon: DollarSign },
    { label: 'Payouts', href: '/seller/payouts', icon: CreditCard },
    { label: 'Store Settings', href: '/seller/settings', icon: Settings },
  ];

  const adminItems: NavItem[] = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Customers', href: '/admin/users', icon: Users },
    { label: 'Sellers', href: '/admin/sellers', icon: Store },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: Layers },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Commissions', href: '/admin/commissions', icon: DollarSign },
    { label: 'Payout Approvals', href: '/admin/payouts', icon: CreditCard },
    { label: 'Returns', href: '/admin/returns', icon: RotateCcw },
    { label: 'Coupons', href: '/admin/coupons', icon: Percent },
    { label: 'Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
    { label: 'Reports', href: '/admin/reports', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const items = type === 'seller' ? sellerItems : adminItems;

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 min-h-[calc(100vh-5rem)] p-4">
      <div className="mb-6 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/80">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {type === 'seller' ? 'Seller Workspace' : 'Super Admin System'}
        </span>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
