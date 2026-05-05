import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalConversations = conversations.length;
    const totalMessages = conversations.reduce((acc, conv) => acc + conv.messages.length, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const conversationsToday = conversations.filter((c) => new Date(c.createdAt) >= today).length;

    return NextResponse.json({
      conversations,
      stats: {
        totalConversations,
        totalMessages,
        conversationsToday,
      },
    });
  } catch (error) {
    console.error('[Admin API] Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}
