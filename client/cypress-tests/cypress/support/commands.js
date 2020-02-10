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
  // I believe we can setup the recaptcha stuff here and then do an execute??
  //   cy.window().then(win => {
  //     win.document
  //       .querySelector("iframe[src*='recaptcha']")
  //       .contentDocument.getElementById('recaptcha-token')
  //       .click();
  //   });
});
Cypress.Commands.add('register', (email, password) => {});
Cypress.Commands.add('login', (email, password) => {
  cy.visit(Cypress.env('BASE_URL') + '/login');
  cy.get('[data-cy=sign-in-tab]').click();
  cy.get('[data-cy=email]').type(Cypress.env('USER_USERNAME'));
  cy.get('[data-cy=password]').type(Cypress.env('USER_USERNAME'));
  cy.clickRecaptcha();
  cy.get('[data-cy=submit-login]').click();
  //   cy.get('[data-cy=submit]').click()
  //   sign-in-tab
});
