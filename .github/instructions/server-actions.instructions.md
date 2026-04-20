---
description: Standards for writing server actions in this Next.js App Router project. Apply when creating or modifying server actions, data mutations, or form submissions.
---

# Server Actions

## File Structure

- Server action files **must** be named `actions.ts` and colocated in the same directory as the client component that calls them.
- Server actions **must** be called from client components only.

```
app/dashboard/
  page.tsx          ← client component
  actions.ts        ← server actions for this feature
```

## TypeScript

- All data passed to server actions must have explicit TypeScript types.
- **Never** use the `FormData` TypeScript type for server action parameters.

## Validation

- All inputs **must** be validated using [Zod](https://zod.dev) before any business logic or database operations.

## Authentication

- Every server action **must** verify a logged-in user (via Clerk) as its **first step**, before any database operations.

## Error Handling

- Server actions **must never throw errors**.
- Instead, return an object with either a `success` or `error` property.

```ts
// ✅ correct
return { success: true };
return { error: "Unauthorized" };

// ❌ wrong
throw new Error("Unauthorized");
```

## Database Access

- **Never** use Drizzle queries directly inside server actions.
- All database operations must go through helper functions located in the `/data` directory.

## Example Structure

```ts
"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLink } from "@/data/links";

const schema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

export async function createLinkAction(input: { url: string; slug: string }) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await createLink({ ...parsed.data, userId });
  return { success: true };
}
```
