import React from 'react';
import Link from 'next/link';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { InventoryService } from '../../../services/inventory.service';
import { formatCurrency } from '../../../lib/utils';
import { DollarSign, Package, ShoppingBag, AlertTriangle, Plus, ArrowRight } from 'lucide-react';
import { ORDER_STATUS_LABELS } from '../../../constants/order-status';

export default async function SellerDashboardPage() {
  const seller = await SellerService.getSellerById('sel_tech');
  const products = await ProductService.getProducts({ sellerId: 'sel_tech' });
  const orders = await OrderService.getSellerOrders('sel_tech');
  const lowStockAlerts = await InventoryService.getLowStockAlerts(15);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">{seller?.storeName || 'Vendor Dashboard'}</h1>
            <p className="text-xs text-zinc-400 mt-1">Manage listings, track fulfillment, and monitor store earnings.</p>
          </div>

          <Link href="/seller/products/new">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-sm hover:bg-zinc-100 transition-colors shadow-lg">
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-white">{formatCurrency(totalRevenue)}</span>
            <span className="text-[11px] text-emerald-400 font-bold block">+14.2% from last month</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Active Listings</span>
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-2xl font-black text-white">{products.length} Products</span>
            <span className="text-[11px] text-zinc-400 block">Catalog live</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Total Orders</span>
              <ShoppingBag className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-2xl font-black text-white">{orders.length} Orders</span>
            <span className="text-[11px] text-purple-400 font-bold block">Fulfillment 100%</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Low Stock Warnings</span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-2xl font-black text-white">{lowStockAlerts.length} Items</span>
            <span className="text-[11px] text-amber-400 font-bold block">Action required</span>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Recent Customer Orders</h3>
            <Link href="/seller/orders" className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1">
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Order Number</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((o) => {
                  const badge = ORDER_STATUS_LABELS[o.status];
                  return (
                    <tr key={o.id} className="hover:bg-zinc-800/40">
                      <td className="px-4 py-3 font-bold text-white">{o.orderNumber}</td>
                      <td className="px-4 py-3">{o.customerName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-white">{formatCurrency(o.totalAmount)}</td>
                      <td className="px-4 py-3">
                        <Link href="/seller/orders" className="text-xs font-bold text-amber-400 hover:underline">
                          Fulfill
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
