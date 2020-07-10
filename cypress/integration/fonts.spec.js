/// <reference types="Cypress" />
import getAsset from '../fixtures/asset'


describe("the Font editing screen", () => {
    before(() => {
        //todo: figure out why this works since we don't start at localhost:3000
        localStorage.setItem('currentAsset', JSON.stringify(getAsset()))
    })
    it("can get to the Fonts edit screen", () => {
        cy.visit("http://localhost:3000")
        cy.contains('Strong', { matchCase: false }).click()
        cy.get('#show-fonts-view').click()
    })

    describe("updating font sizes", () => {
        it("can update the size of the Type", () => {
            cy.get('#asset-type-size-input').clear().type('1.7')
            cy.get('.type').should('have.css', 'font-size', '29.92px') // since Cypress can't get the value in em
            cy.get('#asset-type-size-input').type('9')
            cy.get('.type').should('have.css', 'font-size', '31.504px')
        })

        const inputs = [
            ['#asset-name-size-input', '.asset-name', '1.4', '24.64px'],
            ['#details-size-input', '.details', '1.5', '26.4px'],
            ['#track-size-input', '.value', '1.6', '28.16px']
        ]

        inputs.forEach(([input, target, inputtedEm, expectedPx]) => {
            it(`can update the size of ${target}`, () => {
                cy.get(input).clear().type(inputtedEm)
                cy.get(target).should('have.css', 'font-size', expectedPx)
            })
        })
    })

    describe("updating font families", () => {
        const fonts = [
            ["#asset-type-font-input", ".type", "Source Sans Pro", '"Source Sans Pro"'],
            ["#asset-name-font-input", ".asset-name", "Rubik", "Rubik"],
            ["#details-font-input", ".details", "Indie Flower", '"Indie Flower"'],
            ["#track-font-input", ".value", "Kanit", "Kanit"]
        ]

        fonts.forEach(([input, target, inputtedFont, expectedFontFamily]) => {
            it(`can update the font of ${target} to ${inputtedFont}`, () => {
                cy.get(input).clear().type(inputtedFont)
                cy.get("#fonts-update-button").click()
                cy.get(target).should('have.css', 'font-family', expectedFontFamily)
            })
        })
    })
})