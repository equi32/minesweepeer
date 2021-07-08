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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import routes from "../../src/constants/routes";

Cypress.Commands.add('login', () => {
    cy.visit(routes.LOGIN);
    cy.get('[data-cy=login-email]')
        .clear()
        .type('admin@admin.com');
    cy.get('[data-cy=login-password]')
        .clear()
        .type('admin');
    cy.get('[data-cy=login-submit]')
        .click();
});

Cypress.Commands.add('logout', () => {
    cy.visit(routes.HOME);
    cy.get('[data-cy=main-logout]').click();
});