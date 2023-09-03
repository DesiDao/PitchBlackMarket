import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let storage;

if (typeof window !== 'undefined') {
  // Check if we are on the client-side in the browser
  storage = window.localStorage;
} else {
  // Use a fallback for server-side rendering (if needed)
  storage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  },
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
});

export default supabase;
