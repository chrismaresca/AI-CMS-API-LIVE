ALTER TABLE "brands" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "url" text;--> statement-breakpoint
ALTER TABLE "brands" ADD COLUMN "founder" text DEFAULT 'Chris Maresca';--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "description" text DEFAULT '';