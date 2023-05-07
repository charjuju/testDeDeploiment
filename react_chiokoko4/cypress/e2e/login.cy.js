describe('login test', () => {//truc de base ça englobe tout
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  //TEST LOGIN

  it('conextion showLogin', () => {// c'est un test
    cy.get('[data-cy="bouttonLogin"]').click()
    cy.get('.connexion-box').should('exist')
  })
  it('conextion showLoginAndUnshow', () => {// c'est un test
    cy.get('[data-cy="bouttonLogin"]').click()
    cy.get('.connexion-box').should('exist')
    cy.get('[data-cy="bouttonLogin"]').click()
    cy.get('.connexion-box').should('not.exist')
  })
  it('conextion fail', () => {// c'est un test
//    cy.visit('https://example.cypress.io') //http://localhost:3000/
//      cy.wait(5000);
      cy.get("[data-cy='bouttonLogin']").click();
      cy.get("[data-cy='emailLogin']").type("marzat.jude@gmail.com");
      cy.get("[data-cy='loginLogin']").type("dfbdfssb");
      cy.get("[data-cy='seConecterLogin']").click();
      cy.get("[data-cy='errorLogin']").should('contain', 'Mauvais email ou mot de passe.');
  })
  it('conextion sucses', () => {// c'est un test
    cy.get("[data-cy='bouttonLogin']").click();
    cy.get("[data-cy='emailLogin']").type("marzat.jude@gmail.com");
    cy.get("[data-cy='loginLogin']").type("62636263Jude");
    cy.get("[data-cy='seConecterLogin']").click();
    cy.get("[data-cy='errorLogin']").should('contain', 'Conextion réussit');
  })
  
})