import { z } from "zod";

// Schemas
export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  images: z.string().array().optional(),
  authorId: z.string().min(1, "Author is required"),
  brandId: z.string().min(1, "Brand is required"),
  tagIds: z.array(z.string()).optional().default([]),
});

export const updateArticleSchema = createArticleSchema.partial();

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;

export const createArticleFormDefaultValues = {
  title: "",
  excerpt: "",
  content: "",
  images: [],
  authorId: "",
  brandId: "",
  tagIds: [],
};
