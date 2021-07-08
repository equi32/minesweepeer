/// <reference types="cypress" />

import routes from "../../src/constants/routes";
import en from "../../src/lang/en";

describe('<Login />', () => {
    it('<Login /> Check login page', () => {
        cy.visit('/');
        cy.get('[data-cy=login-title]').should('exist').invoke('text').should('eq', en.SIGN_IN_TITLE);
        cy.get('[data-cy=login-form]').should('exist');
        cy.get('[data-cy=login-email]').should('exist');
        cy.get('[data-cy=login-password]').should('exist').should('have.prop', 'type').should('eq', 'password');
        cy.get('[data-cy=login-submit]').should('exist')
            .should('have.text', en.SIGN_IN);
        cy.get('[data-cy=login-register-link]').should('exist')
            .should('have.attr', 'href').should('eq', routes.REGISTER);
    });
    

    it('<Login /> Check form login - Wrong credentials', () => {
        cy.get('[data-cy=login-email]')
            .type('admin@admin.com');
        cy.get('[data-cy=login-password]')
            .type('admin123');
        cy.get('[data-cy=login-submit]')
            .click();
        cy.get('.swal2-icon-error').should('exist');
    });

    it('<Login /> Check form login - Success login', () => {
        cy.get('[data-cy=login-email]')
            .clear()
            .type('admin@admin.com');
        cy.get('[data-cy=login-password]')
        .clear()
            .type('admin');
        cy.get('[data-cy=login-submit]')
            .click();
        cy.get('.swal2-icon-error').should('not.exist');
        cy.url().should('eq', Cypress.config().baseUrl + routes.HOME);
    });
})