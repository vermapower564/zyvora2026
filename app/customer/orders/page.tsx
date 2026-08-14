import React from 'react';
import Link from 'next/link';
import { OrderService } from '../../../services/order.service';
import { ORDER_STATUS_LABELS } from '../../../constants/order-status';
import { formatCurrency, formatDate } from '../../../lib/utils';
import { Package, ArrowRight, Truck } from 'lucide-react';

export default async function CustomerOrdersPage() {
  const orders = await OrderService.getOrders('usr_demo_customer_1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Your Order History</h1>
        <p className="text-sm text-zinc-400 mt-1">Review past transactions, fulfillment status, and tracking information.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusBadge = ORDER_STATUS_LABELS[order.status];
          return (
            <div key={order.id} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-zinc-500 uppercase">Order Number</span>
                  <h3 className="text-lg font-black text-white">{order.orderNumber}</h3>
                  <span className="text-xs text-zinc-400">Placed on {formatDate(order.createdAt)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>
                  <Link href={`/customer/orders/${order.id}`}>
                    <span className="text-xs font-bold text-white hover:underline flex items-center gap-1">
                      View Invoice <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.product.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover border border-zinc-800" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{item.product.title}</h4>
                      <span className="text-xs text-zinc-400">Sold by {item.product.sellerName} • Qty: {item.quantity}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {order.trackingNumber && (
                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-blue-400">
                  <Truck className="w-4 h-4" /> Tracking Number: <span className="font-mono text-zinc-300 font-bold">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
