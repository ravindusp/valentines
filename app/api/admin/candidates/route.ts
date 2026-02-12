import { NextRequest, NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/admin-api';
import { mapCandidateRow } from '@/lib/candidate-mapper';
import { hasSupabaseAdmin, supabaseAdmin } from '@/lib/supabase/admin';

const CANDIDATE_SELECT =
  'id, name, image, department, role, description, vote_count, is_trending, rank';

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return auth.response;
  }

  if (!hasSupabaseAdmin || !supabaseAdmin) {
    return NextResponse.json(
      { message: 'Supabase admin is not configured.' },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('candidates')
    .select(CANDIDATE_SELECT)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ candidates: (data || []).map((row) => mapCandidateRow(row)) });
}

export async function POST(request: NextRequest) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return auth.response;
  }

  if (!hasSupabaseAdmin || !supabaseAdmin) {
    return NextResponse.json(
      { message: 'Supabase admin is not configured.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);

  const name = body?.name?.toString().trim() || '';
  const image = body?.image?.toString().trim() || '';
  const department = body?.department?.toString().trim() || '';
  const role = body?.role?.toString().trim() || '';
  const description = body?.description?.toString().trim() || '';
  const rankInput = body?.rank;
  const rank = rankInput === '' || rankInput === null || rankInput === undefined ? null : Number(rankInput);
  const voteCountInput = body?.votes;
  const voteCount = Number.isFinite(Number(voteCountInput)) ? Math.max(0, Number(voteCountInput)) : 0;
  const isTrending = Boolean(body?.isTrending);

  if (!name || !image || !department || !role || !description) {
    return NextResponse.json(
      { message: 'name, image, department, role, and description are required.' },
      { status: 400 }
    );
  }

  if (rank !== null && (!Number.isFinite(rank) || rank < 1)) {
    return NextResponse.json({ message: 'rank must be a positive number.' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('candidates')
    .insert({
      name,
      image,
      department,
      role,
      description,
      is_trending: isTrending,
      vote_count: voteCount,
      rank,
    })
    .select(CANDIDATE_SELECT)
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    message: 'Candidate created successfully.',
    candidate: mapCandidateRow(data),
  });
}
