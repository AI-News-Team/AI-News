import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
 const BASE_URL = "localhost:3001";

chai.use(chaiHttp); 

describe("api tests", () => {
  it("staus tests", (done) => {
    chai
      .request(BASE_URL)
      .get("/article.summary")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });

});
