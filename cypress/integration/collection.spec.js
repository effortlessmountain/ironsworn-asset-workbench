/// <reference types="Cypress" />

describe("managing a collection", () => {
    describe("creating an asset", () => {
        it("can get to the main screen with no assets", () => {
            cy.visit("http://localhost:3000")
            cy.get('.asset-selection-controls').should('be.empty')
        })
        it("can create a blank asset", () => {
            cy.contains('add new asset', { matchCase: false }).click()
            cy.get('.add-new-asset', { matchCase: false }).click()
            cy.get('.asset-back-button').click()
            cy.get('.asset-selection-controls').children().eq(0).should('have.text', "Your Asset")
        })
        it("can create an asset from an example", () => {
            cy.contains('add new asset', { matchCase: false }).click()
            cy.contains('Ironclad').click()
            cy.get('.asset-back-button').click()
            cy.get('.asset-selection-controls').children().eq(1).should('contain.text', 'Ironclad')
        })
        it("can delete assets", () => {
            cy.contains('Ironclad').click()
            cy.contains('DELETE ASSET').click()
            cy.contains('Your Asset').click()
            cy.contains('DELETE ASSET').click()
            cy.get('.asset-selection-controls').should('be.empty')
            // to ensure localstorage was updated. Note that moving this to another test doesn't work unless the test makes the app persist to localstorage again because Cypress clears localstorage between tests.
            cy.reload()
            cy.get('.asset-selection-controls').should('be.empty')
        })
    })
})