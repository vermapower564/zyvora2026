import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { ProductService } from '../../../services/product.service';
import { InventoryService } from '../../../services/inventory.service';
import { formatCurrency } from '../../../lib/utils';
import { AlertTriangle, Boxes, CheckCircle2 } from 'lucide-react';

export default async function SellerInventoryPage() {
  const products = await ProductService.getProducts({ sellerId: 'sel_tech' });
  const lowStockAlerts = await InventoryService.getLowStockAlerts(15);

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Stock & Inventory Control</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time stock level monitoring and low stock alerts.</p>
        </div>

        {lowStockAlerts.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800 text-amber-300 text-sm flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-bold">Attention: {lowStockAlerts.length} items running low on stock!</span>
              <p className="text-xs text-amber-400">Replenish stock to maintain continuous marketplace availability.</p>
            </div>
          </div>
        )}

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock Units</th>
                  <th className="px-4 py-3">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-bold text-white">{p.title}</td>
                    <td className="px-4 py-3">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3 font-bold text-white">{p.stock}</td>
                    <td className="px-4 py-3">
                      {p.stock <= 15 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          Low Stock ({p.stock})
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Optimal Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
