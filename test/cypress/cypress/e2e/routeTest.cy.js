
beforeEach(() => {
  cy.visit("localhost:3000");
});



describe('showing the basics of site are up', () => {

    it('title showing', () => {
      cy.title().should('eq', 'AI Daily');
      cy.url().should('include', 'localhost:3000')
        })

    it('News sections showing', () => {
        cy.contains('NEWS').click()
      cy.url().should('include', '/news')
      let start = cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count4 = lenele
      if (lenele <= 50){
      for (let i = 0; i < count4; i++) { 

        cy.get('#root').find('a img').then($elements => {
          let elementsToClick = $elements;
          count4 = elementsToClick.length; 
          lenele = elementsToClick.length;
          cy.wrap(elementsToClick[i]).each(($ele)=> {
            cy.wrap($ele).click()
            const isVisible = cy.get("#root").should('be.visible')
              cy
              .wait(50)
              .go('back')
              .log("expected: "+ count4)
              .log("Current: "+ i)
              .wait(50)})}).then(($btn) => {
                if (i = count4) {
                  cy.end()
                }})}}
              })
            })    

    
    it('Sport route up', () => {
      cy.contains('SPORT').click()
      cy.url().should('include', '/sport')

      let start = cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count3 = lenele
      if (lenele <= 50){
      for (let i = 0; i < count3; i++) { 
      
        cy.get('#root').find('a img').then($elements => {
          let elementsToClick = $elements;
          count6 = elementsToClick.length; 
          lenele = elementsToClick.length;
          cy.wrap(elementsToClick[i]).each(($ele)=> {
            cy.wrap($ele).click()
            const isVisible = cy.get("#root").should('be.visible')
              cy
              .wait(50)
              .go('back')
              .log("expected: "+ count3)
              .log("Current: "+ i)
              .wait(50)})}).then(($btn) => {
                if (i = count3) {
                  cy.end()
                }})}}})
                
              })
    
    it('GARDENING route up', () => {
      cy.contains('GARDENING').click()
      cy.url().should('include', '/gardening')

      let start = cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count9 = lenele
      if (count9 <= 50){
      for (let i = 0; i < count9; i++) { 
        cy.get('#root').find('a img').then($elements => {
          let elementsToClick = $elements;
          count9 = elementsToClick.length; 
          lenele = elementsToClick.length;
          cy.wrap(elementsToClick[i]).each(($ele)=> {
            cy.wrap($ele).click()
            const isVisible = cy.get("#root").should('be.visible')
              cy
              .wait(50)
              .go('back')
              .log("expected: "+ count9)
              .log("Current: "+ i)
              .wait(50)})}).then(($btn) => {
                if (i = count9) {
                  cy.end()
                }})}}else{
                  count9 = 49
                }
              })
              })
                

    it('POLITICS route up', () => {
      cy.contains('POLITICS').click()
      cy.url().should('include', '/politics')

      let start = cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count6 = lenele
      if (lenele <= 50){
       for (let i = 0; i < count6; i++) { 
      
        cy.get('#root').find('a img').then($elements => {
          let elementsToClick = $elements;
          count6 = elementsToClick.length; 
          lenele = elementsToClick.length;
          cy.wrap(elementsToClick[i]).each(($ele)=> {
            cy.wrap($ele).click()
            const isVisible = cy.get("#root").should('be.visible')
              cy
              .wait(50)
              .go('back')
              .log("expected: "+ count6)
              .log("Current: "+ i)
              .wait(50)})}).then(($btn) => {
                if (i = count6) {
                  cy.end()
                 }})}}})
              })
        
      
    it('World route up', () => {
      cy.contains('WORLD').click()
      cy.url().should('include', '/world')

      let start = cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count2 = lenele
      if (lenele >= 50){count2 = 49}
      for (let i = 0; i < count2; i++) { 
        cy.get('#root').find('a img').then($elements => {
          let elementsToClick = $elements;
          count2 = elementsToClick.length; 
          lenele = elementsToClick.length;
          cy.wrap(elementsToClick[i]).each(($ele)=> {
            cy.wrap($ele).click()
            const isVisible = cy.get("#root").should('be.visible')
              cy
              .wait(50)
              .go('back')
              .log("expected: "+ count2)
              .log("Current: "+ i)
              .wait(50)})}).then(($btn) => {
                if (i = count2) {
                  cy.end()
                }})}})
            })
     

       
        it('MOTORING route up', () => {
          cy.contains('MOTORING').click()
          cy.url().should('include', '/motoring')

          let start = cy.get('#root').find('a img').then($elements2 =>{ 
          let clicking = $elements2;
          let lenele = clicking.length
          let count7 = lenele
          if (lenele <= 50){
          for (let i = 0; i < count7; i++) {   
            
              cy.get('#root').find('a img').then($elements => {
                let elementsToClick = $elements;
                count6 = elementsToClick.length; 
                lenele = elementsToClick.length;
                cy.wrap(elementsToClick[i]).each(($ele)=> {
                  cy.wrap($ele).click()
                  const isVisible = cy.get("#root").should('be.visible')
                    cy
                    .wait(50)
                    .go('back')
                    .log("expected: "+ count7)
                    .log("Current: "+ i)
                    .wait(50)})}).then(($btn) => {
                      if (i = count7) {
                        cy.end()
                       }})}}})
                      })

    it('BUSINESS sections showing', () => {

      cy.contains('BUSINESS').click()
      cy.url().should('include', '/business')

      cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count = lenele
      if (lenele <= 50){
      for (let i = 0; i < count; i++) {  
      cy.get('#root').find('a img').then($elements => {
        let elementsToClick = $elements;
        count = elementsToClick.length; 
        lenele = elementsToClick.length;
        cy.wrap(elementsToClick[i]).each(($ele)=> {
          cy.wrap($ele).click()
          const isVisible = cy.get("#root").should('be.visible')
            cy
            .wait(50)
            .go('back')
            .log("expected: "+ count)
            .log("Current: "+ i)
            .wait(50)})}).then(($btn) => {
              if (i = count) {
                cy.end()
               }})}}})
              })
              
    it('CULTURE sections showing', () => {
      cy.contains('CULTURE').click()
      cy.url().should('include', '/culture')

      cy.get('#root').find('a img').then($elements2 =>{ 
      let clicking = $elements2;
      let lenele = clicking.length
      let count8 = lenele
      if (lenele <= 50){
      for (let i = 0; i < count8; i++) { 
      
      cy.get('#root').find('a img').then($elements => {
        let elementsToClick = $elements;
        count8 = elementsToClick.length; 
        lenele = elementsToClick.length;
        cy.wrap(elementsToClick[i]).each(($ele)=> {
          cy.wrap($ele).click()
          const isVisible = cy.get("#root").should('be.visible')
            cy
            .wait(50)
            .go('back')
            .log("expected: "+ count8)
            .log("Current: "+ i)
            .wait(50)})}).then(($btn) => {
              if (i = count8) {
                cy.end()
               }})}}})
              }) 
    
})