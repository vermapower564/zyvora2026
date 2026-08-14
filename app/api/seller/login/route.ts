import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { generateToken } from '@/lib/auth';
import { UserRole } from '@/types/user';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { identifier } = parsed.data;

    const user = {
      id: 'usr_seller_api_1',
      email: identifier.includes('@') ? identifier : `${identifier}@zyvora.in`,
      name: 'Aura Sound Vendor Admin',
      role: UserRole.SELLER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = generateToken(user);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
