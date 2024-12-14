import * as schema from "./schema";
import { reset } from "drizzle-seed";

// Drizzle ORM DB
import { db } from "@/db/drizzle";

/**
 * Main function to reset the database.
 */
async function main() {
  console.log("Initializing database connection...");

  // Ensure DATABASE_URL is defined
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined.");
  }

  console.log("Database connection initialized.");

  console.log("Resetting the database...");
  await reset(db, schema);
  console.log("Database reset completed successfully.");
}

// Run this script to reset the database.
main();
