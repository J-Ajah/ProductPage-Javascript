/// <reference types="cypress" />

describe("Product Page Test",()=>{
 
    before(()=>{
        cy.visit("http://localhost:90/myWebFolders/ProductPage-Javascript")
    })

    it("Verify that that products are been displayed on the page",()=>{
        cy.url().should("include","ProductPage-Javascript").then(()=>{
            cy.get('[class="div-of-prods"]').should("be.visible")
        });

        cy.get('[class="div-of-prods"]').then((elem)=>{
            cy.get(elem.children().first()).should("have.class","info-div").as("container");
            cy.get("@container").children().first().should("have.text"," Recent Products ")
        })
        
    
    })

    it("Iterating over the products and adding 5 Products to cart",()=>{
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

    it("Validate that Item prices are been displayed",()=>{
       
        cy.get(".cart-container").find("div").should('have.class', 'individual-products').then((elements)=>{
            cy.get(elements).find("h4").should("have.class","price").then((price)=>{
                cy.get(".individual-products h4 > span").then((priceText)=>{
                    expect(priceText.val()).to.be.a("string")
                })
            })
        })
    })



    // For Records
    // cypress run --record --key 541655b6-68e8-482b-a24b-46c96b81a1c9

    
})