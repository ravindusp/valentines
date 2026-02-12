import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isPlaceholderValue = (value?: string) => {
  if (!value) {
    return true;
  }

  return (
    value.includes('YOUR_PROJECT_REF') ||
    value.includes('YOUR_SUPABASE') ||
    value.includes('REPLACE_WITH')
  );
};

export const hasSupabaseAdmin =
  Boolean(supabaseUrl && supabaseServiceRoleKey) &&
  !isPlaceholderValue(supabaseUrl) &&
  !isPlaceholderValue(supabaseServiceRoleKey);

export const supabaseAdmin = hasSupabaseAdmin
  ? createClient(supabaseUrl as string, supabaseServiceRoleKey as string, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
