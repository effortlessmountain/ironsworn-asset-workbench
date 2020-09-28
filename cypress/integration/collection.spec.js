/// <reference types="Cypress" />

const { makeAssetFixture } = require("../fixtures/assets");
const { makeCollectionFixture } = require("../fixtures/collections");

describe("managing a collection", () => {
  describe("creating an asset", () => {
    it("starts on New Asset screen when no assets in a collection", () => {
      cy.visit("http://localhost:3000");
      cy.get(".add-new-asset").should("exist");
    });
    it("can create a blank asset", () => {
      cy.get(".add-new-asset").click();
      cy.get(".asset-back-button").click();
      cy.get(".asset-selection-controls").children().eq(0).should("exist");
    });
    it("can create an asset from an example", () => {
      cy.contains("add new asset", { matchCase: false }).click();
      cy.contains("Ironclad").click();
      cy.get(".asset-back-button").click();
      cy.get(".asset-selection-controls")
        .children()
        .eq(1)
        .should("contain.text", "Ironclad");
    });
    it("can delete assets and shows the New Asset screen when none are left", () => {
      cy.contains("Ironclad").click();
      cy.contains("DELETE").click();
      cy.get(".asset-choice").click();
      cy.contains("DELETE").click();
      cy.get(".add-new-asset").should("exist");
      // to ensure localstorage was updated. Note that moving this to another test doesn't work unless the test makes the app persist to localstorage again because Cypress clears localstorage between tests.
      cy.reload();
      cy.get(".add-new-asset").should("exist");
    });
  });
  describe("navigation", () => {
    let asset1, asset2, asset3, collection;
    beforeEach(() => {
      asset1 = makeAssetFixture();
      asset2 = makeAssetFixture();
      asset2.name = "Second Asset";
      asset3 = makeAssetFixture();
      asset3.name = "Third Asset";
      collection = makeCollectionFixture([asset1, asset2, asset3]);

      //todo: figure out why this works since we don't start at localhost:3000
      localStorage.setItem("collections", JSON.stringify([collection]));
    });

    it("can handle going to an asset edit URI directly", () => {
      cy.visit("http://localhost:3000/assets/1/edit");
      cy.get(".asset-name").should("have.text", asset2.name);
    });

    it("can show an asset properly on pressing the back button", () => {
      cy.visit("http://localhost:3000");
      cy.contains(asset3.name).click();
      cy.get(".asset-back-button").click();
      cy.go("back");
      cy.get(".asset-name").should("have.text", asset3.name);
    });

    it("doesn't show a phantom asset that overrides an existing asset if edited when going back after deleting", () => {
      cy.visit("http://localhost:3000");
      cy.contains(asset2.name).click();
      cy.contains("DELETE").click();
      cy.go("back");
      cy.get(".asset-name").should("have.text", asset3.name);
    });
  });
});
