// Next Imports
import { NextResponse } from "next/server";

// Resource Types and Mapping Imports
import { Resource } from "@/types";
import { mapHandler } from "@/handlers/mapping";

// Validate ID Import
import { validate } from "uuid";

// Error Handler Import
import { handleErrors } from "@/lib/error-handler";

// Errors Import
import { InvalidIdError, OperationNotSupportedError } from "@/lib/errors";

/**
 * GET handler for retrieving a single resource by ID
 */

type ParamsWithId = Promise<{
  resource: Resource;
  id: string;
}>;

export async function GET(req: Request, { params }: { params: ParamsWithId }): Promise<NextResponse> {
  const { resource, id } = await params;

  try {
    if (!validate(id)) throw new InvalidIdError("Invalid ID");

    const handler = mapHandler(resource, "handleGetById");
    if (!handler) throw new OperationNotSupportedError("Handler not found");

    const result = await handler(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error as Error);
  }
}

/**
 * PATCH handler for updating a resource by ID
 */
export async function PATCH(req: Request, { params }: { params: ParamsWithId }): Promise<NextResponse> {
  const { resource, id } = await params;

  try {
    if (!validate(id)) throw new InvalidIdError("Invalid ID");

    const handler = mapHandler(resource, "handleUpdate");
    if (!handler) throw new OperationNotSupportedError("Handler not found");

    const data = await req.json();
    const result = await handler(id, data);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error as Error);
  }
}

/**
 * DELETE handler for removing a resource by ID
 */
export async function DELETE(req: Request, { params }: { params: ParamsWithId }): Promise<NextResponse> {
  const { resource, id } = await params;

  try {
    if (!validate(id)) throw new InvalidIdError("Invalid ID");

    const handler = mapHandler(resource, "handleDelete");
    if (!handler) throw new OperationNotSupportedError("Handler not found");

    const result = await handler(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error as Error);
  }
}
