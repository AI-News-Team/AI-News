beforeEach(() => {
  cy.visit("localhost:3000");
});

describe("CLIENT-SIDE = /politics route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/politics");
  });

  const article_header = "The defense spending bill will get a vote this week";

  it("Navigates to route", () => {
    cy.contains("POLITICS").click();
    cy.url().should("include", "/politics");
  });

  it("Has correct header", () => {
    cy.contains("h2", "POLITICS");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();
    cy.url().should("include", "/article/66");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});

describe("CLIENT-SIDE = /business route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/business");
  });

  const article_header =
    "Sea Creatures are important to the Dawn of the Animal Kingdom.";

  it("Navigates to route", () => {
    cy.contains("BUSINESS").click();
    cy.url().should("include", "/business");
  });

  it("Has correct header", () => {
    cy.contains("h2", "BUSINESS");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();

    cy.url().should("include", "/article/11");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});

describe("CLIENT-SIDE = /world route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/world");
  });

  const article_header =
    "The ability to Climb Down must be changed by what goes up a tree.";

  it("Navigates to route", () => {
    cy.contains("WORLD").click();
    cy.url().should("include", "/world");
  });

  it("Has correct header", () => {
    cy.contains("h2", "WORLD");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();
    cy.url().should("include", "/article/12");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("img").should("have.length", 4);
    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});

describe("CLIENT-SIDE = /style route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/style");
  });

  const article_header =
    "The migrant drama won the award for best drama at the Venice Film Festival.";

  it("Navigates to route", () => {
    cy.contains("STYLE").click();
    cy.url().should("include", "/style");
  });

  it("Has correct header", () => {
    cy.contains("h2", "STYLE");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();
    cy.url().should("include", "/article/71");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("img").should("have.length", 4);
    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});

describe("CLIENT-SIDE = /science route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/science");
  });

  const article_header =
    "It's possible to remove the Dinosaurs and allow many flowers to bloom.";

  it("Navigates to route", () => {
    cy.contains("SCIENCE").click();
    cy.url().should("include", "/science");
  });

  it("Has correct header", () => {
    cy.contains("h2", "SCIENCE");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();
    cy.url().should("include", "/article/14");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("img").should("have.length", 4);
    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});

describe("CLIENT-SIDE = /tech route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/tech");
  });

  const article_header = "Hunter-Gatherers have a history in Europe.";

  it("Navigates to route", () => {
    cy.contains("TECH").click();
    cy.url().should("include", "/tech");
  });

  it("Has correct header", () => {
    cy.contains("h2", "TECH");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();
    cy.url().should("include", "/article/9");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("img").should("have.length", 4);
    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});

describe("CLIENT-SIDE = /sport route", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/sport");
  });

  const article_header = "Lance Stroll had a huge crash at the Singapore GP.";

  it("Navigates to route", () => {
    cy.contains("SPORT").click();
    cy.url().should("include", "/sport");
  });

  it("Has correct header", () => {
    cy.contains("h2", "SPORT");
  });

  it("Articles are present", () => {
    cy.get("img").should("exist");
    cy.get("img").should("have.length.greaterThan", 1);
  });

  it("Can open first article", () => {
    cy.contains("div", article_header).click();
    cy.url().should("include", "/article/80");
  });

  it("Article is not empty", () => {
    cy.contains("div", article_header).click();

    cy.get("img").should("have.length", 4);
    cy.get("h1").should("exist").should("not.have.text", "");
    cy.get("h3").should("exist").should("not.have.text", "");
    cy.get("p").should("exist").should("not.have.text", "");
  });

  it("Can navigate back to home page", () => {
    cy.contains("div", article_header).click();

    cy.get(".text-white.text-5xl.font-black")
      .should("exist")
      .click({ force: true });

    cy.url().should("include", "/");
  });
});
