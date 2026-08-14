'use client';

import React, { useState } from 'react';
import { Product } from '../../types/product';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';

export interface ProductDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: string) => Promise<void>;
  product: Product | null;
}

export const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!product) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(product.id);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product Confirmation" maxWidth="sm">
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-rose-300 text-sm">
          <AlertTriangle className="w-6 h-6 shrink-0 text-rose-400" />
          <p>
            Are you sure you want to delete <strong className="text-white font-bold">{product.title}</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="w-1/2">
            Cancel
          </Button>
          <Button variant="danger" isLoading={isLoading} onClick={handleConfirm} className="w-1/2">
            Delete Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};
