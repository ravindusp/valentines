import { NextRequest, NextResponse } from 'next/server';

import { mapCandidateRow } from '@/lib/candidate-mapper';
import { createStableHash, getVoteSalt } from '@/lib/security';
import { hasSupabaseAdmin, supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get('limit');
  const parsedLimit = limitParam ? Number(limitParam) : undefined;
  const limit = Number.isFinite(parsedLimit) && parsedLimit ? Math.max(1, parsedLimit) : undefined;

  if (!hasSupabaseAdmin || !supabaseAdmin) {
    return NextResponse.json(
      {
        message:
          'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      },
      { status: 503 }
    );
  }

  const salt = getVoteSalt();
  const deviceId = request.headers.get('x-device-id') || '';
  const deviceHash = deviceId && salt ? createStableHash(deviceId, salt) : '';

  let query = supabaseAdmin
    .from('candidates')
    .select('id, name, image, department, role, description, vote_count, is_trending, rank')
    .order('vote_count', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: candidates, error } = await query;

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const votedCandidateMap = new Map<string, string>();

  if (deviceHash) {
    const { data: recentVotes, error: votesError } = await supabaseAdmin
      .from('votes')
      .select('candidate_id, created_at')
      .eq('device_hash', deviceHash)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    if (!votesError && recentVotes) {
      for (const vote of recentVotes) {
        if (!votedCandidateMap.has(vote.candidate_id)) {
          votedCandidateMap.set(vote.candidate_id, vote.created_at);
        }
      }
    }
  }

  return NextResponse.json({
    candidates: (candidates || []).map((row) => mapCandidateRow(row, votedCandidateMap)),
  });
}
