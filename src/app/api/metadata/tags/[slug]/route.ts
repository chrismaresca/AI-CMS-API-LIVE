import { NextResponse } from "next/server";

// Drizzle
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

// Schema
import * as schema from "@/db/schema";

// Dotenv
import { config } from "dotenv";
config({ path: ".env.local" });

// Neon
import { neon } from "@neondatabase/serverless";
import { ResourceNotFoundError } from "@/lib/errors";

// Client
const client = neon(process.env.DATABASE_URL!);

// Drizzle
const neonDb = drizzle(client, { schema });

type Params = Promise<{ slug: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const tags = await neonDb.query.tags.findFirst({
    where: eq(schema.tags.slug, slug),
  });

  console.log(tags);

  if (!tags) {
    throw new ResourceNotFoundError(`Tag not found for slug: ${slug}`);
  }

  return NextResponse.json(tags);
}
