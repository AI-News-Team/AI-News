// //import chai from "chai";
// //import chaiHttp from "chai-http";
// //import { describe, it } from "mocha";

// var expect  = require('chai').expect;
// var request = require('request');
// const BASE_URL = "localhost:3001";

// it('Main page content', function(done) {
//     request('http://localhost:3001/article.summary' , function(error, response, body) {
//       expect(response.status).to.be.equal(200);
//         done();
        
//     });
//     //expect(body).to.equal('AI Daily');
// });

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
 const BASE_URL = "localhost:3001";
//const BASE_URL = "http://localhost:3001/article.summary";

chai.use(chaiHttp); // Provides an interface for integration testing

describe("integration - GitHub Gist", () => {
  it("should get institutions", (done) => {
    chai
      .request(BASE_URL)
      .get("/article.summary")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        done();
      });
  });

});
