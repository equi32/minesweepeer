/// <reference types="cypress" />

import routes from "../../src/constants/routes";
import en from "../../src/lang/en";

describe('<Register />', () => {
    it('<Login /> Check redirect to register', () => {
        cy.visit(routes.HOME);
        cy.get('[data-cy=login-register-link]').should('exist')
            .should('have.attr', 'href').should('eq', routes.REGISTER);
        cy.visit(routes.REGISTER);
    });

    it('<Register /> Check form', () => {
        cy.get('[data-cy=register-title]').should('exist').invoke('text').should('eq', en.REGISTER_TITLE);
        cy.get('[data-cy=register-form]').should('exist');
        cy.get('[data-cy=register-name]').should('exist');
        cy.get('[data-cy=register-email]').should('exist').should('have.prop', 'type').should('eq', 'email');
        cy.get('[data-cy=register-password]').should('exist').should('have.prop', 'type').should('eq', 'password');
        cy.get('[data-cy=register-password-confirmation]').should('exist').should('have.prop', 'type').should('eq', 'password');
        cy.get('[data-cy=register-submit]').should('exist')
            .should('have.text', en.REGISTER.toUpperCase());
        cy.get('[data-cy=register-login-link]').should('exist')
            .should('have.attr', 'href').should('eq', routes.LOGIN);
    });

    it('<Register /> Check form - wrong data (email in use)', () => {
        cy.get('[data-cy=register-name]')
            .type('TestUser');
        cy.get('[data-cy=register-email]')
            .type('admin@admin.com');
        cy.get('[data-cy=register-password]')
            .type('admin123');
        cy.get('[data-cy=register-password-confirmation]')
            .type('admin123');
        cy.get('[data-cy=register-submit]')
            .click();
        cy.get('.swal2-icon-error').should('exist');
    });

    it('<Register /> Check form - wrong data (password confirmation)', () => {
        cy.get('[data-cy=register-name]')
            .clear()
            .type('TestUser2');
        cy.get('[data-cy=register-email]')
            .clear()
            .type('test@admin.com');
        cy.get('[data-cy=register-password]')
        .clear()
            .type('admin123');
        cy.get('[data-cy=register-password-confirmation]')
        .clear()
            .type('admin');
        cy.get('[data-cy=register-submit]')
            .click();
        cy.get('.swal2-icon-error').should('exist');
    });

    it('<Register /> Check form - register success', () => {
        cy.get('[data-cy=register-name]')
            .clear()
            .type('TestUserOk');
        cy.get('[data-cy=register-email]')
            .clear()
            .type('test@test.com');
        cy.get('[data-cy=register-password]')
            .clear()
            .type('123456');
        cy.get('[data-cy=register-password-confirmation]')
            .clear()
            .type('123456');
        cy.get('[data-cy=register-submit]')
            .click();
        cy.get('.swal2-icon-error').should('not.exist');
        cy.url().should('eq', Cypress.config().baseUrl + routes.HOME);
    });
});