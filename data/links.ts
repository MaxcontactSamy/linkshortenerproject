import { db } from "@/db";
import { links, InsertLink, SelectLink } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string): Promise<SelectLink[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLink(
  data: Omit<InsertLink, "id" | "createdAt" | "updatedAt">,
): Promise<SelectLink> {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function updateLink(
  id: number,
  userId: string,
  data: { url: string; slug: string },
): Promise<SelectLink> {
  const [link] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLink(id: number, userId: string): Promise<void> {
  await db.delete(links).where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkBySlug(
  slug: string,
): Promise<SelectLink | undefined> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.slug, slug))
    .limit(1);
  return link;
}
