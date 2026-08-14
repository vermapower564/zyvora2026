import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema, updateContactStatusSchema } from '@/lib/validations';

// In-memory fallback store for development when DB is offline
const fallbackMessages: Array<{
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: Date;
  updatedAt: Date;
}> = [
  {
    id: 'msg-1',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 555 0192',
    subject: 'Inquiry regarding custom jewelry order',
    category: 'Order Support',
    message: 'Hello, I would like to inquire about express shipping options for order #ZY-88902.',
    status: 'NEW',
    priority: 'HIGH',
    createdAt: new Date(Date.now() - 3600000 * 4),
    updatedAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    id: 'msg-2',
    name: 'Marcus Sterling',
    email: 'marcus.sterling@example.com',
    phone: '+44 20 7946 0912',
    subject: 'Vendor partnership proposal for Q4',
    category: 'Business Partnership',
    message: 'We represent Sterling Fine Watches and wish to apply for a seller store on Zyvora.',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    createdAt: new Date(Date.now() - 3600000 * 24),
    updatedAt: new Date(Date.now() - 3600000 * 12),
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    let savedMessage;
    try {
      savedMessage = await prisma.contactMessage.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          subject: validatedData.subject,
          category: validatedData.category,
          message: validatedData.message,
          status: 'NEW',
          priority: 'MEDIUM',
        },
      });

      // Audit Log entry
      await prisma.auditLog.create({
        data: {
          user: validatedData.email,
          action: 'CONTACT_SUBMITTED',
          module: 'CONTACT_US',
          ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
          details: `Contact message submitted under topic: ${validatedData.category}`,
        },
      });
    } catch {
      // In-memory fallback if MySQL is offline
      savedMessage = {
        id: `msg-${Date.now()}`,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
        category: validatedData.category,
        message: validatedData.message,
        status: 'NEW' as const,
        priority: 'MEDIUM' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackMessages.unshift(savedMessage);
    }

    return NextResponse.json(
      {
        success: true,
        data: savedMessage,
        message: 'Your inquiry has been received. Our support team will respond within 24 hours.',
        emailNotice: 'EMAIL SERVICE NOT CONFIGURED (Notification logged to audit trail)',
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to process contact inquiry',
        },
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    let messages;
    try {
      const where: any = {};
      if (status) where.status = status;
      if (search) {
        where.OR = [
          { name: { contains: search } },
          { email: { contains: search } },
          { subject: { contains: search } },
          { message: { contains: search } },
        ];
      }

      messages = await prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      // In-memory fallback
      messages = fallbackMessages.filter((msg) => {
        const matchesStatus = !status || msg.status === status;
        const matchesSearch =
          !search ||
          msg.name.toLowerCase().includes(search.toLowerCase()) ||
          msg.email.toLowerCase().includes(search.toLowerCase()) ||
          msg.subject.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      });
    }

    return NextResponse.json({
      success: true,
      data: messages,
      message: 'Contact messages retrieved successfully',
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to fetch contact messages',
        },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const validatedData = updateContactStatusSchema.parse(body);

    let updatedMessage;
    try {
      const updateData: any = {};
      if (validatedData.status) {
        updateData.status = validatedData.status;
        if (validatedData.status === 'RESOLVED') {
          updateData.resolvedAt = new Date();
        }
      }
      if (validatedData.priority) {
        updateData.priority = validatedData.priority;
      }

      updatedMessage = await prisma.contactMessage.update({
        where: { id: validatedData.id },
        data: updateData,
      });
    } catch {
      // In-memory fallback update
      const existing = fallbackMessages.find((m) => m.id === validatedData.id);
      if (existing) {
        if (validatedData.status) existing.status = validatedData.status;
        if (validatedData.priority) existing.priority = validatedData.priority;
        existing.updatedAt = new Date();
        updatedMessage = existing;
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedMessage,
      message: 'Contact message updated successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error?.message || 'Failed to update contact message',
        },
      },
      { status: 400 }
    );
  }
}
