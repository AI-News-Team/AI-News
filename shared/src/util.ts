/**
 * It returns `timestamp` in "ISO 8601" format ("YYYY-MM-DDTHH:mm:ss.sssZ")
 * 
 * @returns {string} The current timestamp in ISO format
 */
export function timestamp() {
  return new Date().toISOString();
}
