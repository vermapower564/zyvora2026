import React from 'react';
import { ProductService } from '@/services/product.service';
import { ProductListingPage } from '@/components/product/product-listing-page';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const categorySlug = resolvedParams.category || '';

  const [products, categories] = await Promise.all([
    ProductService.getProducts({ searchQuery: query, categorySlug }),
    ProductService.getCategories(),
  ]);

  return (
    <ProductListingPage
      initialProducts={products}
      categories={categories}
      searchQuery={query}
      categorySlug={categorySlug}
    />
  );
}
