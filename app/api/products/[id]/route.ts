import { NextResponse } from 'next/server';
import { ProductService } from '../../../../services/product.service';
import { productSchema } from '../../../../lib/validations';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const product = await ProductService.getProductBySlug(resolvedParams.id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const updated = await ProductService.updateProduct(resolvedParams.id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Product not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product updated', data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const success = await ProductService.deleteProduct(resolvedParams.id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
