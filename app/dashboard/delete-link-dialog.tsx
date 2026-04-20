"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteLinkAction } from "./actions";

interface DeleteLinkDialogProps {
    id: number;
    slug: string;
}

export function DeleteLinkDialog({ id, slug }: DeleteLinkDialogProps) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    async function handleDelete() {
        setPending(true);
        await deleteLinkAction({ id });
        setPending(false);
        setOpen(false);
    }

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Delete link">
                <Trash2 className="text-destructive" />
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Link</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete{" "}
                        <span className="font-mono font-medium text-foreground">{slug}</span>? This
                        action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={pending}>
                            {pending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
