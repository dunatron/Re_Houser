/// <reference types="cypress" />
import 'cypress-graphql-mock';

context('Signup', () => {
  it('Should be able to signup', () => {
    cy.signup();
  });
});
