import { relations, SQL, sql } from "drizzle-orm";

// Drizzle ORM Types
import {
  foreignKey,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

// =====================================================================================================
// =====================================================================================================
// Enums
// =====================================================================================================
// =====================================================================================================

export const publishStatusEnum = pgEnum("publish_status", ["draft", "in-review", "scheduled", "published", "archived"]);

export const authorTitleEnum = pgEnum("title", ["Founder", "AI"]);

export const tsDataTypeEnum = pgEnum("ts_data_type", ["text", "integer", "array", "object", "boolean", "null"]);

// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// Main Objects
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================

// =====================================================================================================
// =====================================================================================================
// Authors Schema
// =====================================================================================================
// =====================================================================================================
export const authors = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  title: authorTitleEnum("title").default("Founder"),
  bio: text("bio").default(""),
  isHuman: boolean("is_human").default(true).notNull(),
  location: text("location").default("New York, NY"),
  // Date fields
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  dateUpdated: timestamp("date_updated")
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// =====================================================================================================
// =====================================================================================================
// Articles Schema
// =====================================================================================================
// =====================================================================================================
export const articles = pgTable(
  "articles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    excerpt: text("excerpt").notNull(),
    slug: text("slug")
      .notNull()
      .unique()
      .generatedAlwaysAs((): SQL => sql`lower(replace(${articles.title}, ' ', '-'))`),
    authorId: uuid("author_id")
      .notNull()
      .references(() => authors.id), // Foreign key relationship for author
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id), // Foreign key relationship for brand

    // Publish Status
    publishStatus: publishStatusEnum("publish_status").default("draft").notNull(),

    // Date fields
    dateCreated: timestamp("date_created").defaultNow().notNull(),
    dateUpdated: timestamp("date_updated")
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    slug_idx: uniqueIndex("articles_slug_idx").on(table.slug),
  })
);

// =====================================================================================================
// =====================================================================================================
// Brands Schema
// =====================================================================================================
// =====================================================================================================
export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  founder: text("founder").default("Chris Maresca").notNull(),

  //   Social Media Links
  linkedInHandle: text("linkedin_handle"),
  twitterHandle: text("twitter_handle"),
  websiteUrl: text("website_url").notNull(),

  // Date fields
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  dateUpdated: timestamp("date_updated")
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// =====================================================================================================
// =====================================================================================================
// LinkedIn Posts Schema
// =====================================================================================================
// =====================================================================================================
export const linkedInPosts = pgTable("linkedin_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),

  // Date fields
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  dateUpdated: timestamp("date_updated")
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),

  // Publish Status
  publishStatus: publishStatusEnum("publish_status").default("draft").notNull(),

  // Foreign key relationship for article. If post is standalone, mainArticleId is null.
  mainArticleId: uuid("main_article_id").references(() => articles.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),

  // Foreign key relationships for brand and author
  brandId: uuid("brand_id").references(() => brands.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  authorId: uuid("author_id").references(() => authors.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
});

// =====================================================================================================
// =====================================================================================================
// Tweet Posts Schema
// =====================================================================================================
// =====================================================================================================

export const tweetPosts = pgTable("tweet_posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Foreign key for the main article (all tweets in this post reference the same article)
  mainArticleId: uuid("main_article_id").references(() => articles.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),

  // Foreign key relationships for brand and author
  brandId: uuid("brand_id").references(() => brands.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  authorId: uuid("author_id").references(() => authors.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),

  // Publish Status
  publishStatus: publishStatusEnum("publish_status").default("draft").notNull(),

  // Metadata fields
  title: text("title"), // Optional title for the thread or standalone tweet

  // Date fields
  dateCreated: timestamp("date_created", { withTimezone: true }).defaultNow().notNull(),
  dateUpdated: timestamp("date_updated")
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// =====================================================================================================
// =====================================================================================================
// Tweets Schema
// =====================================================================================================
// =====================================================================================================
export const tweets = pgTable(
  "tweets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),

    // Foreign key for tweetPost
    tweetPostId: uuid("tweet_post_id").references(() => tweetPosts.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

    // Position in the thread (0 = standalone tweet, >0 = position in thread)
    position: integer("position").default(0).notNull(),
  },
  (table) => ({
    position_idx: uniqueIndex("tweets_position_idx")
      .on(table.tweetPostId, table.position)
      .where(sql`${table.tweetPostId} IS NOT NULL`),
  })
);

// =====================================================================================================
// =====================================================================================================
// Tags Schema
// =====================================================================================================
// =====================================================================================================
export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug")
    .notNull()
    .unique()
    .generatedAlwaysAs((): SQL => sql`lower(replace(${tags.name}, ' ', '-'))`),
  seoDescription: text("seo_description").default(""),
  aiDescription: text("ai_description").default(""),

  // Date fields
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  dateUpdated: timestamp("date_updated")
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// =====================================================================================================
// =====================================================================================================
// XML Blocks Schema
// =====================================================================================================
// =====================================================================================================

export const xmlBlocks = pgTable("xml_blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),

  // TODO: May change later
  tsName: text("ts_name")
    .notNull()
    .generatedAlwaysAs((): SQL => sql`${xmlBlocks.name}`),

  description: text("description").notNull(),

  // Date fields
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  dateUpdated: timestamp("date_updated")
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

// =====================================================================================================
// =====================================================================================================
// XML Block Parameters Schema
// =====================================================================================================
// =====================================================================================================

export const xmlBlockParameters = pgTable(
  "xml_block_parameters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    xmlBlockId: uuid("xml_block_id")
      .notNull()
      .references(() => xmlBlocks.id),
    name: text("name").notNull(),
    tsName: text("ts_name")
      .notNull()
      .generatedAlwaysAs((): SQL => sql`${xmlBlockParameters.name}`),
    required: boolean("required").default(false).notNull(),
    description: text("description"),
    dataType: tsDataTypeEnum("data_type").notNull(),

    // Date fields
    dateCreated: timestamp("date_created").defaultNow().notNull(),
    dateUpdated: timestamp("date_updated")
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    // Define the unique index on (xmlBlockId, tsName)
    xmlBlockParametersXmlBlockTsNameUniqueIndex: uniqueIndex("xml_block_parameters_xml_block_id_ts_name_unique_idx").on(
      table.xmlBlockId,
      table.tsName
    ),
  })
);

// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// Join Tables
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================

// =====================================================================================================
// =====================================================================================================
// Brand Tags Schema
// =====================================================================================================
// =====================================================================================================
export const brandTags = pgTable(
  "brand_tags",
  {
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.brandId, table.tagId] }),
  })
);

