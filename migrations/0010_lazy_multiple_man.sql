DROP INDEX "articles_slug_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug","brand_id");