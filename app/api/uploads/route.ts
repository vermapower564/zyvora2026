import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Simulated cloud storage upload (AWS S3 / Cloudinary)
    const mockImageUrls = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
    ];

    const randomUrl = mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)];

    return NextResponse.json({
      success: true,
      url: randomUrl,
      publicId: `cloud_img_${Date.now()}`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
