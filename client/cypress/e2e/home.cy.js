describe('app load', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('has correct data-theme', () => {
    cy.get("[data-theme='sunset']").should('exist');
  });
});

describe('on theme switcher button click', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get("[data-theme='sunset']").should('exist');
    cy.get('.theme-switcher-button').click();
  });

  it('data theme should be switched to nord', () => {
    cy.get("[data-theme='nord']").should('exist');
  });

  it('data theme should be switched back to sunset after 2 clicks', () => {
    cy.get('.theme-switcher-button').click();
    cy.get("[data-theme='sunset']").should('exist');
  });
});
