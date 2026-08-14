'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Product } from '@/types/product';
import { ProductService } from '@/services/product.service';
import { RatingStars } from '@/components/product/rating-stars';
import { ProductCard } from '@/components/product/product-card';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useUIStore } from '@/store/ui-store';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  Heart,
  MapPin,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const { addItem } = useCart();
  const { addToast } = useUIStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Indian PIN Code Delivery Checker
  const [pinCode, setPinCode] = useState('110001');
  const [pinChecked, setPinChecked] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prod = await ProductService.getProductBySlug(slug);
        if (prod) {
          setProduct(prod);
          const allProds = await ProductService.getProducts();
          setRelatedProducts(allProds.filter((p) => p.id !== prod.id).slice(0, 3));
        }
      } catch {
        addToast('Failed to load product details.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-400">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-zinc-400">The product you requested does not exist or has been removed.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      addToast('Item is out of stock.', 'error');
      return;
    }
    addItem(product, 1);
    addToast(`Added "${product.title}" to cart!`, 'success');
  };

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.length === 6) {
      setPinChecked(true);
      const days = (parseInt(pinCode) % 3) + 2;
      setDeliveryEstimate(`Express Delivery available to PIN ${pinCode} by ${days} business days (FREE)`);
      addToast(`PIN Code ${pinCode} verified for delivery!`, 'success');
    } else {
      addToast('Please enter a valid 6-digit Indian PIN code', 'error');
    }
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-zinc-950 min-h-screen text-zinc-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
            <img
              src={product.images[selectedImgIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {discountPercent && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase rounded-full bg-rose-500 text-white shadow-md">
                -{discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                isWishlisted ? 'bg-rose-500 text-white' : 'bg-zinc-900/80 text-zinc-300 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImgIndex(i)}
                  className={`aspect-square rounded-2xl bg-zinc-900 border-2 overflow-hidden transition-all ${
                    selectedImgIndex === i ? 'border-amber-400 scale-105' : 'border-zinc-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Summary & Buy Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 uppercase tracking-wider">
                {product.category?.name}
              </span>
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-zinc-500" /> Sold by{' '}
                <strong className="text-zinc-200">{product.sellerName || 'ZYVORA Retail'}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{product.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
              <span className="text-zinc-500">•</span>
              {isOutOfStock ? (
                <span className="text-rose-400 font-bold bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900/50">
                  OUT OF STOCK
                </span>
              ) : isLowStock ? (
                <span className="text-amber-400 font-bold bg-amber-950/40 px-3 py-1 rounded-full border border-amber-900/50">
                  Only {product.stock} units left!
                </span>
              ) : (
                <span className="text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
                  In Stock & Ready to Ship
                </span>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">{formatCurrency(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-zinc-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold">Inclusive of all Indian taxes & GST</p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed border-t border-zinc-800 pt-4">
              {product.description}
            </p>

            {/* Indian PIN Code Delivery Checker */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Check Delivery Availability in India</span>
              </label>
              <form onSubmit={handlePinCheck} className="flex gap-2 max-w-xs">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs font-mono"
                />
                <Button type="submit" size="sm" className="bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold">
                  Check
                </Button>
              </form>
              {pinChecked && deliveryEstimate && (
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{deliveryEstimate}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                size="lg"
                className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold gap-2 text-sm shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 text-xs text-zinc-400 pt-4 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" /> Free Express Delivery
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Buyer Protection
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-400" /> 14-Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Customer Highlights Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-zinc-800">
        {/* Dynamic Category Specifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Product Specifications & Category Attributes</span>
            </h3>
            {product.attributes && Object.keys(product.attributes).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(product.attributes).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex justify-between">
                    <span className="text-zinc-400 font-medium">{key}</span>
                    <span className="font-bold text-white">{String(val)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400">Standard specifications apply for this item.</p>
            )}
          </div>

          {/* Customer Highlights ("What Customers Say") */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-emerald-400" />
              <span>What Customers Say</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              &ldquo;Customers frequently highlight the exceptional performance, premium craftsmanship, and prompt delivery across India. Rated {product.rating} / 5 stars based on {product.reviewCount} verified reviews.&rdquo;
            </p>
          </div>
        </div>

        {/* Sidebar Recommended Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Related Products</h3>
          <div className="space-y-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
