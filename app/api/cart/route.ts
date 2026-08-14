import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Cart sync state active',
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Item added to server cart state',
      item: body,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Cart operation failed' }, { status: 500 });
  }
}
