beforeEach(() => {
    cy.visit("localhost:3000");
});

describe('Find authors at smashing', () => {
    it('Find the author Ramona Schwering', () => {
        cy.log('This is our brand-new test');
        cy.get('.headline-content', { timeout: 10000 }).should('be.visible');
        cy.get('.main').contains('NEWS').then(($myElement) => {
            //doSomething($myElement)
            //cy.get($myElement)..should('be.visible').and($img)
            //cy.get('div[class="image"]').find("img").should('be.visible');
            cy.get('$myElement[class="image"]').find("img").should('be.visible');
          });
        cy.get('.main').contains('SPORT');
        cy.get('.main').contains('POLITICS');
        cy.get('.main').contains('WORLD');
        cy.get('.main').contains('GARDENING');
        cy.get('.main').contains('MOTORING');
        cy.get('.main').contains('BUSINESS');
        cy.get('.main').contains('CULTURE');
        //cy.get('.my-slow-selector', { timeout: 10000 };)
        // Navigate to author’s article
        //cy.get('h2 > a').first().click();
    });
  });
