'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Product } from '../../types/product';
import { formatCurrency, formatDate } from '../../lib/utils';

export interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
          <tr>
            <th className="px-5 py-4">Product Details</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Vendor / Brand</th>
            <th className="px-5 py-4">Price</th>
            <th className="px-5 py-4">Stock Level</th>
            <th className="px-5 py-4">Rating</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {products.map((p) => {
            const isLowStock = p.stock > 0 && p.stock <= 15;
            const isOutOfStock = p.stock === 0;

            return (
              <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-5 py-4 flex items-center gap-3">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <Link href={`/products/${p.slug}`} className="font-bold text-white hover:underline block truncate max-w-xs">
                      {p.title}
                    </Link>
                    <span className="text-[11px] font-mono text-zinc-500">ID: {p.id}</span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                    {p.category.name}
                  </span>
                </td>

                <td className="px-5 py-4 text-xs text-zinc-400 font-medium">
                  {p.sellerName}
                </td>

                <td className="px-5 py-4 font-bold text-white">
                  {formatCurrency(p.price)}
                </td>

                <td className="px-5 py-4">
                  {isOutOfStock ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800">
                      Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1 w-max">
                      <AlertTriangle className="w-3 h-3" /> Low ({p.stock})
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {p.stock} units
                    </span>
                  )}
                </td>

                <td className="px-5 py-4 font-bold text-amber-400 text-xs">
                  ★ {p.rating.toFixed(1)} <span className="text-zinc-500 font-normal">({p.reviewCount})</span>
                </td>

                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/products/${p.slug}`}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onEdit(p)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
