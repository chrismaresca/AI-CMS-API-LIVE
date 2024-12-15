// Next Imports
import { NextResponse, NextRequest } from "next/server";

// Resource Types and Mapping Imports
import { Resource } from "@/types";
import { mapHandler } from "@/handlers/mapping";

// Errors Import
import { OperationNotSupportedError } from "@/lib/errors";
import { handleErrors } from "@/lib/error-handler";

// Parse
import { parse } from "qs-esm";
import { transformQueryParams, validateQueryParams } from "@/lib/query-handler";

// Params
type Params = Promise<{
  resource: Resource;
}>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const resolvedParams = await params;

  const queryParams = parse(req.nextUrl.searchParams.toString(), { ignoreQueryPrefix: true });
  const resource = resolvedParams.resource;

  try {
    validateQueryParams(resource, queryParams);

    const transformedQueryParams = transformQueryParams(queryParams);

    // console.log("The validated query is", queryParams);

    const handler = mapHandler(resource, "handleGetAll");
    if (!handler) throw new OperationNotSupportedError("Handler not found");

    return NextResponse.json(await handler(transformedQueryParams));
  } catch (error) {
    return handleErrors(error as Error);
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  const resolvedParams = await params;

  try {
    const handler = mapHandler(resolvedParams.resource, "handleCreate");
    if (!handler) throw new OperationNotSupportedError("Handler not found");

    const data = await req.json();
    return NextResponse.json(await handler(data));
  } catch (error) {
    return handleErrors(error as Error);
  }
}
