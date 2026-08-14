import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { ProductService } from '../../../services/product.service';
import { formatCurrency } from '../../../lib/utils';

export default async function AdminProductsPage() {
  const products = await ProductService.getProducts();

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Global Product Catalog Control</h1>
          <p className="text-xs text-zinc-400 mt-1">Moderate catalog items across all marketplace vendors.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover border border-zinc-800" />
                      <span className="font-bold text-white">{p.title}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-400">{p.sellerName}</td>
                    <td className="px-4 py-3">{p.category.name}</td>
                    <td className="px-4 py-3 font-bold text-white">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3">{p.stock} units</td>
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
