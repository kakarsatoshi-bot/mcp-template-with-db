# Setup Guide

## Prerequisites

- Node.js 18+
- Cloudflare account (free)
- Supabase account (free)
- GitHub account

## Steps

### 1. Clone the repository

Click "Use this template" to create your own repository, then clone it.

```bash
git clone https://github.com/your-account/your-repo-name
cd your-repo-name
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API and note:
   - Project URL
   - anon public key

### 3. Set environment variables

Create `.dev.vars` for local development:

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
```

### 4. Customize

Edit these files:

| File | What to change |
|---|---|
| `wrangler.toml` | Change `name` to your server name |
| `src/index.ts` | Rename `MyMcpAgent` to your server name |
| `src/tools/sample_search.ts` | Change table name and column names |

### 5. Deploy

```bash
# Login to Cloudflare
npx wrangler login

# Set secrets
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY

# Deploy
npx wrangler deploy
```

Your MCP server URL will be:

```
https://your-server-name.your-account.workers.dev/mcp
```

### 6. Test

```bash
curl https://your-server-name.your-account.workers.dev/health
```

### 7. Register on Smithery

1. Log in to [smithery.ai](https://smithery.ai)
2. Click "Publish a server" and enter your URL
3. Set visibility to public

## Common Issues

### Claude Desktop doesn't recognize the MCP server

Current Claude Desktop only supports remote MCP (URL-based).
Local config files (claude_desktop_config.json) are not supported.
Always deploy to Cloudflare Workers and connect via URL.

### Can't connect to Supabase after deployment

Check:

1. Did you run `npx wrangler secret put SUPABASE_URL`?
2. Did you run `npx wrangler secret put SUPABASE_ANON_KEY`?
3. Did you run `npx wrangler deploy` again after setting secrets?

### wrangler deploy fails

Make sure the `name` in `wrangler.toml` and the class name `MyMcpAgent` in `src/index.ts`
match the `class_name` in `wrangler.toml`.
