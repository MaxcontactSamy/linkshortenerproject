# Authentication

---

## description: Read this file before implementing any authentication in the project.

## Rules

- ALL authentication is handled exclusively by **Clerk** (`@clerk/nextjs` v7). Never introduce any other auth library, custom session handling, or JWT implementation.
- Never use `pages/` router patterns (e.g. `getServerSideProps`) for auth — use App Router server components and Clerk's `auth()` helper.
- Never use `any` to bypass Clerk's typed return values.

---

## Protected Routes — Middleware

`/dashboard` is a protected route. Protection **must** be enforced in `middleware.ts` at the project root using `clerkMiddleware` and `createRouteMatcher`. Never rely on client-side redirects to guard protected routes.

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

## Homepage Redirect for Signed-In Users

If a signed-in user visits `/`, redirect them to `/dashboard` **server-side** inside `app/page.tsx`. Never do this with a client component or `useEffect`.

```tsx
// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  // render landing page for signed-out users
  return <main>{/* landing page content */}</main>;
}
```

---

## Sign-In / Sign-Up — Modal Only

Sign-in and sign-up must **always** open as a Clerk modal. Never create `app/(auth)/sign-in` or `app/(auth)/sign-up` route segments. Never use `<SignInButton>` without `mode="modal"`.

Use Clerk's `<SignedIn>` and `<SignedOut>` components to conditionally render auth buttons in the header.

```tsx
// components/header.tsx
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost">Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

---

## Summary of Constraints

| Requirement                       | Correct approach                                                       |
| --------------------------------- | ---------------------------------------------------------------------- |
| Protect `/dashboard`              | `clerkMiddleware` + `createRouteMatcher` in `middleware.ts`            |
| Redirect signed-in users from `/` | `auth()` server-side in `app/page.tsx`                                 |
| Sign-in / sign-up UI              | `<SignInButton mode="modal">` / `<SignUpButton mode="modal">`          |
| Separate auth pages               | **Never** — do not create `app/(auth)/sign-in` or `app/(auth)/sign-up` |
| Other auth libraries              | **Never** — Clerk only                                                 |
