import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionFromRequest, isAdminConfigured } from '@/lib/admin-auth';

export const requireAdmin = (request: NextRequest) => {
  if (!isAdminConfigured()) {
    return {
      ok: false as const,
      response: NextResponse.json(
        {
          message:
            'Admin login is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.',
        },
        { status: 503 }
      ),
    };
  }

  const session = getAdminSessionFromRequest(request);

  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ message: 'Unauthorized.' }, { status: 401 }),
    };
  }

  return {
    ok: true as const,
    session,
  };
};
