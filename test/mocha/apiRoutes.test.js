console.log("startapiroutes");
process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const http = require('http');

const hostname = "localhost";
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

server.listen(port, hostname, () => {
  console.log(`Server running at  http://localhost:${port}`);
});

chai.use(chaiHttp);

describe('/First Test Collection', () => {
  it('test api catogries.list is up', (done) => {
    console.log("HELLLLLOOOO");
    chai.request(server) 
    .get('/category.list')
    .end((err, res) =>{
       res.should.have.status(200);
       done();
    });
    done();
    
  });

  
});

  