import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { ProductService } from '../../../services/product.service';
import { Plus } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default async function AdminCategoriesPage() {
  const categories = await ProductService.getCategories();

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Category Taxonomy Manager</h1>
            <p className="text-xs text-zinc-400 mt-1">Configure marketplace categories, slugs, and promotional banners.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((c) => (
            <div key={c.id} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2 flex items-center gap-4">
              <img src={c.imageUrl} alt="" className="w-20 h-20 rounded-2xl object-cover border border-zinc-800 shrink-0" />
              <div>
                <h3 className="font-bold text-lg text-white">{c.name}</h3>
                <span className="text-xs font-mono text-zinc-500 block">slug: /{c.slug}</span>
                <p className="text-xs text-zinc-400 mt-1">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
