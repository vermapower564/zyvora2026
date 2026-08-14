import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { ProductService } from '../../../services/product.service';

export default async function AdminInventoryPage() {
  const products = await ProductService.getProducts();

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Global Inventory Monitor</h1>
          <p className="text-xs text-zinc-400 mt-1">Cross-vendor stock levels and supply analytics.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Total Stock Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-bold text-white">{p.title}</td>
                    <td className="px-4 py-3 text-xs text-zinc-400">{p.sellerName}</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{p.stock} units</td>
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
