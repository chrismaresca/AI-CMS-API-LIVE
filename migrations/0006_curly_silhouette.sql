ALTER TABLE "xml_blocks" ALTER COLUMN "description" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "xml_blocks" ALTER COLUMN "description" SET NOT NULL;