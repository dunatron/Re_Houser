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
  headline: 'I am the headline for the property',
  bathrooms: 2,
  garages: 2,
  carportSpaces: 6,
  offStreetSpaces: 3,
  accomodation: [
    {
      size: 5,
      rent: 170,
      expenses: 20,
      description: 'A nice room I swear',
    },
  ],
};

context('Add Property Spec', () => {
  before(() => {
    cy.visit(Cypress.env('BASE_URL') + '/properties/add');
  });
  // beforeEach(() => {});

  it('Can visit the add property page', () => {
    cy.visit(Cypress.env('BASE_URL') + '/properties/add');
  });

  /**
   * cant actually access this due to security. try create a card using graphql here
   */
  it('Will need to create a credit card', () => {
    cy.get('[data-cy=toggle-card-creator]').click();
    cy.wait(5000);
  });

  it('should fill out creditcard', () => {
    cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242');
    cy.getWithinIframe('[name="exp-date"]').type('4242');
    cy.getWithinIframe('[name=exp-date]').type('1232');
    cy.getWithinIframe('[name="cvc"]').type('987');
    cy.getWithinIframe('[name="postal"]').type('12345');

    // adjust this to use your own pay now button
    // cy.get('[data-cy="pay-now"]').click();
    cy.get('[data-cy=create-card-btn]').click();
    cy.wait(5000);
    cy.get('[data-cy=make-primary-card-btn]')
      .first()
      .click();
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
    // cy.get('property_indoorfeatures_multiselect')
    // Indoor features
    cy.get(
      ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root'
    ).click();
    cy.get('[data-value="DISHWASHER"]').click();
    cy.get('[data-value="FURNISHED"]').click();
    cy.get('.MuiPopover-root').click();
    // outdoor features
    cy.get(
      ':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root'
    ).click({ force: true });
    cy.get('[data-value="SWIMMING_POOL"]').click();
    cy.get('[data-value="FULLY_FENCED"]').click();
    cy.get('.MuiPopover-root').click();
    cy.get('[data-cy=property_headline_input]').type(property.headline);

    // for (accomodation in property.accomodation) {
    // cy.get('[data-cy=accomodation-room-size]').type(accomodation.size);
    // cy.get('[data-cy=accomodation-room-rent]').type(accomodation.rent);
    // cy.get('[data-cy=accomodation-room-expenses]').type(
    //   accomodation.expenses
    // );
    // cy.get('[data-cy=accomodation-room-description]').type(
    //   accomodation.description
    // );
    // }
    for (let step = 0; step < property.accomodation.length; step++) {
      cy.get('[data-cy=add-accomodation-btn]').click();
      const accomodation = property.accomodation[step];
      cy.get('[data-cy=accomodation-room-size]').type(accomodation.size);
      cy.get('[data-cy=accomodation-room-rent]').type(accomodation.rent);
      cy.get('[data-cy=accomodation-room-expenses]').type(
        accomodation.expenses
      );
      cy.get('[data-cy=accomodation-room-description]').type(
        accomodation.description
      );
      cy.get('[data-cy=create-accomodation-btn]').click();
    }
    cy.wait(1000);
    // cy.get('[data-cy=property_indoorfeatures_multiselect]').type('APARTMENT', {
    //   force: true,
    // });
  });
});
