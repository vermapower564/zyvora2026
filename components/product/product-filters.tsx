'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Category } from '../../types/product';
import { Button } from '../ui/button';

export interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  stockFilter: string;
  onStockFilterChange: (st: string) => void;
  categories: Category[];
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  categories,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'ALL' || stockFilter !== 'ALL';

  return (
    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <input
          type="text"
          placeholder="Search by title, description, SKU or tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="ALL">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={stockFilter}
          onChange={(e) => onStockFilterChange(e.target.value)}
          className="px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="ALL">All Stock Statuses</option>
          <option value="IN_STOCK">In Stock (&gt; 15)</option>
          <option value="LOW_STOCK">Low Stock (&le; 15)</option>
          <option value="OUT_OF_STOCK">Out of Stock (0)</option>
        </select>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="text-xs text-rose-400 gap-1.5 px-3 py-1.5">
            <X className="w-3.5 h-3.5" /> Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
