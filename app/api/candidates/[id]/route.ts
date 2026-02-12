import { NextRequest, NextResponse } from 'next/server';

import { mapCandidateRow } from '@/lib/candidate-mapper';
import { CANDIDATES_SEED } from '@/lib/candidates-seed';
import { createStableHash, getVoteSalt } from '@/lib/security';
import { hasSupabaseAdmin, supabaseAdmin } from '@/lib/supabase/admin';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!hasSupabaseAdmin || !supabaseAdmin) {
    const fallback = CANDIDATES_SEED.find((candidate) => candidate.id === id);

    if (!fallback) {
      return NextResponse.json({ message: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({
      candidate: {
        id: fallback.id,
        name: fallback.name,
        image: fallback.image,
        department: fallback.department,
        role: fallback.role,
        description: fallback.description,
        votes: fallback.vote_count,
        isTrending: !!fallback.is_trending,
        rank: fallback.rank || undefined,
        hasVoted: false,
        hasVotedAt: null,
      },
      warning: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
    });
  }

  const { data: candidate, error } = await supabaseAdmin
    .from('candidates')
    .select('id, name, image, department, role, description, vote_count, is_trending, rank')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!candidate) {
    return NextResponse.json({ message: 'Candidate not found' }, { status: 404 });
  }

  const salt = getVoteSalt();
  const deviceId = request.headers.get('x-device-id') || '';
  const deviceHash = deviceId && salt ? createStableHash(deviceId, salt) : '';

  const votedCandidateMap = new Map<string, string>();

  if (deviceHash) {
    const { data: vote } = await supabaseAdmin
      .from('votes')
      .select('created_at')
      .eq('candidate_id', id)
      .eq('device_hash', deviceHash)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (vote) {
      votedCandidateMap.set(id, vote.created_at);
    }
  }

  return NextResponse.json({
    candidate: mapCandidateRow(candidate, votedCandidateMap),
  });
}
