'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../../components/layout/sidebar';
import { Input } from '../../../../components/ui/input';
import { Select } from '../../../../components/ui/select';
import { Button } from '../../../../components/ui/button';
import { productSchema } from '../../../../lib/validations';
import { useUIStore } from '../../../../store/ui-store';
import { Package, Upload } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('cat_1');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price: parseFloat(price) || 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      stock: parseInt(stock, 10) || 0,
      categoryId,
      images: [imageUrl],
    };

    const result = productSchema.safeParse(payload);
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) errMap[issue.path[0] as string] = issue.message;
      });
      setErrors(errMap);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        addToast(`Product "${title}" created successfully!`, 'success');
        router.push('/seller/products');
      } else {
        addToast('Failed to create product', 'error');
      }
    } catch {
      addToast('Error communicating with API', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Create New Product</h1>
          <p className="text-xs text-zinc-400 mt-1">Publish a new item to the Zyvora marketplace catalog.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 max-w-3xl">
          <div className="space-y-4">
            <Input label="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} placeholder="e.g. Zyvora Studio Pro Headphones" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input label="Selling Price ($)" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} error={errors.price} />
              <Input label="Original MSRP ($)" type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
              <Input label="Initial Stock Units" type="number" value={stock} onChange={(e) => setStock(e.target.value)} error={errors.stock} />
            </div>

            <Select
              label="Product Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              options={[
                { value: 'cat_1', label: 'Electronics & Audio' },
                { value: 'cat_2', label: 'Luxury Fashion' },
                { value: 'cat_3', label: 'Home & Workspaces' },
                { value: 'cat_4', label: 'Smart Appliances' },
              ]}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm border bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Detail key specifications, warranty, and features..."
              />
              {errors.description && <span className="text-xs text-rose-500 font-medium">{errors.description}</span>}
            </div>

            <Input label="Product Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} error={errors.images} />
          </div>

          <Button type="submit" isLoading={isLoading} size="lg" className="w-full">
            Publish Product to Store
          </Button>
        </form>
      </main>
    </div>
  );
}
