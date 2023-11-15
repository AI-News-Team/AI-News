import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

const SCRAPY_TOKEN =
  "A65F717EB78C5D01784ED19B45CB07C63731FD947E241375E6E90475D160E28E";
const REWRITER_TOKEN =
  "707D8DE0C1C7700524C9E1070B585A8926952FA039D3537B010D1EB3E9D37A9E";

const BASE_URL = "localhost:";
const PORT_NUMBER = 3001;

chai.should();
chai.use(chaiHttp);

describe;

//  To populate DB
//  cd database/
//  ./init.sh
//  cd scripts/
//  ./restore.sh backup/2023-09-18T10-37-38.backup.sql
//  ./attach.sh

describe("API - article.get/1", () => {
  it("Correct values and their types, not null, returns single article", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .get("/article.get/1")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");

        const attributes = res.body.data;

        // Checks if all the attributes are present
        chai.expect(attributes).to.have.property("id");
        chai.expect(attributes).to.have.property("name");
        chai.expect(attributes).to.have.property("author");
        chai.expect(attributes).to.have.property("body");
        chai.expect(attributes).to.have.property("category");
        chai.expect(attributes).to.have.property("source_url");
        chai.expect(attributes).to.have.property("cover_url");
        chai.expect(attributes).to.have.property("retrieved_date");
        chai.expect(attributes).to.have.property("publication_date");
        chai.expect(attributes).to.have.property("image_gen");

        // Check if they have values and not null
        chai.expect(attributes.id).to.not.equal(null);
        chai.expect(attributes.name).to.not.equal(null);
        chai.expect(attributes.author).to.not.equal(null);
        chai.expect(attributes.body).to.not.equal(null);
        chai.expect(attributes.category).to.not.equal(null);
        chai.expect(attributes.source_url).to.not.equal(null);
        chai.expect(attributes.cover_url).to.not.equal(null);
        chai.expect(attributes.retrieved_date).to.not.equal(null);
        chai.expect(attributes.publication_date).to.not.equal(null);
        chai.expect(attributes.image_gen).to.not.equal(null);

        // Check if values have correct data type
        chai.expect(attributes.id).to.be.a("number");
        chai.expect(attributes.name).to.be.a("string");
        chai.expect(attributes.author).to.be.a("string");
        chai.expect(attributes.body).to.be.a("array");
        chai.expect(attributes.category).to.be.a("string");
        chai.expect(attributes.source_url).to.be.a("string");
        chai.expect(attributes.cover_url).to.be.a("string");
        chai.expect(attributes.retrieved_date).to.be.a("string");
        chai.expect(attributes.publication_date).to.be.a("string");
        chai.expect(attributes.image_gen).to.be.a("boolean");

        //Check if cover_url and source_url are valid urls
        chai
          .expect(attributes.cover_url)
          .to.match(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/);

        chai
          .expect(attributes.source_url)
          .to.match(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/);

        done();
      });
  });
});

describe("API - article.getAll", () => {
  it("Correct values and their types, not null, returns more than 2 articles", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .get("/article.getAll")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");

        const articles = res.body.data;

        // Checks if there are more than 2 articles
        chai.expect(articles.length).to.be.greaterThan(2);

        // Checks each article in the array
        articles.forEach((article) => {
          // Checks if all the attributes are present
          chai.expect(article).to.have.property("id");
          chai.expect(article).to.have.property("name");
          chai.expect(article).to.have.property("body");

          // Checks if they have values and not null
          chai.expect(article.id).to.not.equal(null);
          chai.expect(article.name).to.not.equal(null);
          chai.expect(article.body).to.not.equal(null);

          // Checks if values have correct data types
          chai.expect(article.id).to.be.a("number");
          chai.expect(article.name).to.be.a("string");
          chai.expect(article.body).to.be.an("array");
        });

        done();
      });
  });
});

describe("API - article.getAllImageGen", () => {
  it("Returns all articles with image_gen = true. Checks for values and their types", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .get("/article.getAllImageGen")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");

        const articles = res.body.data;

        // Checks each article in the array
        articles.forEach((article) => {
          // Checks if all the attributes are present
          chai.expect(article).to.have.property("id");
          chai.expect(article).to.have.property("name");

          // Checks if they have values and not null
          chai.expect(article.id).to.not.equal(null);
          chai.expect(article.name).to.not.equal(null);

          // Checks if values have correct data types
          chai.expect(article.id).to.be.a("number");
          chai.expect(article.name).to.be.a("string");
        });

        done();
      });
  });
});

