// Fill these in from your Supabase project: Project Settings > API.
// The anon/public key is safe to expose in client-side code — it only grants
// what the Row Level Security policies in supabase-schema.sql allow.
const SUPABASE_URL = 'https://upjcknjkzfhvejpdkaez.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_cNiWDY4XA4hPdpfpHrJ1hQ_IkV6Vegc';

// Which "continue with ..." buttons the auth modal offers, in this order. Add a provider here
// ONLY after enabling it in Supabase > Authentication > Providers and pasting its client id and
// secret there: a provider that is listed but not enabled answers with "Unsupported provider",
// so the button would be a dead control in front of every visitor. The secret stays in Supabase
// and never in this repo, which is why nothing here is sensitive.
//
// Known to this site: 'google', 'facebook', 'line'. The first two are built into Supabase. LINE
// is NOT in Supabase's built-in provider list -- check the dashboard before adding it; if it is
// absent there it needs a custom OIDC route rather than this switch.
//
// Adding a provider also means naming it in privacy.html's "Who it's shared with" section.
const OAUTH_PROVIDERS = [];
