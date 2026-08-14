import React from 'react';
import { notFound } from 'next/navigation';
import { Sidebar } from '../../../../components/layout/sidebar';
import { ProductService } from '../../../../services/product.service';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await ProductService.getProductBySlug(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Edit Product</h1>
          <p className="text-xs text-zinc-400 mt-1">Update details for {product.title}</p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 max-w-2xl">
          <Input label="Title" defaultValue={product.title} />
          <Input label="Price ($)" type="number" defaultValue={product.price} />
          <Input label="Stock Count" type="number" defaultValue={product.stock} />
          <Button className="w-full">Save Changes</Button>
        </div>
      </main>
    </div>
  );
}
