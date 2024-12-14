CREATE TYPE "public"."publish_status" AS ENUM('draft', 'published');--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "publish_status" "publish_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "linkedin_posts" ADD COLUMN "publish_status" "publish_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "tweet_posts" ADD COLUMN "publish_status" "publish_status" DEFAULT 'draft' NOT NULL;