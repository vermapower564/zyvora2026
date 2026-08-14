'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, Category } from '@/types/product';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
  Sparkles,
  Search,
  Check,
  Grid,
  Filter,
} from 'lucide-react';

export interface ProductListingPageProps {
  initialProducts: Product[];
  categories: Category[];
  searchQuery?: string;
  categorySlug?: string;
  categoryName?: string;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({
  initialProducts,
  categories,
  searchQuery = '',
  categorySlug = '',
  categoryName = '',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search input state
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(categorySlug || 'ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);

  // Category Attribute Filters (Dynamic attributes map)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  // Mobile Filter Drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sort State
  const [sortBy, setSortBy] = useState<
    'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'rating'
  >('relevance');

  // Extract unique brands dynamically from products
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.sellerName) brands.add(p.sellerName);
    });
    return Array.from(brands);
  }, [initialProducts]);

  // Extract category dynamic attribute keys (e.g. Color, Size, RAM, Storage, Movement)
  const categoryAttributeKeys = useMemo(() => {
    const keys = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.attributes) {
        Object.keys(p.attributes).forEach((k) => keys.add(k));
      }
    });
    return Array.from(keys);
  }, [initialProducts]);

  // Filtered and Sorted Products computation
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Search query search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description?.toLowerCase().includes(q);
          const matchCat = product.category?.name.toLowerCase().includes(q);
          const matchBrand = product.sellerName?.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat && !matchBrand) return false;
        }

        // Category filter
        if (
          selectedCategory !== 'ALL' &&
          product.category?.slug.toLowerCase() !== selectedCategory.toLowerCase() &&
          product.category?.id !== selectedCategory
        ) {
          return false;
        }

        // Brand filter
        if (selectedBrand !== 'ALL' && product.sellerName !== selectedBrand) {
          return false;
        }

        // Price range filter
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }

        // Rating filter
        if (product.rating < minRating) {
          return false;
        }

        // Stock filter
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        // Dynamic attribute filters
        for (const [attrKey, attrVal] of Object.entries(selectedAttributes)) {
          if (attrVal !== 'ALL') {
            const prodAttrVal = product.attributes?.[attrKey];
            if (!prodAttrVal || String(prodAttrVal).toLowerCase() !== attrVal.toLowerCase()) {
              return false;
            }
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0; // relevance default
      });
  }, [
    initialProducts,
    searchTerm,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    selectedAttributes,
    sortBy,
  ]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleClearFilters = () => {
    setSelectedCategory('ALL');
    setSelectedBrand('ALL');
    setMinPrice(0);
    setMaxPrice(200000);
    setMinRating(0);
    setInStockOnly(false);
    setFreeDeliveryOnly(false);
    setSelectedAttributes({});
    setSearchTerm('');
  };

  const titleHeader = searchQuery
    ? `Results for "${searchQuery}"`
    : categoryName
    ? `${categoryName} Collection`
    : 'Explore ZYVORA Marketplace';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-zinc-950 min-h-screen text-zinc-100">
      {/* Search & Header Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{titleHeader}</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Showing <span className="text-amber-400 font-bold">{filteredProducts.length}</span> verified products in Indian Rupee (₹)
            </p>
          </div>

          {/* Quick Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shoes, laptops, headphones, mobiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <Button type="submit" size="sm" className="bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold shrink-0">
              Search
            </Button>
          </form>
        </div>

        {/* Category Shortcut Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-amber-400 text-zinc-950 shadow-md'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory.toLowerCase() === cat.slug.toLowerCase()
                  ? 'bg-amber-400 text-zinc-950 shadow-md'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Top Filter Bar / Sort Controls */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-700"
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span>Filters ({filteredProducts.length})</span>
        </button>

        {/* Applied Filter Tags Summary */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400">
          <span>Active Filters:</span>
          {selectedCategory !== 'ALL' && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold flex items-center gap-1">
              Category: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('ALL')} />
            </span>
          )}
          {selectedBrand !== 'ALL' && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold flex items-center gap-1">
              Brand: {selectedBrand}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('ALL')} />
            </span>
          )}
          {minRating > 0 && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold flex items-center gap-1">
              ★ {minRating}+
              <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-zinc-500 hover:text-zinc-300 underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 ml-auto">
          <span className="font-semibold text-zinc-300">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Left Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 sticky top-24">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-xs text-zinc-400 hover:text-amber-400 font-bold"
            >
              Reset
            </button>
          </div>

          {/* Price Filter */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider">Price Range (₹)</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[11px] text-zinc-400">Min</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs"
                />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">Max</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          {availableBrands.length > 0 && (
            <div className="space-y-2 border-t border-zinc-800 pt-4">
              <label className="text-xs font-bold text-white uppercase tracking-wider">Brand / Store</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
              >
                <option value="ALL">All Brands & Sellers</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Minimum Rating */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <label className="text-xs font-bold text-white uppercase tracking-wider">Customer Rating</label>
            <div className="space-y-1">
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(minRating === r ? 0 : r)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    minRating === r
                      ? 'bg-amber-400/20 text-amber-400 font-bold border border-amber-400/40'
                      : 'text-zinc-300 hover:bg-zinc-950'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {r}★ & above
                  </span>
                  {minRating === r && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only */}
          <div className="border-t border-zinc-800 pt-4">
            <label className="flex items-center gap-3 cursor-pointer text-xs text-zinc-300 font-semibold">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-0"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Category Attributes (Data-Driven) */}
          {categoryAttributeKeys.map((attrKey) => (
            <div key={attrKey} className="space-y-2 border-t border-zinc-800 pt-4">
              <label className="text-xs font-bold text-white uppercase tracking-wider">{attrKey}</label>
              <select
                value={selectedAttributes[attrKey] || 'ALL'}
                onChange={(e) =>
                  setSelectedAttributes({ ...selectedAttributes, [attrKey]: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs"
              >
                <option value="ALL">All {attrKey}s</option>
                {Array.from(
                  new Set(
                    initialProducts
                      .map((p) => p.attributes?.[attrKey])
                      .filter(Boolean)
                  )
                ).map((val: any) => (
                  <option key={val} value={String(val)}>
                    {String(val)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </aside>

        {/* Right Content Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto text-2xl font-bold">
                ?
              </div>
              <h3 className="text-xl font-bold text-white">No products found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No matching products found for your filter criteria. Try adjusting your search query, price range, or category filter.
              </p>
              <Button onClick={handleClearFilters} size="sm" className="bg-amber-400 text-zinc-950 font-bold">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Slide-Over Drawer Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/80 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs h-full bg-zinc-900 p-6 overflow-y-auto space-y-6 shadow-2xl border-l border-zinc-800">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-white">Filter Products</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters Body */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-white">Price Range (₹)</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-1/2 p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-1/2 p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <Button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-amber-400 text-zinc-950 font-bold"
                >
                  Apply Filters ({filteredProducts.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
