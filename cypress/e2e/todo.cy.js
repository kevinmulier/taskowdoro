describe('Todo', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('exists', () => {
    cy.contains('Todo');
  });
});

describe('Task form', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should not be open', () => {
    cy.contains('Create a new task').should('not.exist');
  });

  it('can be expanded', () => {
    cy.get('[aria-label="Open new task form"]').click();
    cy.contains('Create a new task');
  });

  it('can be used to add a task', () => {
    cy.get('[aria-label="Open new task form"]').click();
    cy.get('#todo').type('A new task');
    cy.get('#newlist').type('A new list');
    cy.get('[aria-label="Submit new task"]').click();
    cy.get('.table').contains('A new task');
  });
});
