import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-black text-xl">
                Z
              </div>
              <span className="text-2xl font-black tracking-tight text-white">ZYVORA</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Zyvora is the premier multi-vendor luxury commerce ecosystem and enterprise workspace management solution. Built with Next.js, Prisma, and Tailwind CSS.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search & Filter</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/customer/account" className="hover:text-white transition-colors">Customer Account</Link></li>
              <li><Link href="/seller/dashboard" className="hover:text-white transition-colors">Seller Portal</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition-colors">Admin Portal</Link></li>
              <li><Link href="/seller/register" className="hover:text-white transition-colors">Become a Vendor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Enterprise</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-zinc-500">Prisma MySQL Engine</span></li>
              <li><span className="text-zinc-500">Zod Validation</span></li>
              <li><span className="text-zinc-500">Stripe & PayPal Mock</span></li>
              <li><span className="text-zinc-500">Vercel Edge Ready</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Zyvora Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
