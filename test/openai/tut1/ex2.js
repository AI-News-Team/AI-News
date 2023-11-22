// code from https://medium.com/innovies-club/generate-unit-tests-in-a-snap-with-openais-api-3c72fcae6e4e
const OpenAPI = require("./op2");

const path = "./test/openai/tut1/dummyFunc.js";
const framework = "mocha";

const open = new OpenAPI();

(async () => {
  try {
    const code = await open.readFileAsCode(path);
    await open.generateUnitTest(
      code.toString(2),
      framework.toString(2),
      path.toString(2)
    );
    await open.createTestSuitFile();
  } catch (error) {
    console.error(error);
  }
})();
