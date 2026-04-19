import {
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { BarChart3, Link2, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Fast URL shortening",
    description:
      "Create clean short links in seconds and share them anywhere.",
    icon: Link2,
  },
  {
    title: "Secure access",
    description:
      "Built-in Clerk authentication keeps your links and account protected.",
    icon: ShieldCheck,
  },
  {
    title: "Performance insights",
    description:
      "Track engagement and understand which links bring the most traffic.",
    icon: BarChart3,
  },
] as const;

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-16 sm:px-10 lg:px-16">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Link Shortener
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Shorten links, share instantly, and grow with confidence
        </h1>
        <p className="text-lg text-muted-foreground">
          A simple platform to create, manage, and track short links for your
          campaigns and content.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg">Get started for free</Button>
          </SignUpButton>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {features.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-xl border bg-card p-6">
            <Icon className="mb-4 size-5 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
