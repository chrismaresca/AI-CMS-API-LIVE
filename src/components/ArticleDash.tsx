"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// shadcn/ui components
import { Button } from "@/components/ui/button";

// Types
import { Brand } from "@/types/brands/brand.types";
import { Author } from "@/types/authors/author.types";
import { Tag } from "@/types/tags/tag.types";
import { ArticlePayload } from "@/types/articles/article.types";

// Components
import { ArticleEditor } from "@/components/articles/ArticleEditor";
import { ArticleMeta } from "@/components/articles/ArticleMeta";

// Actions
import { createArticleAction } from "@/actions/createArticle";
import { toast } from "@/hooks/use-toast";

interface ArticleFormProps {
  brand: Brand;
  authors: Author[];
  tags: Tag[];
  existingArticle?: ArticlePayload;
}

export default function ArticleForm({ brand, authors, tags, existingArticle }: ArticleFormProps) {
  const router = useRouter();
  const isEdit = !!existingArticle?.id;

  // Form state default values
  const [formData, setFormData] = useState({
    title: existingArticle?.title || "",
    excerpt: existingArticle?.excerpt || "",
    content: existingArticle?.content || "",
    images: [] as File[],
    authorId: existingArticle?.authorId || "",
    brandId: brand.id,
    tagIds: existingArticle?.tags.map((tag) => tag.tagId) || []
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.excerpt) newErrors.excerpt = "Excerpt is required";
    if (!formData.content) newErrors.content = "Content is required";
    if (!formData.authorId) newErrors.authorId = "Author is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await createArticleAction(formData);
      if (result.success) {
        toast({
          title: result.message,
          variant: "default"
        });
        router.push(`/${brand.id}`);
      } else {
        toast({
          title: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred. Please try again: " + error,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-6 min-h-screen">
      <Button variant="outline" onClick={() => router.push(`/${brand.id}`)} className="mb-6">
        ← Back to Articles
      </Button>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-[1fr,340px] gap-6">
        {/* Start of Article Editor */}
        <ArticleEditor 
          formData={formData}
          setFormData={setFormData}
          errors={errors}
        />
        {/* End of Article Editor */}

        {/* Start of Article Meta */}
        <ArticleMeta 
          formData={formData}
          setFormData={setFormData}
          brand={brand}
          authors={authors}
          tags={tags}
          isEdit={isEdit}
          errors={errors}
        />
        {/* End of Article Meta */}
      </form>
    </div>
  );
}
