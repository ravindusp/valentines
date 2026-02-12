import { NextRequest, NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/admin-api';
import { hasSupabaseAdmin, supabaseAdmin } from '@/lib/supabase/admin';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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

  const { id } = await context.params;

  const { error } = await supabaseAdmin.from('candidates').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Candidate removed.' });
}
