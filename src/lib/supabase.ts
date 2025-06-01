
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kfmroiyqrrhsxhwmgztr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbXJvaXlxcnJoc3hod21nenRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTE0MDUsImV4cCI6MjA2Mzc2NzQwNX0.wlI3hSdUAypBDYozp_7DFrtwF6Y-WVLiZcRo8aYa_Do'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
