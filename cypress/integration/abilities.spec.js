/// <reference types="Cypress" />

describe("abilities", () => {
    it("can name an ability", () => {
        cy.visit("http://localhost:3000")
        cy.contains('your asset', { matchCase: false }).click()
        cy.get('#show-abilities-view').click()
        cy.contains('Add').click()
        cy.get(".ability-name-input").type("Strong")
        cy.get(".ability-name").should('have.text', "Strong")
    })
    it("can put in ability text", () => {
        const abilityText = "Add +1 to Iron rolls"
        cy.get('.ability-text-input').type(abilityText)
        cy.get(".ability-text").should("have.text", abilityText)
    })
    it("can mark an ability as filled", () => {
        cy.get('.dot').should('have.class', 'unfilled')
        cy.get('.ability-filled-input').click()
        cy.get('.dot').should('have.class', 'filled')
    })
    it("can remove an ability", () => {
        cy.get('.abilities').should('not.be.empty')
        cy.get('.remove-ability').click()
        cy.get('.abilities').should('be.empty')
    })
})