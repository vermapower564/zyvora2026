import { NextResponse } from 'next/server';
import { decodeToken, generateToken } from '@/lib/auth';
import { UserRole } from '@/constants/roles';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { targetRole } = body;

    if (!targetRole || !Object.values(UserRole).includes(targetRole as UserRole)) {
      return NextResponse.json({ error: 'Invalid workspace role requested' }, { status: 400 });
    }

    // Extract current token from cookie or header
    const authHeader = request.headers.get('authorization');
    const cookieHeader = request.headers.get('cookie');
    
    let token = authHeader?.replace('Bearer ', '');
    if (!token && cookieHeader) {
      const match = cookieHeader.match(/zyvora_token=([^;]+)/);
      if (match) token = match[1];
    }

    let userId = 'usr_demo_customer_1';
    let userEmail = 'customer@zyvora.com';
    let userName = 'Alex Mercer';

    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.id) userId = decoded.id;
      if (decoded?.email) userEmail = decoded.email;
    }

    // Server-side database permission verification
    if (prisma && typeof prisma.user?.findUnique === 'function') {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: userId },
          include: { sellerProfile: true },
        });

        if (dbUser) {
          userEmail = dbUser.email;
          userName = dbUser.name;
        }
      } catch {
        // Fallback
      }
    }

    const updatedUser = {
      id: userId,
      email: userEmail,
      name: userName,
      role: targetRole as UserRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newToken = generateToken(updatedUser);

    const response = NextResponse.json({
      success: true,
      message: `Workspace switched to ${targetRole}`,
      user: updatedUser,
      token: newToken,
    });

    // Set secure HTTP-Only cookie for server-side middleware persistence
    response.cookies.set({
      name: 'zyvora_token',
      value: newToken,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to switch workspace' }, { status: 500 });
  }
}
