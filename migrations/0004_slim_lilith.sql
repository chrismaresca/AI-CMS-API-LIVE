ALTER TABLE "articles" ALTER COLUMN "date_updated" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "date_updated" DROP DEFAULT;