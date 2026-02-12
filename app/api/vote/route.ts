import { NextRequest, NextResponse } from 'next/server';

import { createStableHash, extractClientIp, getVoteSalt } from '@/lib/security';
import { hasSupabaseAdmin, supabaseAdmin } from '@/lib/supabase/admin';

interface VoteRpcRow {
  status: string;
  message: string;
  vote_count: number;
  voted_at: string;
}

export async function POST(request: NextRequest) {
  if (!hasSupabaseAdmin || !supabaseAdmin) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Voting backend is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      },
      { status: 503 }
    );
  }

  const salt = getVoteSalt();
  if (!salt) {
    return NextResponse.json(
      {
        ok: false,
        message: 'VOTE_HASH_SALT is missing on the server.',
      },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const candidateId = body?.candidateId as string | undefined;

  if (!candidateId) {
    return NextResponse.json({ ok: false, message: 'candidateId is required.' }, { status: 400 });
  }

  const deviceId = request.headers.get('x-device-id');
  if (!deviceId) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Device ID is required for vote protection.',
      },
      { status: 400 }
    );
  }

  const ipAddress = extractClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  const deviceHash = createStableHash(deviceId, salt);
  const ipHash = createStableHash(ipAddress, salt);
  const uaHash = createStableHash(userAgent, salt);

  const { data, error } = await supabaseAdmin.rpc('cast_vote', {
    p_candidate_id: candidateId,
    p_device_hash: deviceHash,
    p_ip_hash: ipHash,
    p_ua_hash: uaHash,
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  const result = (data?.[0] || null) as VoteRpcRow | null;

  if (!result) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Vote failed due to an unexpected backend response.',
      },
      { status: 500 }
    );
  }

  const isOk = result.status === 'ok';

  return NextResponse.json(
    {
      ok: isOk,
      status: result.status,
      message: result.message,
      votes: result.vote_count,
      hasVoted: isOk || result.status === 'already_voted',
      hasVotedAt: result.voted_at || new Date().toISOString(),
    },
    {
      status:
        isOk
          ? 200
          : result.status === 'already_voted' ||
              result.status === 'rate_limited' ||
              result.status === 'cooldown_limited' ||
              result.status === 'device_limited' ||
              result.status === 'ip_limited'
            ? 429
            : 400,
    }
  );
}
