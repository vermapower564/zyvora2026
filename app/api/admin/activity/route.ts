import { NextResponse } from 'next/server';
import { ActivityService } from '@/services/activity.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const actorRole = searchParams.get('actorRole') || undefined;
    const actorId = searchParams.get('actorId') || undefined;
    const module = searchParams.get('module') || undefined;

    const activities = await ActivityService.getActivities({
      actorRole,
      actorId,
      module,
    });

    return NextResponse.json({
      success: true,
      data: activities,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'SERVER_ERROR', message: 'Failed to fetch activity logs' },
      },
      { status: 500 }
    );
  }
}
