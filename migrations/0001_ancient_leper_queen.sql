ALTER TABLE "tags" RENAME COLUMN "description" TO "seo_description";--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "ai_description" text DEFAULT '';