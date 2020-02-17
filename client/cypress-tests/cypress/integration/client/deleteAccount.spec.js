/// <reference types="cypress" />
import 'cypress-graphql-mock';

context('Login', () => {
  // beforeEach(() => {
  //   cy.visit('https://example.cypress.io/commands/actions')
  // })
  before(() => {
    cy.login();
  });
  beforeEach(() => {
    cy.task('getSchema').then(schema => {
      cy.mockGraphql({
        schema,
        operations: {},
      });
    });
  });

  it('Should login', () => {});

});