describe("API - article.search.domain", () => {
  it("Returns articles with embbedings. Checks for values and their types", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .get("/article.search.domain")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");

        const articles = res.body.data;

        // Checks each article in the array
        articles.forEach((article) => {
          // Checks if all the attributes are present
          chai.expect(article).to.have.property("id");
          chai.expect(article).to.have.property("name");
          chai.expect(article).to.have.property("embbeded_name");

          // Checks if they have values and not null
          chai.expect(article.id).to.not.equal(null);
          chai.expect(article.name).to.not.equal(null);
          chai.expect(article.embbeded_name).to.not.equal(null);

          // Checks if values have correct data types
          chai.expect(article.id).to.be.a("number");
          chai.expect(article.name).to.be.a("string");
          chai.expect(article.embbeded_name).to.be.an("string");
        });

        done();
      });
  });
});

describe("API - article.summary", () => {
  it("Correct values and their types, not null", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .get("/article.summary")
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");

        const articles = res.body.data.entertainment;

        articles.forEach((article) => {
          // Checks if all the attributes are present
          chai.expect(article).to.have.property("name");
          chai.expect(article).to.have.property("cover_url");
          chai.expect(article).to.have.property("category");
          chai.expect(article).to.have.property("image_gen");

          // Checks if they have values and not null
          chai.expect(article.name).to.not.equal(null);
          chai.expect(article.cover_url).to.not.equal(null);
          chai.expect(article.category).to.not.equal(null);
          chai.expect(article.image_gen).to.not.equal(null);

          // Checks if values have correct data type
          chai.expect(article.name).to.be.a("string");
          chai.expect(article.cover_url).to.be.a("string");
          chai.expect(article.category).to.be.a("string");
          chai.expect(article.image_gen).to.be.a("boolean");

          // Check if cover_url is a valid url
          chai
            .expect(article.cover_url)
            .to.match(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/);
        });

        done();
      });
  });
});

describe("API - article.create_raw", () => {
  const article = {
    articles: [
      {
        name: "Paraphraseda Namdasdasde of the article",
        author: "Test author",
        publication_date: "2023-11-10T17:27:02Z",
        body: ["Paragraph 1", "Paragraph 2", "Paragraph 3"],
        category: "news",
        source_url: "http://example.com",
        cover_url: "http://example.com/cover.jpg",
        embbeded_name: "0.0240164",
      },
    ],
  };

  it("Returns 401 if token is not provided", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create_raw")
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(401);
        chai.expect(res.body.error.message).to.be.equal("Token not provided");
        chai.expect(res.body.error.type).to.be.equal("TokenError");
        done();
      });
  });

  it("Returns 401 if token is invalid", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create_raw")
      .set("Authorization", "INVALID_TOKEN")
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(401);
        chai.expect(res.body.error.message).to.be.equal("Token is not valid");
        chai.expect(res.body.error.type).to.be.equal("TokenError");
        done();
      });
  });

  it("Returns 403 if token is valid but not for scrapy module", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create_raw")
      .set("Authorization", REWRITER_TOKEN)
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(403);
        chai
          .expect(res.body.error.message)
          .to.be.equal("Insufficient permissions");
        chai.expect(res.body.error.type).to.be.equal("TokenError");
        done();
      });
  });

  it("Inserts article in the database for scrapy module", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create_raw")
      .set("Authorization", SCRAPY_TOKEN)
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });
});

describe("API - article.create", () => {
  const article = {
    articles: [
      {
        id: 1,
        name: "Paraphraseda Name of the article",
        body: ["Parapfdfdfdhrased"],
      },
    ],
  };

  it("Returns 401 if token is not provided", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create")
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(401);
        chai.expect(res.body.error.message).to.be.equal("Token not provided");
        chai.expect(res.body.error.type).to.be.equal("TokenError");
        done();
      });
  });

  it("Returns 401 if token is invalid", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create_raw")
      .set("Authorization", "INVALID_TOKEN")
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(401);
        chai.expect(res.body.error.message).to.be.equal("Token is not valid");
        chai.expect(res.body.error.type).to.be.equal("TokenError");
        done();
      });
  });

  it("Returns 403 if token is valid but not for re-writer module", (done) => {
    chai
      .request(BASE_URL + PORT_NUMBER)
      .post("/article.create")
      .set("Authorization", SCRAPY_TOKEN)
      .send(article)
      .end((_, res) => {
        chai.expect(res.status).to.be.equal(403);
        chai
          .expect(res.body.error.message)
          .to.be.equal("Insufficient permissions");
        chai.expect(res.body.error.type).to.be.equal("TokenError");
        done();
      });
  });
});
