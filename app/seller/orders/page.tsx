import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { OrderService } from '../../../services/order.service';
import { ORDER_STATUS_LABELS } from '../../../constants/order-status';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default async function SellerOrdersPage() {
  const orders = await OrderService.getSellerOrders('sel_tech');

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Vendor Order Fulfillment</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage order fulfillment status, print shipping labels, and add tracking IDs.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Tracking Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((o) => {
                  const badge = ORDER_STATUS_LABELS[o.status];
                  return (
                    <tr key={o.id} className="hover:bg-zinc-800/40">
                      <td className="px-4 py-3 font-bold text-white">{o.orderNumber}</td>
                      <td className="px-4 py-3">{o.customerName}</td>
                      <td className="px-4 py-3 text-xs text-zinc-400">{formatDate(o.createdAt)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-white">{formatCurrency(o.totalAmount)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-400">{o.trackingNumber || 'Not assigned'}</td>
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