// =====================================================================================================
// =====================================================================================================
// Article Tags Schema
// =====================================================================================================
// =====================================================================================================

export const articleTags = pgTable(
  "article_tags",
  {
    articleId: uuid("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id),
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.articleId, table.tagId] }),
    // This ensures the tag being added belongs to the same brand as the article
    brandTagFk: foreignKey({
      columns: [table.brandId, table.tagId],
      foreignColumns: [brandTags.brandId, brandTags.tagId],
    }),
  })
);

// =====================================================================================================
// =====================================================================================================
// Brand XML Blocks Schema
// =====================================================================================================
// =====================================================================================================

// brandXmlBlocks (join table) for many-to-many relation between brands and xmlBlocks
export const brandXmlBlocks = pgTable(
  "brand_xml_blocks",
  {
    brandId: uuid("brand_id")
      .notNull()
      .references(() => brands.id),
    xmlBlockId: uuid("xml_block_id")
      .notNull()
      .references(() => xmlBlocks.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.brandId, t.xmlBlockId] }),
  })
);

// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// Drizzle Relations
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================

// =====================================================================================================
// =====================================================================================================
// Brands Relations
// =====================================================================================================
// =====================================================================================================
// Relations for the brands table, linking to associated tags and XML blocks.
export const brandsRelations = relations(brands, ({ many }) => ({
  tags: many(brandTags),
  xmlBlocks: many(brandXmlBlocks),
}));

// Relations for the tags table, linking to associated brands through brandTags.
export const tagsRelations = relations(tags, ({ many }) => ({
  brands: many(brandTags),
}));

// Relations for the xmlBlocks table, linking to associated brand XML blocks.
export const xmlBlocksRelations = relations(xmlBlocks, ({ many }) => ({
  brandXmlBlocks: many(brandXmlBlocks),
  xmlBlockParameters: many(xmlBlockParameters),
}));

export const xmlBlockParametersRelations = relations(xmlBlockParameters, ({ one }) => ({
  xmlBlock: one(xmlBlocks, {
    fields: [xmlBlockParameters.xmlBlockId],
    references: [xmlBlocks.id],
  }),
}));

// Relations for the brandTags table, linking to the associated brand and tag.
export const brandTagsRelations = relations(brandTags, ({ one }) => ({
  brand: one(brands, {
    fields: [brandTags.brandId],
    references: [brands.id],
  }),
  tag: one(tags, {
    fields: [brandTags.tagId],
    references: [tags.id],
  }),
}));

// brandXmlBlocks relations
export const brandXmlBlocksRelations = relations(brandXmlBlocks, ({ one }) => ({
  brand: one(brands, {
    fields: [brandXmlBlocks.brandId],
    references: [brands.id],
  }),
  xmlBlock: one(xmlBlocks, {
    fields: [brandXmlBlocks.xmlBlockId],
    references: [xmlBlocks.id],
  }),
}));

// =====================================================================================================
// =====================================================================================================
// Articles and Tags Relations
// =====================================================================================================
// =====================================================================================================

export const articlesRelations = relations(articles, ({ many, one }) => ({
  brand: one(brands, {
    fields: [articles.brandId],
    references: [brands.id],
  }),
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.id],
  }),
  tags: many(articleTags),
}));

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
  tag: one(tags, {
    fields: [articleTags.tagId],
    references: [tags.id],
  }),
}));
