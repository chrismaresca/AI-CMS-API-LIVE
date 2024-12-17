CREATE TYPE "public"."title" AS ENUM('Founder', 'AI');--> statement-breakpoint
CREATE TYPE "public"."publish_status" AS ENUM('draft', 'in-review', 'scheduled', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "article_tags" (
	"article_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"brand_id" uuid NOT NULL,
	CONSTRAINT "article_tags_article_id_tag_id_pk" PRIMARY KEY("article_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"excerpt" text NOT NULL,
	"slug" text GENERATED ALWAYS AS (lower(replace("articles"."title", ' ', '-'))) STORED NOT NULL,
	"author_id" uuid NOT NULL,
	"brand_id" uuid NOT NULL,
	"publish_status" "publish_status" DEFAULT 'draft' NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp (3),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"title" "title" DEFAULT 'Founder',
	"bio" text DEFAULT '',
	"location" text DEFAULT 'New York, NY',
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp DEFAULT now(),
	CONSTRAINT "authors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "brand_tags" (
	"brand_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "brand_tags_brand_id_tag_id_pk" PRIMARY KEY("brand_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"founder" text DEFAULT 'Chris Maresca' NOT NULL,
	"linkedin_handle" text,
	"twitter_handle" text,
	"website_url" text NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "linkedin_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp (3),
	"publish_status" "publish_status" DEFAULT 'draft' NOT NULL,
	"main_article_id" uuid,
	"brand_id" uuid,
	"author_id" uuid
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text GENERATED ALWAYS AS (lower(replace("tags"."name", ' ', '-'))) STORED NOT NULL,
	"description" text DEFAULT '',
	"date_created" timestamp DEFAULT now() NOT NULL,
	"date_updated" timestamp (3),
	CONSTRAINT "tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "tweet_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"main_article_id" uuid,
	"brand_id" uuid,
	"author_id" uuid,
	"publish_status" "publish_status" DEFAULT 'draft' NOT NULL,
	"title" text,
	"date_created" timestamp with time zone DEFAULT now() NOT NULL,
	"date_updated" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "tweets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"tweet_post_id" uuid,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_tags" ADD CONSTRAINT "article_tags_tag_id_brand_id_brand_tags_tag_id_brand_id_fk" FOREIGN KEY ("tag_id","brand_id") REFERENCES "public"."brand_tags"("tag_id","brand_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_tags" ADD CONSTRAINT "brand_tags_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_tags" ADD CONSTRAINT "brand_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linkedin_posts" ADD CONSTRAINT "linkedin_posts_main_article_id_articles_id_fk" FOREIGN KEY ("main_article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "linkedin_posts" ADD CONSTRAINT "linkedin_posts_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "linkedin_posts" ADD CONSTRAINT "linkedin_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tweet_posts" ADD CONSTRAINT "tweet_posts_main_article_id_articles_id_fk" FOREIGN KEY ("main_article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tweet_posts" ADD CONSTRAINT "tweet_posts_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tweet_posts" ADD CONSTRAINT "tweet_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_tweet_post_id_tweet_posts_id_fk" FOREIGN KEY ("tweet_post_id") REFERENCES "public"."tweet_posts"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "tweets_position_idx" ON "tweets" USING btree ("tweet_post_id","position") WHERE "tweets"."tweet_post_id" IS NOT NULL;