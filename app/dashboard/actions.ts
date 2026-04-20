"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createLink, deleteLink, updateLink } from "@/data/links";

const schema = z.object({
    url: z.string().url("Please enter a valid URL"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(50, "Slug must be 50 characters or fewer")
        .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
});

export async function createLinkAction(input: { url: string; slug: string }) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const parsed = schema.safeParse(input);
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await createLink({ ...parsed.data, userId });
    revalidatePath("/dashboard");
    return { success: true };
}

export async function updateLinkAction(input: { id: number; url: string; slug: string }) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const idParsed = z.number().int().positive().safeParse(input.id);
    if (!idParsed.success) return { error: "Invalid link ID" };

    const parsed = schema.safeParse({ url: input.url, slug: input.slug });
    if (!parsed.success) return { error: parsed.error.issues[0].message };

    await updateLink(idParsed.data, userId, parsed.data);
    revalidatePath("/dashboard");
    return { success: true };
}

export async function deleteLinkAction(input: { id: number }) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const idParsed = z.number().int().positive().safeParse(input.id);
    if (!idParsed.success) return { error: "Invalid link ID" };

    await deleteLink(idParsed.data, userId);
    revalidatePath("/dashboard");
    return { success: true };
}
