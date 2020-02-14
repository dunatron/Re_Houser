import 'cypress-graphql-mock';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('clickRecaptcha', () => {
  cy.get(
    '[data-cy="signup-recaptcha-component"] > :nth-child(1) > [style="width: 304px; height: 78px;"] > div > iframe'
  ).then($element => {
    const $body = $element.contents().find('body');
    const $recaptchaAnc = $element
      .contents()
      .find('#recaptcha-anchor')
      .click();
  });
  cy.wait(3000); // you need to wait for the token to generate
});
Cypress.Commands.add('signup', (email, password) => {
  cy.fixture('user').then(user => {
    cy.visit(Cypress.env('BASE_URL') + '/login');
    // cy.get('[data-cy=sign-up-tab]').click();
    cy.get('[data-cy=signup-firstName]').type(user.firstName);
    cy.get('[data-cy=signup-lastName]').type(user.lastName);
    cy.get('[data-cy=signup-phone]').type(user.phone);
    cy.get('[data-cy=signup-email]').type(user.email);
    cy.get('[data-cy=signup-password]').type(user.password);
    cy.clickRecaptcha();
    cy.get('[data-cy=submit-signup]').click();
    cy.wait(5000);
  });
});
Cypress.Commands.add('login', (email, password) => {
  cy.fixture('user').then(user => {
    cy.visit(Cypress.env('BASE_URL') + '/login');
    cy.get('[data-cy=sign-in-tab]').click();
    cy.get('[data-cy=email]').type(user.email);
    cy.get('[data-cy=password]').type(user.password);
    cy.clickRecaptcha();
    cy.get('[data-cy=submit-login]').click();
  });
});
