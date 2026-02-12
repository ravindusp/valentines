import { NextRequest, NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/admin-api';
import { hasSupabaseAdmin, supabaseAdmin } from '@/lib/supabase/admin';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const BUCKET_NAME = 'candidate-images';

const sanitizeFilename = (value: string) => {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '')
    .slice(0, 120);
};

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

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: 'Image file is required.' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ message: 'Only image uploads are allowed.' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json(
      { message: 'Image must be smaller than 8MB.' },
      { status: 400 }
    );
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
  const baseName = sanitizeFilename(file.name.replace(/\.[^/.]+$/, '')) || 'candidate';
  const path = `${Date.now()}-${baseName}.${extension}`;

  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return NextResponse.json({
    message: 'Image uploaded.',
    path: data.path,
    imageUrl: urlData.publicUrl,
  });
}
