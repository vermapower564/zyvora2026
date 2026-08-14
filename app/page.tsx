import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Zap, Store, Sparkles } from 'lucide-react';
import { ProductService } from '../services/product.service';
import { ProductGrid } from '../components/product/product-grid';
import { Button } from '../components/ui/button';

export default async function HomePage() {
  const featuredProducts = await ProductService.getProducts({ featuredOnly: true });
  const categories = await ProductService.getCategories();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/90 border border-zinc-700 text-xs font-semibold text-zinc-300 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Next-Gen Multi-Vendor Luxury Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Elevate Your Lifestyle with Verified Luxury & Tech.
            </h1>

            <p className="text-lg text-zinc-400 font-normal leading-relaxed">
              Discover exclusive collections from certified global vendors. Seamless single-cart checkout, instant order tracking, and 24/7 buyer guarantee.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="gap-2 text-base px-8 shadow-xl shadow-white/10">
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/seller/register">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  <Store className="w-5 h-5" />
                  Become a Vendor
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-zinc-800/80">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white">10K+</span>
                <span className="text-xs text-zinc-400">Verified Products</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white">500+</span>
                <span className="text-xs text-zinc-400">Curated Sellers</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-white">99.8%</span>
                <span className="text-xs text-zinc-400">On-Time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-zinc-800 text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Free Worldwide Express</h4>
              <p className="text-xs text-zinc-400">Complimentary on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-zinc-800 text-white">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Authenticity Guaranteed</h4>
              <p className="text-xs text-zinc-400">100% verified vendor products</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-zinc-800 text-white">
              <RefreshCw className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">30-Day Hassle-Free Returns</h4>
              <p className="text-xs text-zinc-400">Instant refund processing</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-zinc-800 text-white">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Instant Checkout</h4>
              <p className="text-xs text-zinc-400">Powered by Stripe & PayPal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Browse Categories</h2>
            <p className="text-sm text-zinc-400 mt-1">Explore top collections across our global multi-vendor catalog.</p>
          </div>
          <Link href="/categories" className="text-sm font-bold text-white hover:underline flex items-center gap-1">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 h-64 p-6 flex flex-col justify-end transition-all duration-300 hover:border-zinc-700 hover:scale-[1.02]"
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

              <div className="relative z-10 space-y-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {cat.productCount || 10}+ Items
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Featured Drops</h2>
            <p className="text-sm text-zinc-400 mt-1">Curated selections from our top-rated vendor stores.</p>
          </div>
          <Link href="/products" className="text-sm font-bold text-white hover:underline flex items-center gap-1">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
