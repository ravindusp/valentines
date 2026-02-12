import { NextResponse } from 'next/server';

import {
  applyAdminSessionCookie,
  isAdminConfigured,
  issueAdminSession,
  validateAdminCredentials,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Admin login is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.',
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = body?.username?.toString().trim();
  const password = body?.password?.toString() || '';

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, message: 'Username and password are required.' },
      { status: 400 }
    );
  }

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ ok: false, message: 'Invalid credentials.' }, { status: 401 });
  }

  const token = issueAdminSession(username);
  const response = NextResponse.json({ ok: true, username });
  applyAdminSessionCookie(response, token);
  return response;
}
