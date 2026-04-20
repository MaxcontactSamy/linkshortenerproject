"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "./actions";

interface EditLinkDialogProps {
    link: { id: number; url: string; slug: string };
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(link.url);
    const [slug, setSlug] = useState(link.slug);
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (open) {
            setUrl(link.url);
            setSlug(link.slug);
            setError(null);
        }
    }, [open, link.url, link.slug]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setPending(true);

        const result = await updateLinkAction({ id: link.id, url, slug });
        setPending(false);

        if (result.error) {
            setError(result.error);
        } else {
            setOpen(false);
        }
    }

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Edit link">
                <Pencil />
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Link</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor={`edit-url-${link.id}`}>Destination URL</Label>
                            <Input
                                id={`edit-url-${link.id}`}
                                type="url"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor={`edit-slug-${link.id}`}>Slug</Label>
                            <Input
                                id={`edit-slug-${link.id}`}
                                type="text"
                                placeholder="my-link"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Lowercase letters, numbers, and hyphens only.
                            </p>
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <DialogFooter>
                            <Button type="submit" disabled={pending}>
                                {pending ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
