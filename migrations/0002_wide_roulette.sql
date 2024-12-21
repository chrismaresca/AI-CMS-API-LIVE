ALTER TABLE "articles" ALTER COLUMN "date_updated" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "date_updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "date_updated" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "date_updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "linkedin_posts" ALTER COLUMN "date_updated" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "linkedin_posts" ALTER COLUMN "date_updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "date_updated" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "tags" ALTER COLUMN "date_updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tweet_posts" ALTER COLUMN "date_updated" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "tweet_posts" ALTER COLUMN "date_updated" SET DEFAULT now();