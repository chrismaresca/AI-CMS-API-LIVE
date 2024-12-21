CREATE TYPE "public"."ts_data_type" AS ENUM('text', 'integer', 'array', 'enum', 'object', 'boolean', 'null');--> statement-breakpoint
CREATE TABLE "brand_xml_blocks" (
	"brand_id" uuid NOT NULL,
	"xml_block_id" uuid NOT NULL,
	CONSTRAINT "brand_xml_blocks_brand_id_xml_block_id_pk" PRIMARY KEY("brand_id","xml_block_id")
);
--> statement-breakpoint
CREATE TABLE "xml_block_parameters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"xml_block_id" uuid NOT NULL,
	"name" text NOT NULL,
	"ts_name" text GENERATED ALWAYS AS ("xml_block_parameters"."name") STORED NOT NULL,
	"required" boolean DEFAULT false NOT NULL,
	"description" text,
	"data_type" "ts_data_type" NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "xml_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ts_name" text GENERATED ALWAYS AS ("xml_blocks"."name") STORED NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now(),
	CONSTRAINT "xml_blocks_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "article_tags" DROP CONSTRAINT "article_tags_tag_id_brand_id_brand_tags_tag_id_brand_id_fk";
--> statement-breakpoint
ALTER TABLE "brand_xml_blocks" ADD CONSTRAINT "brand_xml_blocks_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_xml_blocks" ADD CONSTRAINT "brand_xml_blocks_xml_block_id_xml_blocks_id_fk" FOREIGN KEY ("xml_block_id") REFERENCES "public"."xml_blocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xml_block_parameters" ADD CONSTRAINT "xml_block_parameters_xml_block_id_xml_blocks_id_fk" FOREIGN KEY ("xml_block_id") REFERENCES "public"."xml_blocks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "xml_block_parameters_xml_block_id_ts_name_unique_idx" ON "xml_block_parameters" USING btree ("xml_block_id","ts_name");--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_brand_id_tag_id_brand_tags_brand_id_tag_id_fk" FOREIGN KEY ("brand_id","tag_id") REFERENCES "public"."brand_tags"("brand_id","tag_id") ON DELETE no action ON UPDATE no action;