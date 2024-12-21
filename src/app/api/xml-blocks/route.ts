// XMl Blocks API Route
// TODO: Improve this route to be more efficient like the remaining resources

// =====================================================================================================
// =====================================================================================================
// Imports
// =====================================================================================================
// =====================================================================================================
// Drizzle and Neon
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Schema
import * as schema from "@/db/schema";

// Next
import { NextRequest, NextResponse } from "next/server";

// Query Params Helpers
import { parse } from "qs-esm";
import { transformQueryParams, validateQueryParams } from "@/lib/query-handler";

// Client
const client = neon(process.env.DATABASE_URL!);

// Drizzle
const neonDb = drizzle(client, { schema });

// Types
import { XmlBlockPayload } from "@/types/xml-blocks/xml-blocks.types";
import { ResourceNotFoundError } from "@/lib/errors";
import { handleErrors } from "@/lib/error-handler";

// =====================================================================================================
// =====================================================================================================
// Functions
// =====================================================================================================
// =====================================================================================================
async function getXmlBlocksForBrandId(brandId: string): Promise<XmlBlockPayload[]> {
  const brandXmlBlocks: XmlBlockPayload[] = await neonDb.query.brandXmlBlocks.findMany({
    // 1) Filter on brandXmlBlocks where brandId = the provided brandId
    where: (tables, { eq }) => eq(tables.brandId, brandId),

    // 2) “with” includes the nested xmlBlock, and inside that, the xmlBlockParameters
    with: {
      xmlBlock: {
        columns: {
          id: true,
          name: true,
          tsName: true,
        },
        with: {
          xmlBlockParameters: {
            columns: {
              id: true,
              name: true,
              tsName: true,
              required: true,
              description: true,
              dataType: true,
            },
          },
        },
      },
    },
  });

  if (!brandXmlBlocks) {
    throw new Error("No brand xml blocks found");
  }

  return brandXmlBlocks;
}

export async function GET(req: NextRequest) {
  const queryParams = parse(req.nextUrl.searchParams.toString(), { ignoreQueryPrefix: true });

  try {
    validateQueryParams("xmlBlocks", queryParams);

    const transformedQueryParams = transformQueryParams(queryParams);

    const brandId = transformedQueryParams.find((param) => param.field === "brandId");

    if (!brandId) {
      throw new Error("Brand ID is required. Please provide a brandId in the query params.");
    }

    const xmlBlocks = await getXmlBlocksForBrandId(brandId.value as string);
    if (!xmlBlocks) {
      throw new ResourceNotFoundError("No xml blocks found for the provided brandId.");
    }

    const total = xmlBlocks.length;
    return NextResponse.json({
      docs: xmlBlocks,
      totalDocs: total,
      limit: 10,
      totalPages: Math.ceil(total / 10),
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: total > 10,
      prevPage: null,
      nextPage: total > 10 ? 2 : null,
    });
  } catch (error) {
    return handleErrors(error as Error);
  }
}
