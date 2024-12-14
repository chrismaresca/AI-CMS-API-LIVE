// // import { config } from "dotenv";
// // import { drizzle } from "drizzle-orm/neon-http";
// // import { seed } from "drizzle-seed";

// // // Import the schema
// // import { authors, brands, articles, linkedInPosts, tweets, threads, tags, articleTags } from "./schema";

// // // Load environment variables from `.env.local`
// // config({ path: ".env.local" });

// // async function main(): Promise<void> {
// //   if (!process.env.DATABASE_URL) {
// //     console.error("Error: DATABASE_URL is not defined in the environment variables.");
// //     process.exit(1);
// //   }

// //   console.log("Initializing database connection...");

// //   try {
// //     const db = drizzle(process.env.DATABASE_URL);

// //     console.log("Seeding database with sample data...");

// //     await seed(db, {tags, articles, articleTags, threads, tweets, linkedInPosts }, { count: 10 }).refine((funcs) => ({
// //     //   authors: {
// //     //     columns: {
// //     //       firstName: funcs.firstName({ isUnique: false }),
// //     //       lastName: funcs.lastName({ isUnique: false }),
// //     //       email: funcs.email(),
// //     //     },
// //     //   },
// //     //   brands: {
// //     //     columns: {
// //     //       name: funcs.companyName({ isUnique: true }),
// //     //       linkedInProfile: funcs.string({ isUnique: false }),
// //     //       twitterProfile: funcs.string({ isUnique: false }),
// //     //       websiteUrl: funcs.string({ isUnique: false }),
// //     //     },
// //     //   },
// //       tags: {
// //         columns: {
// //           name: funcs.valuesFromArray({
// //             values: ["Tech", "AI", "Health", "Lifestyle", "Education"],
// //             isUnique: true,
// //           }),
// //         },
// //         count: 5,
// //       },
// //       articles: {
// //         columns: {
// //           title: funcs.loremIpsum({ sentencesCount: 1 }),
// //           content: funcs.loremIpsum({ sentencesCount: 5 }),
// //           slug: funcs.valuesFromArray({
// //             values: ["article-1", "article-2", "article-3", "article-4", "article-5", "article-6", "article-7", "article-8", "article-9", "article-10"],
// //             isUnique: true,
// //           }),
// //           authorId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `author-${i}`),
// //           }),
// //           brandId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `brand-${i}`),
// //           }),
// //         },
// //       },
// //       articleTags: {
// //         columns: {
// //           articleId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `article-${i}`),
// //           }),
// //           tagId: funcs.valuesFromArray({
// //             values: Array.from({ length: 5 }, (_, i) => `tag-${i}`),
// //           }),
// //         },
// //       },
// //       threads: {
// //         columns: {
// //           title: funcs.loremIpsum({ sentencesCount: 1 }),
// //         },
// //       },
// //       tweets: {
// //         columns: {
// //           content: funcs.loremIpsum({ sentencesCount: 2 }),
// //           threadId: funcs.valuesFromArray({
// //             values: Array.from({ length: 5 }, (_, i) => `thread-${i}`),
// //           }),
// //           position: funcs.int({ minValue: 1, maxValue: 5 }),
// //           mainArticleId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `article-${i}`),
// //             isUnique: false,
// //           }),
// //           brandId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `brand-${i}`),
// //           }),
// //           authorId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `author-${i}`),
// //           }),
// //         },
// //       },
// //       linkedInPosts: {
// //         columns: {
// //           title: funcs.loremIpsum({ sentencesCount: 1 }),
// //           mainArticleId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `article-${i}`),
// //             isUnique: false,
// //           }),
// //           brandId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `brand-${i}`),
// //           }),
// //           authorId: funcs.valuesFromArray({
// //             values: Array.from({ length: 10 }, (_, i) => `author-${i}`),
// //           }),
// //         },
// //       },
// //     }));

// //     console.log("Database seeding completed successfully.");
// //   } catch (error) {
// //     console.error("An error occurred during the database seeding process:", error);
// //     process.exit(1); // Exit with a failure code
// //   }
// // }

// // main();

console.log("Seeding via code sucks with Drizzle!!");

import * as schema from "./schema"; // Adjust the path to your schema file

const names = Object.keys(schema);

console.log(names);
