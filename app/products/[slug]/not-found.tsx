import React from 'react';
import Link from 'next/link';
import { PackageX, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center">
        <PackageX className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-white">Product Not Found</h1>
      <p className="text-sm text-zinc-400 max-w-md">
        The product you are looking for does not exist, has been unlisted, or has been removed from the Zyvora catalog.
      </p>
      <Link href="/products" className="mt-4">
        <Button variant="primary" className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Products Catalog
        </Button>
      </Link>
    </div>
  );
}
