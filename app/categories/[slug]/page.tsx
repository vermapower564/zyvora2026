import React from 'react';
import { notFound } from 'next/navigation';
import { ProductService } from '@/services/product.service';
import { ProductListingPage } from '@/components/product/product-listing-page';

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const categories = await ProductService.getCategories();
  const category = categories.find(
    (c) => c.slug.toLowerCase() === resolvedParams.slug.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const [products, allCategories] = await Promise.all([
    ProductService.getProducts({ categorySlug: category.slug }),
    ProductService.getCategories(),
  ]);

  return (
    <ProductListingPage
      initialProducts={products}
      categories={allCategories}
      categorySlug={category.slug}
      categoryName={category.name}
    />
  );
}
