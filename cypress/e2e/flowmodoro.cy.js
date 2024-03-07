describe('Settings panel', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('is closed by default', () => {
    cy.contains('SETTINGS').should('not.exist');
  });

  it('has a button to open it', () => {
    cy.get('.open-settings-flowmodoro');
  });

  it('can be opened', () => {
    cy.get('.open-settings-flowmodoro').click();
    cy.contains('SETTINGS').should('exist');
  });
});

describe('Flowmodoro', () => {
  beforeEach(() => {
    cy.visit('');
    cy.get('.open-settings-flowmodoro').click();
    cy.get('.input-focus-break-ratio').clear();
  });

  it('initially displays the correct default UI elements', () => {
    cy.get('.radial-progress').should('exist');
  });

  it('toggles mode and updates UI appropriately', () => {
    cy.get('.flowmodoro-button').click();
    cy.get('.flowmodoro-button').contains('Focus').should('exist');
    cy.wait(1000);
    cy.get('.flowmodoro-button').click();
    cy.get('.flowmodoro-button').contains('Break').should('exist');
  });

  it('toggles mode and updates UI appropriately when automatic rest is not active', () => {
    cy.get('.toggle-automatic-rest').click();
    cy.get('.flowmodoro-button').click();
    cy.get('.flowmodoro-button').contains('Focus').should('exist');
    cy.wait(1000);
    cy.get('.flowmodoro-button').click();
    cy.get('.flowmodoro-button').contains('Start break').should('exist');
    cy.get('.flowmodoro-button').click();
    cy.get('.flowmodoro-button').contains('Break').should('exist');
  });
});
