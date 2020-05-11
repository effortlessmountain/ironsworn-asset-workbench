/// <reference types="Cypress" />

describe("the Track editor screen", () => {
    it("can get to the Track edit screen", () => {
        cy.visit("http://localhost:3000")
        cy.contains('your asset', { matchCase: false }).click()
        cy.get('#show-track-view').click()
    })
    it("can select a numerical track", () => {
        cy.get('.asset').children().should('not.have.class', 'track')
        cy.get('#choose-track-numerical').click()
        cy.get('.asset').children().should('have.class', 'track')
        cy.get('.track').children().first().should('have.text', '0')
    })

    it("can change the track length", () => {
        cy.get('.track').children().should('contain.text', '5')
        cy.get('#track-number-input').clear().type('2')
        cy.get('.track').children().should('contain.text', '2')
        cy.get('.track').children().should('not.contain.text', '3')
    })

    it('can select a text track', () => {
        cy.get('#choose-track-text').click()
        cy.get('.track-options-input').clear().type("one, two")
        cy.get('.track').children().first().should('have.text', 'one')
        cy.get('.track').children().eq(1).should('have.text', 'two')
    })

    it("can select no track again", () => {
        cy.get('#choose-track-none').click()
        cy.get('.asset').children().should('not.have.class', 'track')
    })
})