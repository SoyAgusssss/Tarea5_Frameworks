describe('E2E - Gestión de jugadores', () => {
  const apiUrl = 'http://localhost:3000/api';
  const adminUser = `adminPruebas1`;
  const adminPassword = 'Admin12341';

  // Preparación: crear usuario admin
  before(() => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/register`,
      failOnStatusCode: false,
      body: { usuario: adminUser, email: `${adminUser}@mail.com`, password: adminPassword, rol: 'admin' }
    });
  });

  // Caso exitoso: admin accede al listado, crea jugador y valida visualmente
  it('Caso de exito: admin accede a jugadores, crea jugador y valida listado actualizado', () => {
    const uniquePlayer = `jugador_ok_${Date.now()}`;

    cy.visit('/login');
    cy.get('#username').type(adminUser);
    cy.get('#password').type(adminPassword);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');

    cy.visit('/players');
    cy.contains('h2', 'Jugadores').should('be.visible');

    cy.request({
      method: 'POST',
      url: `${apiUrl}/players`,
      body: { usuario: uniquePlayer, email: `${uniquePlayer}@mail.com`, password: 'User1234!', equipo: 'Prueba Cypress', deporte: 'Futbol' }
    }).then((resp) => {
      expect(resp.status).to.eq(201);
      expect(resp.body.mensaje).to.eq('Jugador registrado');
    });

    cy.reload();
    cy.contains('.card-title', uniquePlayer, { timeout: 10000 }).should('exist');
    cy.contains('.jugador-card', uniquePlayer, { timeout: 10000 }).should('contain.text', 'Prueba Cypress');
  });

  // Caso error controlado: login incorrecto
  it('Caso error controlado: login incorrecto', () => {
    cy.visit('/login');
    cy.get('#username').type('usuarioMal');
    cy.get('#password').type('1234');

    cy.on('window:alert', (text) => {
      expect(text).to.contain('Usuario no encontrado');
    });

    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });
});