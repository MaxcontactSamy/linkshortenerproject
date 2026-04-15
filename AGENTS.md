<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Link Shortener — Agent Instructions

> **All coding standards, conventions, and architectural rules for this project are documented in the `/docs` directory.**
Always refer to the relvent .md file BEFORE generating any code
> You MUST read the relevant docs before writing or modifying any code.

## Required Reading by Task

| Task area | Doc to read first |
|---|---|
| Authentication, protected routes, sign-in/sign-up UI | [docs/auth.md](docs/auth.md) |
| UI components, forms, buttons, inputs, dialogs | [docs/ui-components.md](docs/ui-components.md) |

## Non-Negotiable Rules

- Never install a new dependency without checking [docs/tech-stack.md](docs/tech-stack.md) first.
- Never use the Next.js `pages/` router — this project uses the App Router exclusively.
- Never bypass Clerk authentication on protected routes.
- Never write raw SQL — use Drizzle ORM with the schema defined in `db/schema.ts`.
- Never use `any` in TypeScript without an explicit comment explaining why.
- Always use the `cn()` utility from `@/lib/utils` for conditional class merging.
