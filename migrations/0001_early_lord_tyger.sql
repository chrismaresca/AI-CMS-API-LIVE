ALTER TABLE "authors" ALTER COLUMN "date_updated" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "authors" ALTER COLUMN "date_updated" SET DEFAULT now();