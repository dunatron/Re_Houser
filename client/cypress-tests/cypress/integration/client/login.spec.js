/// <reference types="cypress" />
import 'cypress-graphql-mock';

context('Login', () => {
  // beforeEach(() => {
  //   cy.visit('https://example.cypress.io/commands/actions')
  // })
  beforeEach(() => {
    cy.task('getSchema').then(schema => {
      cy.mockGraphql({
        schema,
        operations: {},
      });
    });
  });

  it('Should mock getUser', () => {
    cy.mockGraphqlOps({
      operations: {
        getUser: {
          user: {
            id: 1,
            name: 'Name',
            email: 'Email',
          },
        },
      },
    });
    // cy.login();
  });

  // https://on.cypress.io/interacting-with-elements

  it('should visit the login page and login', () => {
    cy.visit('http://localhost:7777/');
    cy.mockGraphqlOps({
      operations: {
        userNameChange: variables => {
          if (!variables.name) {
            throw new GraphQLError('Name is required');
          }
        },
      },
    });
    // cy.login();
  });
});
