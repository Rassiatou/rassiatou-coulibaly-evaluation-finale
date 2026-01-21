describe('Test E2E Connexion et tâches', () => {
  it('Se connecte et vérifie la page tasks', () => {
    //  Ouvre la page de login
    cy.visit('http://localhost:5173/login');

    //  Remplit le formulaire
    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('input[placeholder="Mot de passe"]').type('1234');

    //  Soumet le formulaire
    cy.get('button[type="submit"]').click();

    //  Vérifie la redirection vers /tasks
    cy.url({ timeout: 10000 }).should('include', '/tasks');

    //  Vérifie l'affichage du nom complet
    cy.contains('Rassiatou Coulibaly', { timeout: 10000 });

    //  Vérifie qu'au moins une tâche est affichée
    cy.contains('Faire les courses');
    cy.contains('Corriger les devoirs');

    //  Vérifie que le bouton "Ajouter" existe
    cy.contains('Ajouter').should('exist');
  });
});