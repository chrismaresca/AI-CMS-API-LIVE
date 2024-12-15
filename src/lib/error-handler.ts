import { NextResponse } from "next/server";

// Import Errors
import {
  HttpStatus,
  InvalidBodyError,
  InvalidIdError,
  UnauthorizedError,
  ResourceNotFoundError,
  OperationNotSupportedError,
  UnexpectedError,
  DatabaseError,
  InvalidQueryParamsError,
  CreateResourceFailed,
} from "@/lib/errors";

// =====================================================================================================
// Error Handler
// =====================================================================================================

/**
 * Centralized function to handle errors for all API requests.
 * @param error - The error object caught in the request handlers.
 * @returns A standardized JSON response with the appropriate status code and message.
 */
export function handleErrors(error: Error) {
  if (error instanceof InvalidBodyError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.BAD_REQUEST });
  }

  if (error instanceof InvalidIdError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.BAD_REQUEST });
  }

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.METHOD_NOT_ALLOWED });
  }

  if (error instanceof ResourceNotFoundError || error instanceof OperationNotSupportedError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.NOT_FOUND });
  }

  if (error instanceof UnexpectedError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  if (error instanceof InvalidQueryParamsError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.BAD_REQUEST });
  }

  if (error instanceof DatabaseError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  if (error instanceof CreateResourceFailed) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  // Fallback for unexpected errors
  return NextResponse.json(
    { error: "An internal server error occurred", details: error.message },
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}
