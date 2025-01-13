/**
 * Creates a new query string by adding or updating a parameter in the given URLSearchParams.
 *
 * @param {URLSearchParams} currentParams - The current URL search parameters.
 * @param {string} name - The name of the parameter to add or update.
 * @param {string} value - The value to set for the specified parameter.
 * @returns {string} The updated query string.
 */
export function createQueryString(currentParams: URLSearchParams, name: string, value: string): string {
  const params = new URLSearchParams(currentParams.toString());
  params.set(name, value);
  return params.toString();
}
