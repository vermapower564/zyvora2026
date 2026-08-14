import { NextResponse } from 'next/server';
import { ProductService } from '../../../services/product.service';
import { productSchema } from '../../../lib/validations';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || undefined;
    const searchQuery = searchParams.get('q') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';
    const sellerId = searchParams.get('sellerId') || undefined;

    const products = await ProductService.getProducts({
      categorySlug,
      searchQuery,
      featuredOnly,
      sellerId,
    });

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const categories = await ProductService.getCategories();
    const cat = categories.find((c) => c.id === parsed.data.categoryId) || categories[0];

    const created = await ProductService.addProduct({
      ...parsed.data,
      slug: parsed.data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: cat,
      sellerId: 'sel_tech',
      sellerName: 'Aura Sound Labs',
      attributes: {},
      featured: true,
      tags: ['new-arrival'],
    });

    return NextResponse.json({ success: true, message: 'Product created', data: created });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
