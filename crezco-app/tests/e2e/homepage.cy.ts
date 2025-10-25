describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the hero section', () => {
    cy.contains('Apoya a los que están empezando').should('be.visible');
    cy.contains('Invierte en personas, no en bancos').should('be.visible');
  });

  it('should have navigation links', () => {
    cy.get('nav').should('be.visible');
    cy.contains('Inicio').should('be.visible');
    cy.contains('Explorar').should('be.visible');
  });

  it('should navigate to projects page', () => {
    cy.contains('Explorar Proyectos').click();
    cy.url().should('include', '/projects');
  });

  it('should display feature cards', () => {
    cy.contains('Donaciones desde 5€').should('be.visible');
    cy.contains('Seguimiento en Tiempo Real').should('be.visible');
    cy.contains('Comunidad Activa').should('be.visible');
    cy.contains('Pagos Seguros').should('be.visible');
  });

  it('should display statistics', () => {
    cy.contains('Proyectos Financiados').should('be.visible');
    cy.contains('Recaudados').should('be.visible');
    cy.contains('Usuarios Activos').should('be.visible');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('nav').should('be.visible');
    cy.contains('Apoya a los que están empezando').should('be.visible');
  });
});
