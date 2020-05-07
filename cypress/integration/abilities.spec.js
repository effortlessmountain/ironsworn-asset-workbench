/// <reference types="Cypress" />

describe("abilities", () => {
    it("can name an ability", () => {
        cy.visit("http://localhost:3000")
        cy.contains('your asset', { matchCase: false }).click()
        cy.contains('abilities', { matchCase: false }).click()
        cy.contains('Add').click()
        cy.get(".ability-name-input").type("Stronk")

        cy.get(".ability-name").should('have.text', "Stronk")
    })
    it("can put in ability text", () => {
        const abilityText = "Add +1 to Iron rolls"
        cy.get('.ability-text-input').type(abilityText)
        cy.get(".ability-text").should("have.text", abilityText)
    })
})