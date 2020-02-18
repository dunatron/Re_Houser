/// <reference types="cypress" />
import 'cypress-graphql-mock';

context('Login', () => {
  // beforeEach(() => {
  //   cy.visit('https://example.cypress.io/commands/actions')
  // })
  // before(() => {
  //   cy.login();
  // });
  // beforeEach(() => {
  //   cy.task('getSchema').then(schema => {
  //     cy.mockGraphql({
  //       schema,
  //       operations: {},
  //     });
  //   });
  // });

  it('Can delete the account', () => {
    cy.deleteAccount();
  });

  it('Will then need to signup so we can delete', () => {
    cy.signup();
  });
});
