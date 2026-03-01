import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function verifyAuth(req) {
  // CSRF Protection: Basic Origin/Referer Check
  const origin = req.headers.get("origin") || req.headers.get("referer");
  const allowedHost = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  if (origin && !origin.startsWith(allowedHost)) {
    return { user: null, error: "Potential CSRF detected" };
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { user: null, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.split(" ")[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { user: null, error: error?.message || "Unauthorized" };
  }

  return { user, error: null };
}
