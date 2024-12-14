ALTER TYPE "public"."publish_status" ADD VALUE 'in-review' BEFORE 'published';--> statement-breakpoint
ALTER TYPE "public"."publish_status" ADD VALUE 'scheduled' BEFORE 'published';--> statement-breakpoint
ALTER TYPE "public"."publish_status" ADD VALUE 'archived';