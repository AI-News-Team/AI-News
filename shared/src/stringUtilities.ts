/**
 * Converts a string from snake_case to readable format
 * 
 * @param {string} value The string to convert
 * @returns {string} The converted string
 */
function fromSnakeCase(value: string) {
  return value.replaceAll(/_/g, " "); // regular expression for underscore, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
}

/**
 * Just capitalizes the first letter of a string
 * 
 * @param {string} value The string to convert
 * @returns {string} The converted string
 */
function toSentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export {fromSnakeCase, toSentenceCase}