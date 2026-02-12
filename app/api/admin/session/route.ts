import { NextRequest, NextResponse } from 'next/server';

import { getAdminSessionFromRequest, isAdminConfigured } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json({
      authenticated: false,
      configured: false,
      message:
        'Admin login is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.',
    });
  }

  const session = getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ authenticated: false, configured: true });
  }

  return NextResponse.json({
    authenticated: true,
    configured: true,
    username: session.username,
  });
}
