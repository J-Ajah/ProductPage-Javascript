describe("Product Page Test",()=>{
    var sum = 0;
    before(()=>{
        cy.visit("http://localhost:90/myWebFolders/ProductPage-Javascript")
    })
        
    it("Iterates and Clicks on each Item available",()=>{
        cy.get('[class="div-of-prods"]').find("ul").should(($elem)=>{
            expect($elem.children()).to.have.length(6);
          
        })

        cy.get('[class="div-of-prods"]').find("ul").children().each((item,index,list)=>{
            cy.clearCookies();
            cy.clearLocalStorage();
            cy.get(item).find("button").click({force:true});
            cy.get(".cart-container").find("div").should('have.class', 'individual-products').then((elements)=>{
                cy.log(elements)
            })
        })

    })

    it("Calculates the price of Items in the cart",()=>{
        let total = [];

     
       cy.get(".quantity span").each((item,index,position)=>{
      
           
           cy.get(item).then((price)=>{
          
            total.push(parseFloat(price.text()));
            cy.log(price.text())
        
           
         
           })
         
        cy.screenshot()

       })
   
       //calculates  the total items for each product
     
        Cypress.$('.quantity span').each(function() {
        sum += +Cypress.$(this).text()||0;
        });

        cy.log("The total calculated items amounted to")
        cy.log(sum)
       

       


       
        
       
    })


    it("Checks if the calculated total equals the total displayed",()=>{
        cy.get(".total-text span").then((item)=>{
            expect(parseFloat(item.text())).to.equal(sum)
        })
    })



})