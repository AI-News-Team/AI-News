import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

var expect  = require('chai').expect;
var request = require('request');
const BASE_URL = "localhost:3001";

it('Main page content', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
      chai.expect(response.status).to.be.equal(200);
        done();
        expect(body).to.equal('AI Daily');
        done();
    });
});
