'use client';

import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { ProductStats } from '../../components/product/product-stats';
import { ProductFilters } from '../../components/product/product-filters';
import { ProductTable } from '../../components/product/product-table';
import { ProductGrid } from '../../components/product/product-grid';
import { ProductFormModal } from '../../components/product/product-form';
import { ProductDeleteDialog } from '../../components/product/product-delete-dialog';
import { Button } from '../../components/ui/button';
import { useDebounce } from '../../hooks/useDebounce';
import { useUIStore } from '../../store/ui-store';
import { Plus, RefreshCw, LayoutGrid, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductsPage() {
  const { addToast } = useUIStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & View State
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const fetchCatalogData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        ProductService.getProducts(),
        ProductService.getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch {
      addToast('Failed to load products from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, []);

  // Filtered Products Computation
  const filteredProducts = products.filter((p) => {
    // 1. Search Query Filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      const matches =
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sellerName.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // 2. Category Filter
    if (selectedCategory !== 'ALL' && p.category.slug !== selectedCategory) {
      return false;
    }

    // 3. Stock Filter
    if (stockFilter === 'IN_STOCK' && p.stock <= 15) return false;
    if (stockFilter === 'LOW_STOCK' && (p.stock === 0 || p.stock > 15)) return false;
    if (stockFilter === 'OUT_OF_STOCK' && p.stock > 0) return false;

    return true;
  });

  // Pagination Logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData: any) => {
    if (editingProduct) {
      const updated = await ProductService.updateProduct(editingProduct.id, formData);
      if (updated) {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        addToast(`Updated product "${updated.title}"`, 'success');
      }
    } else {
      const cat = categories.find((c) => c.id === formData.categoryId) || categories[0];
      const created = await ProductService.addProduct({
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: cat,
        sellerId: 'sel_tech',
        sellerName: 'Aura Sound Labs',
        attributes: {},
        featured: true,
        tags: ['catalog'],
      });
      setProducts((prev) => [created, ...prev]);
      addToast(`Added new product "${created.title}"`, 'success');
    }
  };

  const handleDeleteConfirm = async (productId: string) => {
    const success = await ProductService.deleteProduct(productId);
    if (success) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      addToast('Product removed from catalog', 'info');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setStockFilter('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Products Management</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage catalog items, pricing, inventory stock, and brand taxonomies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchCatalogData} className="gap-2 text-xs">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Button onClick={handleOpenAddModal} className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <ProductStats products={products} categories={categories} />

      {/* Filter & View Control Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <ProductFilters
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              stockFilter={stockFilter}
              onStockFilterChange={(st) => {
                setStockFilter(st);
                setCurrentPage(1);
              }}
              categories={categories}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Table View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display (Table vs Grid) */}
      {paginatedProducts.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-zinc-900 border border-dashed border-zinc-800 space-y-3">
          <p className="text-zinc-400 font-medium text-sm">No products match your search or filter parameters.</p>
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </div>
      ) : viewMode === 'table' ? (
        <ProductTable
          products={paginatedProducts}
          onEdit={handleOpenEditModal}
          onDelete={(p) => setDeletingProduct(p)}
        />
      ) : (
        <ProductGrid products={paginatedProducts} />
      )}

      {/* Pagination Footer */}
      {totalItems > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
          <div>
            Showing <strong className="text-white">{startIndex + 1}</strong> to{' '}
            <strong className="text-white">{Math.min(startIndex + pageSize, totalItems)}</strong> of{' '}
            <strong className="text-white">{totalItems}</strong> products
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="gap-1 px-3"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            <span className="px-3 py-1 font-bold text-white">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="gap-1 px-3"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Form & Delete Modals */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        productToEdit={editingProduct}
        categories={categories}
      />

      <ProductDeleteDialog
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        product={deletingProduct}
      />
    </div>
  );
}
