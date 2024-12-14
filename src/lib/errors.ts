
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  UPDATED = 202,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
}

// =====================================================================================================
// Database Errors
// =====================================================================================================

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

// =====================================================================================================
// Handler Errors
// =====================================================================================================

/**
 * Custom error for invalid UUIDs.
 */
export class InvalidIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidIdError";
  }
}

/**
 * Custom error for when a resource is not found in the mapping.
 */
export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}

/**
 * Custom error for when a resource handler is not found.
 */
export class OperationNotSupportedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationNotSupportedError";
  }
}

// =====================================================================================================
// Query Errors
// =====================================================================================================

/**
 * Custom error for when a schema is not found.
 */


export class InvalidQueryParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidQueryParamsError";
  }
}

// =====================================================================================================
// API Errors
// =====================================================================================================

export class BaseApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, new.target.prototype); // Maintain prototype chain
  }
}

/**
 * Custom error for invalid request body structure or content.
 */
export class InvalidBodyError extends BaseApiError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
    this.name = "InvalidBodyError";
  }
}

/**
 * Custom error for unauthorized operations.
 */
export class UnauthorizedError extends BaseApiError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Generic error for unexpected situations.
 */
export class UnexpectedError extends BaseApiError {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    this.name = "UnexpectedError";
  }
}

export class ValidationError extends BaseApiError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
    this.name = "ValidationError";
  }
}

