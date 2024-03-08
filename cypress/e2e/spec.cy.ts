describe('My First Test', () => {
  
  it('Visits the initial page: ok', () => {
    cy.visit('/');
    cy.contains('angular-app Demo');
    cy.screenshot('initial_page');
  });
  
  it("Open Nav", () => {
    cy.visit('/');
    cy.get('button#nav-button').click();
    cy.wait(3000);
    cy.screenshot('nav_open_open');
  });
  
})
