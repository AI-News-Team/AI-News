// code from https://medium.com/innovies-club/generate-unit-tests-in-a-snap-with-openais-api-3c72fcae6e4e
const OpenAPI = require("./op2").default;
const { OpenAIApi } = require("openai");

const path = "./test/openai/tut1/dummyFunc.js";
const framework = "mocha";

const open = new OpenAPI();

(async () => {
  try {
    const code = await open.readFileAsCode(path);
    console.log("read as code ex file");
    await open.generateUnitTest(code, framework, path);
    console.log("generate Unit test");
    await open.createTestSuitFile();
    console.log("create suit file");
  } catch (error) {
    console.error(error);
  }
})();
