import { Resource } from "@/types";
import { InvalidQueryParamsError } from "./errors";

import { AllowedQueryArgs, QueryParamStructure } from "@/types";
// TODO: Need the rules to be nested...so operators are nested within fields and fields are nested within clauses

export const queryParamsRules: Record<Resource, AllowedQueryArgs> = {
  articles: {
    clauses: ["where"],
    operators: ["equals"],
    fields: ["slug", "brandId", "authorId"],
  },
  tags: {
    clauses: ["where"],
    operators: ["equals"],
    fields: ["brandId"],
  },
  xmlBlocks: {
    clauses: ["where"],
    operators: ["equals"],
    fields: ["brandId"],
  },
  authors: {
    clauses: [],
    operators: [],
    fields: [],
  },
  brands: {
    clauses: [],
    operators: [],
    fields: [],
  },
  linkedinPosts: {
    clauses: [],
    operators: [],
    fields: [],
  },
  tweetPosts: {
    clauses: [],
    operators: [],
    fields: [],
  },
};

export function validateQueryParams(resource: Resource, queryParams: Record<string, unknown>): boolean {
  const rules = queryParamsRules[resource];

  if (Object.keys(queryParams).length === 0) {
    return true;
  }

  //   console.info("running validation");

  // Validate top-level clauses
  for (const [clause, value] of Object.entries(queryParams)) {
    if (!rules.clauses.includes(clause)) {
      //   console.error(`Invalid clause: ${clause} These are the ones available: ${rules.clauses.join(", ")}`);
      throw new InvalidQueryParamsError(
        `Invalid clause: ${clause} These are the ones available: ${rules.clauses.join(", ")}`
      );
    }

    // Ensure value is an object for further validation
    if (typeof value !== "object" || value === null) {
      // console.error(`You must provide a clause value for clause "${clause}."`);
      throw new InvalidQueryParamsError(`You must provide a clause value for clause "${clause}."`);
    }

    // Validate fields within the clause
    const fieldEntries = Object.entries(value as Record<string, unknown>);
    for (const [field, operatorObj] of fieldEntries) {
      if (!rules.fields.includes(field)) {
        // console.error(`Invalid field: ${field}. These are the ones available: ${rules.fields.join(", ")}`);
        throw new InvalidQueryParamsError(
          `Invalid field: ${field}. These are the ones available: ${rules.fields.join(", ")}`
        );
      }

      // Validate operators within the field
      if (typeof operatorObj !== "object" || operatorObj === null) {
        // console.error(`Value for field "${field}" must be an object`);
        throw new InvalidQueryParamsError(`You must provide an operator for the field "${field}"`);
      }

      for (const [operator, operand] of Object.entries(operatorObj as Record<string, unknown>)) {
        if (!rules.operators.includes(operator)) {
          //   console.error(`Invalid operator: ${operator}`);
          throw new InvalidQueryParamsError(
            `Invalid operator: ${operator}. These are the ones available: ${rules.operators.join(", ")}`
          );
        }

        // Optional: Validate the operand value (if needed)
        if (typeof operand === "undefined") {
          //   console.error(`Operator "${operator}" must have a valid operand value for field "${field}"`);
          throw new InvalidQueryParamsError(
            `Operator "${operator}" must have a valid operand value for field "${field}"`
          );
        }
      }
    }
  }

  // All validations passed
  return true;
}

// TODO: Improve this function
export function transformQueryParams(queryParams: Record<string, unknown>): QueryParamStructure[] {
  const result: QueryParamStructure[] = [];

  for (const [clause, fields] of Object.entries(queryParams)) {
    if (typeof fields === "object" && fields !== null) {
      for (const [field, operators] of Object.entries(fields as Record<string, unknown>)) {
        if (typeof operators === "object" && operators !== null) {
          for (const [operator, value] of Object.entries(operators as Record<string, unknown>)) {
            result.push({ clause, field, operator, value });
          }
        }
      }
    }
  }

  return result;
}
