/// <reference types="cypress" />
import 'cypress-graphql-mock';

const ADD_PROPERTY_OBJ = {
  geoSuggestId: '#Dunedin',
  location: '5 Monowai Road, Ravensbourne Dunedin',
  latitude: 'asdad',
  longitude: 'asddddd',
  type: '',
  indoorFeatures: [],
  outdoorFeatures: [],
  headline: '',
  bathrooms: 2,
  garages: 2,
  carportSpaces: 6,
  offStreetSpaces: 3,
};

context('Add Property Spec', () => {
  before(() => {
    cy.visit(Cypress.env('BASE_URL') + '/add/property');
  });
  // beforeEach(() => {});

  it('Can visit the add property page', () => {
    cy.visit(Cypress.env('BASE_URL') + '/add/property');
  });

  it('Can fill in the add property form', () => {
    const property = ADD_PROPERTY_OBJ;
    cy.get('[data-cy=property_type_select]').click();
    cy.get('[data-value="RETIREMENT_LIVING"]').click();
    cy.get('[data-cy=add_property_form]').within($form => {
      // you have access to the found form via
      // the jQuery object $form if you need it

      // cy.get() will only search for elements within form,
      // not within the entire document
      cy.get('.geosuggest__input').click();
      cy.get('.geosuggest__suggests').within($geoSuggestions => {
        cy.get(property.geoSuggestId).click();
      });
      cy.get('[data-cy=property_location_input]').type(property.location);
      // cy.get('[data-cy=property_type_select]').select('HOUSE', {
      //   force: true,
      // });

      // data-value="APARTMENT"
      //
      //   cy.get('[data-cy="property_latitude_input"]').type('test');
      //   cy.get('[data-cy="property_longitude_input"]').type('test');
      cy.get('[data-cy=property_bathrooms_input]').type(property.bathrooms);
      cy.get('[data-cy=property_garages_input]').type(property.garages);
      cy.get('[data-cy=property_offstreet_input]').type(
        property.offStreetSpaces
      );
      cy.get('[data-cy=property_bathrooms_input]').type(property.bathrooms);
      //   cy.root().submit();
    });
    // These selects are in modals outside of the form
    // cy.get('[data-cy=property_type_select]').type('APARTMENT', { force: true });
  });
});
