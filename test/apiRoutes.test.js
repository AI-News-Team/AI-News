process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const http = require('http');
console.log("1");
const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
});

server.listen(port, hostname, () => {
  console.log(`Server running at  http://${hostname}:${port}`);
});
console.log("2");
chai.use(chaiHttp);

describe('/First Test Collection', () => {
  console.log("3");
  it('test api route', (done) => {
    console.log("4");
    chai.request(server)
    .get('/category.list')
    .end((err, res) =>{
      console.log("5");
       res.should.have.status(200);
       done();
    });
    done();
    
  });

  
})

  