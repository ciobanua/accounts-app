describe("List accounts", () => {
  it("should display and filter accounts", () => {
    cy.visit("http://localhost:3000/en");

    cy.contains("List accounts").click();
    cy.wait(500);

    cy.get("h1").contains("List accounts");
    cy.get('[data-cy="card"]').should("have.length", 8);

    // search by currency
    cy.get("input").type("EUR{enter}");
    cy.location("search").should("include", "?currency=EUR");
    cy.get('[data-cy="card"]').should("have.length", 3);
  });
});
