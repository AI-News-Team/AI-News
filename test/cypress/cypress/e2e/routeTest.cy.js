
beforeEach(() => {
  cy.visit("localhost:3000");
});



describe('showing the basics of site are up', () => {

    it('title showing', () => {
      cy.title().should('eq', 'AI Daily');
      cy.url().should('include', 'localhost:3000')
        })
/*
 
    it('News sections showing', () => {
      cy.contains('NEWS').click()
      cy.url().should('include', '/news')

      let count4 = 2
      for (let i = 0; i < count4; i++) { 

      cy.get('#root').find('a img').then($elements => {
        const elementsToClick = $elements;
        count4 = elementsToClick.length;
        Cypress.config(count4 = elementsToClick.length) 
        const lenele = elementsToClick.length;
        cy.log(lenele)
        cy.log(count4)
        count4 = lenele
        cy.wrap(elementsToClick[i]).then(($ele)=> {
           cy.wrap($ele).click()
           const isVisible = cy.get("#root").should('be.visible');
           cy.log(i)
             cy
             .wait(1000)
             .go('back')
             .wait(1000)}
             
        )})};}
    )

    
    it('Sport sections showing', () => {
      cy.contains('SPORT').click()
      cy.url().should('include', '/sport')

      let count3 = 2
      for (let i = 0; i < count3; i++) { 
      
      cy.get('#root').find('a img').then($elements => {
        const elementsToClick = $elements;
        count3 = elementsToClick.length;
        Cypress.config(count3 = elementsToClick.length) 
        const lenele = elementsToClick.length;
        cy.log(lenele)
        cy.log(count3)
        count3= lenele
        cy.wrap(elementsToClick[i]).then(($ele)=> {
           cy.wrap($ele).click()
           const isVisible = cy.get("#root").should('be.visible');
           cy.log(i)
             cy
             .wait(1000)
             .go('back')
             .wait(1000)}
             
        )})}}
    )
    
    
  
    it('GARDENING sections showing', () => {
      cy.contains('GARDENING').click()
      cy.url().should('include', '/gardening')
      let count9 = 2
      for (let i = 0; i < count9; i++) { 
      cy.get('#root').find('a img').then($elements => {
        const elementsToClick = $elements;
        count9 = elementsToClick.length;
        Cypress.config(count9 = elementsToClick.length) 
        const lenele = elementsToClick.length;
        cy.log(lenele)
        cy.log(count9)
        cy.wrap(elementsToClick[i]).then(($ele)=> {
           cy.wrap($ele).click()
           const isVisible = cy.get("#root").should('be.visible');
           cy.log(i)
             cy
             .wait(1000)
             .go('back')
             .wait(1000)})})
      }}
    )

     */
    it('POLITICS sections showing', () => {
      cy.contains('POLITICS').click()
      cy.url().should('include', '/politics')

      //let count6 = 2
      //let clicking = cy.get('#root').find('a img').wrap()
      let count6 = cy.get('#root').find('a img').then($elements2 =>{
      
      let clicking = $elements2;
      let lenele = clicking.length
      count6 = lenele
      cy.log(count6.length)
       //let i = 0
       //let count6 = lenele
       for (let i = 0; i < count6; i++) { 
      
        cy.get('#root').find('a img').then($elements => {
          let elementsToClick = $elements;
          count6 = elementsToClick.length;
          
          let lenele = elementsToClick.length;
          count6 = lenele;
          Cypress.config(count6 = lenele) 
          cy.wrap(elementsToClick[i]).each(($ele)=> {
            cy.wrap($ele).click()
            const isVisible = cy.get("#root").should('be.visible')
            cy.log(i)
            cy.log(count6)
              cy
              .wait(1000)
              .go('back')
              .wait(1000)})}).then(($btn) => {
                if (i = count6) {
                  cy.end()
                }})}})
                
          })
      
  

//loop the whole test 
//incrment the route number - localhost:3000/artical/{number here}
//cy.request('http://localhost:3001/article.getall')
/*
  it('articals showing - world', () => {
    cy.contains('WORLD').click()
     cy.url().should('include', '/world')

    let count2 = 2
    for (let i = 0; i < count2; i++) { 
     
    
     cy.get('#root').find('a img').then($elements => {
       const elementsToClick = $elements;
       count2 = elementsToClick.length;
       Cypress.config(count2 = elementsToClick.length) 
       const lenele = elementsToClick.length;
       cy.log(lenele)
       cy.log(count2)
       cy.wrap(elementsToClick[i]).then(($ele)=> {
          cy.wrap($ele).click()
          const isVisible = cy.get("#root").should('be.visible');
          cy.log(i)
            cy
            .wait(1000)
            .go('back')
            .wait(1000)})})
     }}
   )

       
    it('MOTORING sections showing', () => {
      let count7 = 2
     for (let i = 0; i < count7; i++) {   
          cy.contains('MOTORING').click()
          cy.url().should('include', '/motoring')
        cy.get('#root').find('a img').then($elements => {
        const elementsToClick = $elements;
        count7 = elementsToClick.length;
        Cypress.config(count7 = elementsToClick.length) 
        const lenele = elementsToClick.length;
        cy.log(lenele)
        cy.log(count7)
        cy.wrap(elementsToClick[i]).then(($ele)=> {
           cy.wrap($ele).click()
           const isVisible = cy.get("#root").should('be.visible');
           cy.log(i)
             cy
             .wait(1000)
             .go('back')
             .wait(1000)})})
      }}
    )

  
    it('BUSINESS sections showing', () => {
      let count = 2
      for (let i = 0; i < count; i++) {  
      cy.contains('BUSINESS').click()
      cy.url().should('include', '/business')
      cy.get('#root').find('a img').then($elements => {
        const elementsToClick = $elements;
        count = elementsToClick.length;
        Cypress.config(count = elementsToClick.length) 
        const lenele = elementsToClick.length;
        cy.log(lenele)
        cy.log(count)
        cy.wrap(elementsToClick[i]).then(($ele)=> {
           cy.wrap($ele).click()
           const isVisible = cy.get("#root").should('be.visible');
           cy.log(i)
             cy
             .wait(1000)
             .go('back')
             .wait(1000)})})
      }}
    )

 
    it('CULTURE sections showing', () => {
      let count8 = 2
      for (let i = 0; i < count8; i++) { 
      cy.contains('CULTURE').click()
      cy.url().should('include', '/culture')
      cy.get('#root').find('a img').then($elements => {
        const elementsToClick = $elements;
        count8 = elementsToClick.length;
        Cypress.config(count8 = elementsToClick.length) 
        const lenele = elementsToClick.length;
        cy.log(lenele)
        cy.log(count8)
        cy.wrap(elementsToClick[i]).then(($ele)=> {
           cy.wrap($ele).click()
           const isVisible = cy.get("#root").should('be.visible');
           cy.log(i)
             cy
             .wait(1000)
             .go('back')
             .wait(1000)})})
      }}
    )*/
   
  //});
    })