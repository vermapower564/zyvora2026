import React from 'react';
import { Package, CheckCircle2, AlertTriangle, Layers, XCircle } from 'lucide-react';
import { Product, Category } from '../../types/product';

export interface ProductStatsProps {
  products: Product[];
  categories: Category[];
}

export const ProductStats: React.FC<ProductStatsProps> = ({ products, categories }) => {
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 15).length;
  const totalCategories = categories.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400">
          <span className="text-xs font-bold uppercase tracking-wider">Total Products</span>
          <Package className="w-4 h-4 text-blue-400" />
        </div>
        <span className="text-2xl font-black text-white">{totalProducts}</span>
        <span className="text-[11px] text-zinc-500 block">Catalog items</span>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400">
          <span className="text-xs font-bold uppercase tracking-wider">Active & Available</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-2xl font-black text-emerald-400">{activeProducts}</span>
        <span className="text-[11px] text-emerald-500/80 font-semibold block">In Stock</span>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400">
          <span className="text-xs font-bold uppercase tracking-wider">Low Stock</span>
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-2xl font-black text-amber-400">{lowStock}</span>
        <span className="text-[11px] text-amber-500/80 font-semibold block">&le; 15 units left</span>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400">
          <span className="text-xs font-bold uppercase tracking-wider">Out of Stock</span>
          <XCircle className="w-4 h-4 text-rose-400" />
        </div>
        <span className="text-2xl font-black text-rose-400">{outOfStock}</span>
        <span className="text-[11px] text-rose-500/80 font-semibold block">Replenishment needed</span>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
        <div className="flex items-center justify-between text-zinc-400">
          <span className="text-xs font-bold uppercase tracking-wider">Categories</span>
          <Layers className="w-4 h-4 text-purple-400" />
        </div>
        <span className="text-2xl font-black text-white">{totalCategories}</span>
        <span className="text-[11px] text-purple-400/80 font-semibold block">Active taxonomies</span>
      </div>
    </div>
  );
};
