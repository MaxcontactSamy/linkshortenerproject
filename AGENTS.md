<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Non-Negotiable Rules

- Never use the Next.js `pages/` router — this project uses the App Router exclusively.
- Never bypass Clerk authentication on protected routes.
- Never write raw SQL — use Drizzle ORM with the schema defined in `db/schema.ts`.
- Never use `any` in TypeScript without an explicit comment explaining why.
- Always use the `cn()` utility from `@/lib/utils` for conditional class merging.
