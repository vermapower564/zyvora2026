import { NextResponse } from 'next/server';
import { registerCustomerSchema } from '../../../../lib/validations';
import { generateToken } from '../../../../lib/auth';
import { UserRole } from '../../../../constants/roles';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerCustomerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { name, email, phone } = parsed.data;

    const user = {
      id: `usr_${Date.now()}`,
      email,
      name,
      phone,
      role: UserRole.CUSTOMER,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = generateToken(user);

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      user,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
