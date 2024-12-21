ALTER TABLE "public"."xml_block_parameters" ALTER COLUMN "data_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."ts_data_type";--> statement-breakpoint
CREATE TYPE "public"."ts_data_type" AS ENUM('text', 'integer', 'array', 'object', 'boolean', 'null');--> statement-breakpoint
ALTER TABLE "public"."xml_block_parameters" ALTER COLUMN "data_type" SET DATA TYPE "public"."ts_data_type" USING "data_type"::"public"."ts_data_type";