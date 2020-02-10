/// <reference types="cypress" />

context('Login', () => {
  // beforeEach(() => {
  //   cy.visit('https://example.cypress.io/commands/actions')
  // })

  // https://on.cypress.io/interacting-with-elements

  it('should visit the login page and login', () => {
    cy.visit('http://localhost:7777/');
    cy.login();
  });
});
