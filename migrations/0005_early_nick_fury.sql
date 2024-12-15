ALTER TABLE "brands" ALTER COLUMN "date_updated" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "date_updated" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "date_updated" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "date_updated" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "tweet_posts" ALTER COLUMN "date_updated" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "tweet_posts" ALTER COLUMN "date_updated" DROP DEFAULT;