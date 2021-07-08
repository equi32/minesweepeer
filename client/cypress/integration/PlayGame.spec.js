/// <reference types="cypress" />

import routes from "../../src/constants/routes";
import en from "../../src/lang/en";

describe('<PlayGame />', () => {
    it('<PlayGame /> Check play game page', () => {
        cy.login();
        cy.get('[data-cy=main-new]').click();
        cy.get('[data-cy=new-rows]').type('20');
        cy.get('[data-cy=new-cols]').type('20');
        cy.get('[data-cy=new-mines]').type('30');
        cy.get('[data-cy=new-submit]').click();

        cy.get('[data-cy=play-title]').should('exist').invoke('text').should('include', 'play');
        cy.get('[data-cy=play-home]').should('exist').should('have.attr', 'href').should('eq', routes.HOME);
        cy.get('[data-cy=play-flags]').should('exist');
        cy.get('[data-cy=play-clock]').should('exist');
        cy.get('[data-cy=play-save]').should('exist');
        cy.get('[data-cy=play-restart]').should('exist');
        cy.get('[data-cy=play-cells]').should('exist');
    });

    it('<PlayGame /> Check play game back to home', () => {
        cy.get('[data-cy=play-home]').click();
        cy.url().should('eq', Cypress.config().baseUrl + routes.HOME);
    });
});