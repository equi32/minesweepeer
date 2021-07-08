/// <reference types="cypress" />

import routes from "../../src/constants/routes";
import en from "../../src/lang/en";

describe('<Main />', () => {
    it('<Main /> Check main page', () => {
        cy.login();
        cy.get('[data-cy=main-title]').should('exist').invoke('text').should('include', en.WELCOME);
        cy.get('[data-cy=main-logout]').should('exist');
        cy.get('[data-cy=main-new]').should('exist').should('have.attr', 'href').should('eq', routes.NEW_GAME);
        cy.get('[data-cy=main-load]').should('exist').should('have.attr', 'href').should('eq', routes.LOAD_GAME);
    });

    it('<Main /> Check logout button', () => {
        //Logout
        cy.get('[data-cy=main-logout]').click();
        cy.url().should('eq', Cypress.config().baseUrl + routes.LOGIN);
    });

    it('<Main /> Check new game button', () => {
        cy.login();
        cy.get('[data-cy=main-new]').click();
        cy.url().should('eq', Cypress.config().baseUrl + routes.NEW_GAME);
    });

    it('<Main /> Check load game button', () => {
        cy.visit(routes.HOME);
        cy.get('[data-cy=main-load]').click();
        cy.url().should('eq', Cypress.config().baseUrl + routes.LOAD_GAME);
    });
});