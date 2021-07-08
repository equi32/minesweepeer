/// <reference types="cypress" />

import routes from "../../src/constants/routes";
import en from "../../src/lang/en";

describe('<NewGame />', () => {
    it('<NewGame /> Check new game page', () => {
        cy.login();
        cy.get('[data-cy=main-new]').click();
        cy.get('[data-cy=new-title]').should('exist').invoke('text').should('include', en.WELCOME);
        cy.get('[data-cy=new-home]').should('exist').should('have.attr', 'href').should('eq', routes.HOME);
        cy.get('[data-cy=new-rows]').should('exist').should('have.prop', 'type').should('eq', 'number');
        cy.get('[data-cy=new-cols]').should('exist').should('have.prop', 'type').should('eq', 'number');
        cy.get('[data-cy=new-mines]').should('exist').should('have.prop', 'type').should('eq', 'number');
        cy.get('[data-cy=new-submit]').should('exist').should('have.text', en.START_GAME.toUpperCase());
    });

    it('<NewGame /> Check new game back to home', () => {
        cy.get('[data-cy=new-home]').click();
        cy.url().should('eq', Cypress.config().baseUrl + routes.HOME);
    });

    it('<NewGame /> Check new game creation', () => {
        cy.visit(routes.NEW_GAME);
        cy.get('[data-cy=new-rows]').type('20');
        cy.get('[data-cy=new-cols]').type('20');
        cy.get('[data-cy=new-mines]').type('30');
        cy.get('[data-cy=new-submit]').click();

        cy.url().should('eq', Cypress.config().baseUrl + routes.PLAY_GAME);
    });
});