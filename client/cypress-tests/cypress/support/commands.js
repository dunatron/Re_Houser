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

let newApplications = [];

let cookiesCache = {};
export function saveCookies() {
  cy.getCookies().then(cookies => {
    cookies.forEach(({ name, ...rest }) => {
      cookiesCache[name] = {
        name,
        ...rest,
      };
    });
  });
}
export function loadCookies() {
  Object.keys(cookiesCache).forEach(key => {
    const { name, value, ...rest } = cookiesCache[key];
    cy.setCookie(name, value, rest);
  });
}

before(() => {
  // will need to register
  cy.signup();
  cy.ensureLoggedIn();
  // cy.login();
});

after(() => {
  cy.deleteAccount();
});

beforeEach(() => {
  loadCookies();
});

afterEach(() => {
  saveCookies();
});

Cypress.Commands.add('clickSignInRecaptcha', () => {
  cy.get(
    '[data-cy="signin-recaptcha-component"] > :nth-child(1) > [style="width: 304px; height: 78px;"] > div > iframe'
  ).then($element => {
    const $body = $element.contents().find('body');
    const $recaptchaAnc = $element
      .contents()
      .find('#recaptcha-anchor')
      .click();
  });
  cy.wait(3000); // you need to wait for the token to generate
});
Cypress.Commands.add('clickSignUpRecaptcha', () => {
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
    cy.clickSignUpRecaptcha();
    cy.get('[data-cy=signup-email]').type(user.email);
    cy.get('[data-cy=signup-firstName]').type(user.firstName);
    cy.get('[data-cy=signup-lastName]').type(user.lastName);
    cy.get('[data-cy=signup-phone]').type(user.phone);
    cy.get('[data-cy=signup-password]').type(user.password);

    cy.get('[data-cy=submit-signup]').click();
    cy.wait(5000);
  });
});
Cypress.Commands.add('login', (email, password) => {
  cy.fixture('user').then(user => {
    cy.visit(Cypress.env('BASE_URL') + '/login');

    cy.get('[data-cy=sign-in-tab]').click();
    cy.wait(500);
    cy.get('[data-cy=email]').type(user.email);

    cy.get('[data-cy=password]').type(user.password);
    cy.clickSignInRecaptcha();
    cy.get('[data-cy=submit-login]').click();
    cy.wait(7000); // you need to wait for a) the token b) the shitty redirect which interfers
  });
});

Cypress.Commands.add('deleteAccount', (email, password) => {
  cy.fixture('user').then(user => {
    cy.visit(Cypress.env('BASE_URL') + '/account');
    cy.wait(5000);
    cy.get('[data-cy=launch-delete-account]').click();
    cy.get('[data-cy=delete-account-email]').type(user.email);
    cy.get('[data-cy=delete-account-password]').type(user.password);

    cy.get('[data-cy=delete-account-btn]').click();
    cy.wait(5000);
  });
});

Cypress.Commands.add('ensureLoggedIn', (email, password) => {
  // cy.visit(Cypress.env('BASE_URL') + '/login');
  cy.getCookie('token').then(tokenCookie => {
    if (tokenCookie !== null) return;
    cy.login();
  });
});

/**
 * Code to help interact with iFrames
 */
Cypress.Commands.add('iframeLoaded', { prevSubject: 'element' }, $iframe => {
  const contentWindow = $iframe.prop('contentWindow');
  return new Promise(resolve => {
    if (contentWindow && contentWindow.document.readyState === 'complete') {
      resolve(contentWindow);
    } else {
      $iframe.on('load', () => {
        resolve(contentWindow);
      });
    }
  });
});

Cypress.Commands.add(
  'getInDocument',
  { prevSubject: 'document' },
  (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add('getWithinIframe', targetElement =>
  cy
    .get('iframe')
    .iframeLoaded()
    .its('document')
    .getInDocument(targetElement)
);
