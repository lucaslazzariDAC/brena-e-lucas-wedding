// Deprecated: this wrapper depended on @lovable.dev/cloud-auth-js, which talks to
// Lovable Cloud's OAuth proxy and only works inside a Lovable-hosted project.
// Now that the app runs on its own Supabase project, Google sign-in uses
// supabase.auth.signInWithOAuth({ provider: "google" }) directly — see
// src/routes/auth.tsx. This file is no longer imported anywhere and is kept
// only as a placeholder; it's safe to delete.
export {};
