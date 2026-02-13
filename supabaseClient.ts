import { createClient } from '@supabase/supabase-js';

// Credenciais fornecidas
const SUPABASE_URL = 'https://bawoqbxgwvkdvrfgpklt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TEmEz5g5BpQ_bRhEGnKsYw_rkLlQAt4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);