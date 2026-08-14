import { NextResponse } from 'next/server';
import { registerSellerSchema } from '../../../../lib/validations';
import { generateToken } from '../../../../lib/auth';
import { UserRole } from '../../../../constants/roles';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSellerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { name, email, storeName, description, bankAccount } = parsed.data;

    const user = {
      id: `usr_seller_${Date.now()}`,
      email,
      name,
      role: UserRole.SELLER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sellerProfile = {
      id: `sel_${Date.now()}`,
      userId: user.id,
      storeName,
      description,
      bankAccount,
      status: 'VERIFIED',
    };

    const token = generateToken(user);

    return NextResponse.json({
      success: true,
      message: 'Seller store onboarding complete',
      user,
      sellerProfile,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Seller registration failed' }, { status: 500 });
  }
}
