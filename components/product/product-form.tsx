'use client';

import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types/product';
import { productSchema } from '../../lib/validations';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  productToEdit?: Product | null;
  categories: Category[];
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  productToEdit,
  categories,
}) => {
  const isEditing = !!productToEdit;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price.toString());
      setOriginalPrice(productToEdit.originalPrice ? productToEdit.originalPrice.toString() : '');
      setStock(productToEdit.stock.toString());
      setCategoryId(productToEdit.category.id);
      setImageUrl(productToEdit.images[0] || '');
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
      setOriginalPrice('');
      setStock('');
      setCategoryId(categories[0]?.id || 'cat_1');
      setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800');
    }
    setErrors({});
  }, [productToEdit, categories, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price: parseFloat(price) || 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      stock: parseInt(stock, 10) || 0,
      categoryId,
      images: [imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
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
      await onSubmit({ ...payload, id: productToEdit?.id });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit ${productToEdit?.title}` : 'Add New Product'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <Input
          label="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          placeholder="e.g. Zyvora Studio Headphones"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Selling Price ($)"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={errors.price}
          />
          <Input
            label="MSRP ($)"
            type="number"
            step="0.01"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <Input
            label="Stock Units"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            error={errors.stock}
          />
        </div>

        <Select
          label="Category Taxonomy"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm border bg-zinc-950 border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.description && <span className="text-xs text-rose-500 font-medium">{errors.description}</span>}
        </div>

        <Input
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          error={errors.images}
        />

        <div className="flex gap-3 pt-4 border-t border-zinc-800">
          <Button type="button" variant="outline" onClick={onClose} className="w-1/3">
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading} className="w-2/3">
            {isEditing ? 'Save Changes' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
