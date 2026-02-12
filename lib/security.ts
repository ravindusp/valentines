import { createHash } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const getVoteSalt = () => process.env.VOTE_HASH_SALT || '';

export const createStableHash = (value: string, salt: string) => {
  return createHash('sha256').update(`${value}:${salt}`).digest('hex');
};

export const extractClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || '0.0.0.0';
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return '0.0.0.0';
};
