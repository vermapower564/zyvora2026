import React from 'react';
import { notFound } from 'next/navigation';
import { OrderService } from '../../../../services/order.service';
import { ORDER_STATUS_LABELS } from '../../../../constants/order-status';
import { formatCurrency, formatDate } from '../../../../lib/utils';
import { Package, Truck, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const order = await OrderService.getOrderById(resolvedParams.id);

  if (!order) {
    notFound();
  }

  const statusBadge = ORDER_STATUS_LABELS[order.status];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Invoice Banner */}
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase">Tax Invoice</span>
            <h1 className="text-2xl font-black text-white">{order.orderNumber}</h1>
            <p className="text-xs text-zinc-400">Order Placed: {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>
        </div>

        {/* Tracking Timeline Visual */}
        <div className="grid grid-cols-4 gap-2 pt-4">
          {['ORDERED', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((step, idx) => (
            <div key={step} className="text-center space-y-2">
              <div className={`h-2 rounded-full ${idx <= 2 ? 'bg-emerald-500' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-bold uppercase text-zinc-400">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Item Breakdown */}
      <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">Item Breakdown</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img src={item.product.images[0]} alt="" className="w-16 h-16 rounded-2xl object-cover border border-zinc-800" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{item.product.title}</h4>
                <p className="text-xs text-zinc-400">Vendor: {item.product.sellerName} • Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-bold text-white">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-800">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold text-white">{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-bold text-white">{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-white pt-3 border-t border-zinc-800">
            <span>Total Amount Paid</span>
            <span>{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
