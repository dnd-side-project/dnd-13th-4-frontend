/** json to queryParams */
export function buildQuery(
  params?: Record<string, string | number | boolean>,
): string {
  if (!params) return '';
  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString();
  return query ? `?${query}` : '';
}
