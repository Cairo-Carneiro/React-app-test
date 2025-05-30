import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://obxyggeqwvestmhhsdnj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieHlnZ2Vxd3Zlc3RtaGhzZG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NzU0NTksImV4cCI6MjA2NDE1MTQ1OX0.i8cjt-qrDNeN0J81Tl3ibVskEA-RDYOD68jEmGgl2NA";

export const supabase = createClient(supabaseUrl, supabaseKey);
