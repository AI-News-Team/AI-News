beforeEach(() => {
  cy.visit("localhost:3000");
});

describe('showing the basics of site are up', () => {
  it('title showing', () => {
      cy.title().should('eq', 'AI Daily');
      cy.url().should('include', 'localhost:3000')
    });

  it('News sections showing', () => {
     
      cy.contains('NEWS').click()
      cy.url().should('include', '/news')
    })
    
    it('Sport sections showing', () => {
      cy.contains('SPORT').click()
      cy.url().should('include', '/sport')
    })

    it('GARDENING sections showing', () => {
      cy.contains('GARDENING').click()
      cy.url().should('include', '/gardening')
    })

    it('POLITICS sections showing', () => {
      cy.contains('POLITICS').click()
      cy.url().should('include', '/politics')
    })

    it('WORLD sections showing', () => {
      cy.contains('WORLD').click()
      cy.url().should('include', '/world')
    })
    

    it('MOTORING sections showing', () => {
      cy.contains('MOTORING').click()
      cy.url().should('include', '/motoring')
    })

    it('BUSINESS sections showing', () => {
      cy.contains('BUSINESS').click()
      cy.url().should('include', '/business')
    })

    it('CULTURE sections showing', () => {
      cy.contains('CULTURE').click()
      cy.url().should('include', '/culture')
    })
    

  });