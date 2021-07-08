/// <reference types="cypress" />

import routes from "../../src/constants/routes";
import en from "../../src/lang/en";

describe('<LoadGame />', () => {
    it('<LoadGame /> Check load game page', () => {
        cy.login();
        cy.get('[data-cy=main-load]').click();
        cy.get('[data-cy=load-title]').should('exist').invoke('text').should('include', en.WELCOME);
        cy.get('[data-cy=load-home]').should('exist').should('have.attr', 'href').should('eq', routes.HOME);
        cy.get('[data-cy=load-games]').should('exist');
    });

    it('<LoadGame /> Check load game back to home', () => {
        cy.get('[data-cy=load-home]').click();
        cy.url().should('eq', Cypress.config().baseUrl + routes.HOME);
    });

    it('<LoadGame /> Check load game', () => {
        cy.visit(routes.LOAD_GAME);
        cy.get('[data-cy=load-games]').children().first().click();

        cy.url().should('eq', Cypress.config().baseUrl + routes.PLAY_GAME);
    });
});