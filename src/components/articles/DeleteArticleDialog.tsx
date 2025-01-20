"use client";

import React, { useState } from "react";

// Dialog
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

// Button
import { Button } from "@/components/ui/button";

// Icons
import { Trash2Icon } from "lucide-react";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Actions
import { deleteArticleAction } from "@/actions/deleteArticle";

export default function DeleteArticleDialog({ articleId }: { articleId: string }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleArticleDelete = async (articleId: string) => {
    const response = await deleteArticleAction(articleId);
    if (response.success) {
      toast({ title: "Article deleted successfully", variant: "default" });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-8 w-8">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this article?</DialogTitle>
        </DialogHeader>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => handleArticleDelete(articleId)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
