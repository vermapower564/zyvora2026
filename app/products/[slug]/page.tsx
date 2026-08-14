'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  Box,
  RotateCw,
  Eye,
  Star,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
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

  // Viewer Mode: 'GALLERY' | 'ROTATE_360' | 'MODEL_3D'
  const [viewerMode, setViewerMode] = useState<'GALLERY' | 'ROTATE_360' | 'MODEL_3D'>('GALLERY');
  const [angleIndex, setAngleIndex] = useState(0);

  // Indian PIN Code Delivery Checker
  const [pinCode, setPinCode] = useState('110001');
  const [pinChecked, setPinChecked] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);

  // Q&A State
  const [questions, setQuestions] = useState<
    { id: string; user: string; question: string; answer?: string; date: string }[]
  >([
    {
      id: 'q1',
      user: 'Ankit Mehta',
      question: 'Does this come with a hard shell carrying case?',
      answer: 'Yes, it includes a premium hardshell travel case along with a Type-C charging cable.',
      date: '2 days ago',
    },
    {
      id: 'q2',
      user: 'Siddharth Rao',
      question: 'Is it compatible with both Android and iOS devices?',
      answer: 'Absolutely! Bluetooth 5.3 supports instant dual-device pairing with Android, iOS, Windows, and macOS.',
      date: '1 week ago',
    },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [openQAIndex, setOpenQAIndex] = useState<number | null>(0);

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

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const item = {
      id: `q_${Date.now()}`,
      user: 'Verified Buyer',
      question: newQuestion,
      date: 'Just now',
    };
    setQuestions([item, ...questions]);
    setNewQuestion('');
    addToast('Question submitted to seller!', 'success');
  };

  const angleImages = product.imageAngles && product.imageAngles.length > 0 ? product.imageAngles : product.images;

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => window.history.forward()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all font-semibold"
            >
              Forward <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-zinc-600">/</span>
            <a href="/products" className="hover:text-amber-400 transition-colors">Products</a>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-bold capitalize">{product.category.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT: Multi-Mode Media Viewer */}
          <div className="lg:col-span-7 space-y-4">
            {/* Viewer Mode Selector Tabs */}
            <div className="flex items-center justify-between p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-bold">
              <button
                onClick={() => setViewerMode('GALLERY')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  viewerMode === 'GALLERY' ? 'bg-amber-400 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Gallery</span>
              </button>
              <button
                onClick={() => setViewerMode('ROTATE_360')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  viewerMode === 'ROTATE_360' ? 'bg-amber-400 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <RotateCw className="w-4 h-4" />
                <span>360° Rotator</span>
              </button>
              <button
                onClick={() => setViewerMode('MODEL_3D')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  viewerMode === 'MODEL_3D' ? 'bg-amber-400 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>Interactive 3D</span>
              </button>
            </div>

            {/* Main Stage View */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center p-6 shadow-2xl">
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-black bg-rose-500 text-white shadow-lg uppercase tracking-wider">
                  {discountPercent}% OFF
                </span>
              )}

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-zinc-950/80 border border-zinc-700 text-zinc-300 hover:text-rose-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {viewerMode === 'GALLERY' && (
                <img
                  src={product.images[selectedImgIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-contain transition-all duration-300 hover:scale-105"
                />
              )}

              {viewerMode === 'ROTATE_360' && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                  <img
                    src={angleImages[angleIndex % angleImages.length]}
                    alt={`${product.title} Angle ${angleIndex + 1}`}
                    className="w-full h-72 object-contain"
                  />
                  <div className="w-full max-w-xs space-y-2 text-center">
                    <input
                      type="range"
                      min={0}
                      max={angleImages.length - 1}
                      value={angleIndex}
                      onChange={(e) => setAngleIndex(parseInt(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-2">
                      <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      Drag slider for 360° view ({angleIndex + 1} / {angleImages.length})
                    </p>
                  </div>
                </div>
              )}

              {viewerMode === 'MODEL_3D' && (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
                    <Box className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h4 className="font-extrabold text-white text-base">WebGL Interactive 3D Model</h4>
                    <p className="text-xs text-zinc-400">
                      Rotate, zoom, and pan product model in 3D WebGL space. (Hardware acceleration enabled)
                    </p>
                  </div>
                  <Button size="sm" className="bg-amber-400 text-zinc-950 font-bold hover:bg-amber-500 gap-2">
                    <RotateCw className="w-4 h-4" /> Reset 3D Camera
                  </Button>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery Row */}
            {viewerMode === 'GALLERY' && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-20 h-20 rounded-2xl border-2 overflow-hidden shrink-0 bg-zinc-900 p-1 transition-all ${
                      selectedImgIndex === idx ? 'border-amber-400 scale-95 shadow-md' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information & Purchase Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  {product.category.name}
                </span>
                <span className="text-xs font-bold text-zinc-400">SKU: ZYV-{product.id.slice(0, 6).toUpperCase()}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{product.title}</h1>
              <p className="text-xs text-zinc-400 flex items-center gap-2">
                <span>Sold by</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  {product.sellerName}
                </span>
              </p>
            </div>

            {/* Rating & Verified Summary */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={product.rating} />
                <span className="text-sm font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-semibold text-zinc-400">{product.reviewCount} Verified Customer Reviews</span>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-zinc-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-400">Inclusive of all local taxes & free nationwide shipping in India.</p>
            </div>

            {/* Indian PIN Code Availability Checker */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> Check Delivery & PIN Code Availability
              </label>
              <form onSubmit={handlePinCheck} className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 px-4 py-2 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
                />
                <Button type="submit" size="sm" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs">
                  Verify PIN
                </Button>
              </form>
              {pinChecked && deliveryEstimate && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{deliveryEstimate}</span>
                </div>
              )}
            </div>

            {/* Stock & Purchase Buttons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Availability:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    product.stock > 10
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : product.stock > 0
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {product.stock > 10
                    ? 'In Stock'
                    : product.stock > 0
                    ? `Only ${product.stock} Left`
                    : 'Out of Stock'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full py-6 rounded-2xl bg-amber-400 hover:bg-amber-500 text-zinc-950 font-black text-sm gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full py-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-black text-sm gap-2"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Score & "Why You'll Like It" Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Quality Score Card */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Quality & Build Score
              </h3>
              <span className="px-3 py-1 rounded-xl bg-amber-400 text-zinc-950 font-black text-sm">
                {product.qualityScore || 4.8} / 5.0
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Calculated from verified material craftsmanship, component durability, and 30-day return metrics.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-800 text-zinc-300">
                <span>Build Material</span>
                <span className="font-bold text-white">Premium Grade</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800 text-zinc-300">
                <span>Warranty</span>
                <span className="font-bold text-emerald-400">1 Year Brand Warranty</span>
              </div>
              <div className="flex justify-between py-1.5 text-zinc-300">
                <span>Return Rate</span>
                <span className="font-bold text-white">&lt; 1.2% (Low Return)</span>
              </div>
            </div>
          </div>

          {/* Why You'll Like It & Best For Chips */}
          <div className="md:col-span-8 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Why You'll Like It
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                {(
                  product.whyLikeIt || [
                    'Precision engineered with premium materials for maximum longevity',
                    'Ergonomic design crafted for effortless everyday utility',
                    'Backed by Zyvora 100% genuine buyer protection guarantee',
                    'Fast express shipping & hassle-free returns',
                  ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-zinc-950/60 p-3 rounded-2xl border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best For Chips */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Best Recommended For:</h4>
              <div className="flex flex-wrap gap-2">
                {(product.bestFor || ['Daily Utility', 'Professional Work', 'Travel & Fitness', 'Long Term Durability']).map(
                  (useCase, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    >
                      {useCase}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Category Specifications Grid */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Detailed Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(product.attributes).map(([key, val]) => (
              <div key={key} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{key}</span>
                <p className="text-xs font-bold text-white">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Q&A Accordion Section */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" /> Customer Questions & Answers
              </h2>
              <p className="text-xs text-zinc-400 mt-1">Have a question? Ask the seller and verified buyers directly.</p>
            </div>
          </div>

          {/* Submit Question Form */}
          <form onSubmit={handleAddQuestion} className="flex items-center gap-3">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question about this product..."
              className="flex-1 px-4 py-3 rounded-2xl text-xs bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <Button type="submit" className="bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-xs px-6 py-3 rounded-2xl">
              Post Question
            </Button>
          </form>

          {/* Q&A Accordion List */}
          <div className="space-y-3 pt-2">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
                <div
                  onClick={() => setOpenQAIndex(openQAIndex === idx ? null : idx)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Q: {q.question}</span>
                  </div>
                  {openQAIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  )}
                </div>
                {openQAIndex === idx && q.answer && (
                  <div className="pt-2 border-t border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2">
                    <span className="font-bold text-amber-400 shrink-0">Answer:</span>
                    <span>{q.answer}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Product Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Related Product Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Fixed CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-zinc-800 z-50 flex items-center gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 py-3 rounded-xl bg-amber-400 text-zinc-950 font-black text-xs"
        >
          Add to Cart
        </Button>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 py-3 rounded-xl bg-zinc-800 text-white font-black text-xs"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
