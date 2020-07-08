// Cypress.config("baseURL", Cypress.env("host"))
const baseURL = Cypress.config("baseURL");
describe("/people", () => {
  it("lists people", () => {
    cy.log(Cypress.config("baseURL"));
    cy.visit(`${baseURL}/people`)
      .get(".no-results")
      .contains("There are no people");
  });
});
describe("/people/add", () => {
  it("allows you to add a person", () => {
    cy.visit(`${baseURL}/people/add`)
      cy.get("#firstName")
        .type("Fred")
        .get("#lastName")
        .type("Perry")
        .get("#email")
        .type("fred.perry@thejump.tech")

      cy.contains("Add Person")
        .click();

        cy.visit(`${baseURL}/people`)
          .get(".peopleListDisplay")
          .contains("Fred Perry (fred.perry@thejump.tech");

  });
});
