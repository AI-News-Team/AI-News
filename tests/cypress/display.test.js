beforeEach(() => {
  cy.visit("localhost:3000");
});

describe("Find authors at smashing", () => {
  it("Find the author Ramona Schwering", () => {
    cy.log("This is our brand-new test");
    cy.get(".headline-content", { timeout: 10000 }).should("be.visible");
    cy.get(".main")
      .contains("news")
      .then(($myElement) => {
        //doSomething($myElement)
        //cy.get($myElement)..should('be.visible').and($img)
        //cy.get('div[class="image"]').find("img").should('be.visible');
        cy.get('$myElement[class="image"]').find("img").should("be.visible");
      });
    cy.get(".main").contains("sport");
    cy.get(".main").contains("politics");
    cy.get(".main").contains("world");
    cy.get(".main").contains("gardening");
    cy.get(".main").contains("motoring");
    cy.get(".main").contains("business");
    cy.get(".main").contains("culture");
    cy.get(".flex.h-full.justify-between").contains("sport").should("exist");
    //cy.get('.my-slow-selector', { timeout: 10000 };)
    // Navigate to author’s article
    //cy.get('h2 > a').first().click();
  });
});
