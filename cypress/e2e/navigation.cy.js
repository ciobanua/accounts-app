describe("Main page", () => {
  it("should change local langugage", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/en");

    cy.contains("List accounts");
    cy.contains("Add new account");

    // change language
    cy.get('[role="combobox"]').click();
    cy.contains("fr").click();

    // links have changed
    cy.url().should("include", "/fr");
    cy.contains("FR: List accounts");
    cy.contains("FR: Add new account");
  });

  it("navigation should work", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/en");

    // change language
    cy.get('[role="combobox"]').click();
    cy.contains("fr").click();

    // links have changed
    cy.url().should("include", "/fr");
    cy.contains("FR: List accounts").click();
    cy.url().should("include", "/fr/liste-comptes");

    cy.contains("FR: Add new account").click();
    cy.url().should("include", "/fr/ajouter-compte");

    // return home
    cy.getByTestId("home").click();
    cy.contains("FR: ");
  });
});
