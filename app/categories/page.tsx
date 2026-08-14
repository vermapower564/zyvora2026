import React from 'react';
import Link from 'next/link';
import { ProductService } from '../../services/product.service';

export default async function CategoriesPage() {
  const categories = await ProductService.getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Product Categories</h1>
        <p className="text-sm text-zinc-400 mt-1">Browse items by specialized department and multi-vendor collections.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 h-64 p-6 flex flex-col justify-end transition-all duration-300 hover:border-zinc-700 hover:scale-[1.02]"
          >
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <div className="relative z-10 space-y-1">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {cat.productCount || 10}+ Items
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
