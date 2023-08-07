import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
const BASE_URL = "localhost:3001";
chai.should();
chai.use(chaiHttp); 

describe("api tests status", () => {
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

describe("api tests content", () => {
  it("content tests", (done) => {
    chai
      .request(BASE_URL)
      .get("/article.summary")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a('object');
        const attributes = res.body.data;
        chai.expect(attributes).to.include.keys("business", "opinions", "travel");
        done();
      });
  });

});

describe("api tests status", () => {
  it("staus tests", (done) => {
    chai
      .request(BASE_URL)
      .get("/article.getall")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a('object');
        res.body.should.have.property('data')
        res.body.data[0].should.have.property('id')
        res.body.data[0].should.have.property('body')
        done();
      });
  });

});

