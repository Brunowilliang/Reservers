import AsyncStorage from  "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xitnbbkmgwrokvihbhlw.supabase.co";
const SUPABASE_APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdG5iYmttZ3dyb2t2aWhiaGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU1MjM1NzUsImV4cCI6MTk4MTA5OTU3NX0.B0wkgPyM-637qO78xQwFP-R--N8Z8VVEmY9rKCdAx9o";
const SUPABASE_PRIVATEKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdG5iYmttZ3dyb2t2aWhiaGx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NTUyMzU3NSwiZXhwIjoxOTgxMDk5NTc1fQ.ORTbGF6ZYU-NhwSysgfNiaJOPnJw_sPBr_KbEf1v-qs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_APIKEY, {
    localStorage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  });