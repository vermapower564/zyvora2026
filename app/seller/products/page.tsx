import React from 'react';
import Link from 'next/link';
import { Sidebar } from '../../../components/layout/sidebar';
import { ProductService } from '../../../services/product.service';
import { formatCurrency } from '../../../lib/utils';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default async function SellerProductsPage() {
  let products = await ProductService.getProducts({ sellerId: 'sel_tech' });
  if (!products || products.length === 0) {
    products = await ProductService.getProducts();
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Store Product Catalog</h1>
            <p className="text-xs text-zinc-400 mt-1">Manage active listings, inventory pricing, and stock levels.</p>
          </div>

          <Link href="/seller/products/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add New Product
            </Button>
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover border border-zinc-800" />
                      <div>
                        <span className="font-bold text-white block">{p.title}</span>
                        <span className="text-xs text-zinc-500">ID: {p.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{p.category.name}</td>
                    <td className="px-4 py-3 font-bold text-white">{formatCurrency(p.price)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.stock < 15 ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-amber-400">★ {p.rating}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/seller/products/${p.id}`} className="p-2 text-zinc-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
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
