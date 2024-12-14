import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { parse } from "qs-esm";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams.toString();

  console.log("Search Params:", searchParams);

  // Use qs-esm to parse the query string into a structured object
  const parsedQuery = parse(searchParams, {
    ignoreQueryPrefix: false, // Ensure prefixes like `?` are handled correctly
  });

  console.log("Parsed Query:", parsedQuery);

  return NextResponse.json({
    message: "Query params test endpoint",
    query: parsedQuery,
  });
}
