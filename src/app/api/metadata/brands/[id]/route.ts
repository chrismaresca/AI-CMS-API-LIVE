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

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const brands = await neonDb.query.brands.findFirst({
    where: eq(schema.brands.id, id),
    with: {
      tags: {
        with: {
          tag: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!brands) {
    throw new ResourceNotFoundError(`Brand not found for id: ${id}`);
  }

  return NextResponse.json(brands);
}
