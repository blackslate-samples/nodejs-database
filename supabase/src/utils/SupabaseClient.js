import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fmrmivqmalmptcfehbif.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtcm1pdnFtYWxtcHRjZmVoYmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwNTM4NTAsImV4cCI6MjAwNTYyOTg1MH0.sBGiL11JA2y4bNB3VE6TwT0DR59dpsXcihaHD6oHenE";
export const supabase = createClient(supabaseUrl, supabaseKey);
