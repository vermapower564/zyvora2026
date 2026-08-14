import React from 'react';
import Link from 'next/link';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { HRMSService } from '../../../services/hrms.service';
import { formatCurrency } from '../../../lib/utils';
import { DollarSign, Store, Users, ShoppingBag, ArrowRight, ShieldCheck, Briefcase, Calendar } from 'lucide-react';
import { ORDER_STATUS_LABELS } from '../../../constants/order-status';

export default async function AdminDashboardPage() {
  const sellers = await SellerService.getSellers();
  const products = await ProductService.getProducts();
  const orders = await OrderService.getOrders();
  const employees = await HRMSService.getEmployees();
  const auditLogs = await HRMSService.getAuditLogs();

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCommission = totalGMV * 0.1; // 10% platform fee

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Super Admin Executive Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Platform-wide overview, vendor store moderation, and enterprise HR logs.</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Platform GMV</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-white">{formatCurrency(totalGMV)}</span>
            <span className="text-[11px] text-emerald-400 font-bold block">Across all vendors</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Platform Commissions</span>
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400">{formatCurrency(totalCommission)}</span>
            <span className="text-[11px] text-amber-400 font-bold block">10% Platform fee</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Active Sellers</span>
              <Store className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-2xl font-black text-white">{sellers.length} Stores</span>
            <span className="text-[11px] text-blue-400 font-bold block">100% Verified</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase">Internal Staff</span>
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-2xl font-black text-white">{employees.length} Employees</span>
            <span className="text-[11px] text-purple-400 font-bold block">HRMS synced</span>
          </div>
        </div>

        {/* System Recent Orders Table */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">System Wide Orders</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Order Number</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((o) => {
                  const badge = ORDER_STATUS_LABELS[o.status];
                  return (
                    <tr key={o.id} className="hover:bg-zinc-800/40">
                      <td className="px-4 py-3 font-bold text-white">{o.orderNumber}</td>
                      <td className="px-4 py-3">{o.customerName}</td>
                      <td className="px-4 py-3 text-xs">{o.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-white">{formatCurrency(o.totalAmount)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Logs Quick Feed */}
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Security Audit Log Feed
          </h3>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-white">{log.action}</span>
                  <p className="text-zinc-400">{log.details}</p>
                </div>
                <span className="text-zinc-500 font-mono">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
