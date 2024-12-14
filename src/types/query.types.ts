export type AllowedQueryArgs = {
  clauses: string[];
  operators: string[];
  fields: string[];
};

export type QueryParamStructure = {
  clause: string;
  field: string;
  operator: string;
  value: unknown;
};
