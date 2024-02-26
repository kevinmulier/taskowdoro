describe('settings panel', () => {
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
