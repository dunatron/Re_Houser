/// <reference types="cypress" />
import 'cypress-graphql-mock';

context('Signup', () => {
  // before(() => {
  //   cy.deleteAccount();
  // });
  // after(() => {
  //   cy.deleteAccount();
  // });
  it('Will firts need to delte the account due to our cypress setup', () => {
    cy.deleteAccount();
  });
  it('Should be able to signup', () => {
    cy.signup();
  });
});
