// code from https://medium.com/innovies-club/generate-unit-tests-in-a-snap-with-openais-api-3c72fcae6e4e
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a / b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
