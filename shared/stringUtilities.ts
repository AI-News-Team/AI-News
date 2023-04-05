function fromSnakeCase(value: string) {
  return value.replaceAll(/_/g, " "); // regular expression for underscore, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
}

function toSentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export {fromSnakeCase, toSentenceCase}