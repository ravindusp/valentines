import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest, NextResponse } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'vq_admin_session';
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

interface AdminSessionPayload {
  username: string;
  exp: number;
}

const isPlaceholderValue = (value?: string) => {
  if (!value) {
    return true;
  }

  return (
    value.includes('YOUR_') ||
    value.includes('REPLACE_WITH') ||
    value.includes('CHANGE_ME')
  );
};

const getAdminEnv = () => {
  return {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.ADMIN_SESSION_SECRET,
  };
};

const signTokenPart = (part: string, secret: string) => {
  return createHmac('sha256', secret).update(part).digest('base64url');
};

const encodePayload = (payload: AdminSessionPayload) => {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
};

const decodePayload = (raw: string): AdminSessionPayload | null => {
  try {
    return JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as AdminSessionPayload;
  } catch {
    return null;
  }
};

export const isAdminConfigured = () => {
  const env = getAdminEnv();

  return (
    !isPlaceholderValue(env.username) &&
    !isPlaceholderValue(env.password) &&
    !isPlaceholderValue(env.sessionSecret)
  );
};

export const validateAdminCredentials = (username: string, password: string) => {
  const env = getAdminEnv();

  if (!isAdminConfigured()) {
    return false;
  }

  return username === env.username && password === env.password;
};

export const issueAdminSession = (username: string) => {
  const { sessionSecret } = getAdminEnv();
  if (!sessionSecret || isPlaceholderValue(sessionSecret)) {
    throw new Error('Admin session secret is missing.');
  }

  const payload: AdminSessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS,
  };

  const encodedPayload = encodePayload(payload);
  const signature = signTokenPart(encodedPayload, sessionSecret);
  return `${encodedPayload}.${signature}`;
};

export const verifyAdminSession = (token?: string | null) => {
  const { sessionSecret } = getAdminEnv();

  if (!token || !sessionSecret || isPlaceholderValue(sessionSecret)) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split('.');
  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = signTokenPart(encodedPayload, sessionSecret);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }

  const payload = decodePayload(encodedPayload);
  if (!payload || !payload.username || !payload.exp) {
    return null;
  }

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
};

export const getAdminSessionFromRequest = (request: NextRequest) => {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSession(token);
};

export const applyAdminSessionCookie = (response: NextResponse, token: string) => {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
};

export const clearAdminSessionCookie = (response: NextResponse) => {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  });
};
