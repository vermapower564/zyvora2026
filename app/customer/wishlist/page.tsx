import React from 'react';
import { ProductService } from '../../../services/product.service';
import { ProductGrid } from '../../../components/product/product-grid';

export default async function WishlistPage() {
  const products = await ProductService.getProducts({ featuredOnly: true });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Your Saved Wishlist</h1>
        <p className="text-sm text-zinc-400 mt-1">Keep track of luxury items you want to purchase later.</p>
      </div>

      <ProductGrid products={products} emptyMessage="No saved items in your wishlist yet." />
    </div>
  );
}
